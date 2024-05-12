import { upflap, midflap, downflap, wing } from "../assets";

const mapToRange = (value: number) => {
    const minInput = -320;
    const maxInput = 320;
    const minOutput = -Math.PI / 6;
    const maxOutput = Math.PI / 6;

    if (value >= maxInput) return maxOutput;
    if (value <= minInput) return minOutput;

    const proportion = (value - minInput) / (maxInput - minInput);
    return minOutput + proportion * (maxOutput - minOutput);
};

class Bird {
    readonly ctx: CanvasRenderingContext2D;
    readonly spriteWidth: number;
    readonly spriteHeight: number;
    private y: number;
    readonly x: number;
    readonly hitBoxMargin: number;
    readonly upflap: HTMLImageElement;
    readonly midflap: HTMLImageElement;
    readonly downflap: HTMLImageElement;
    private currentImg: HTMLImageElement;
    readonly jumpAudio: HTMLAudioElement;
    private imageMap: Map<HTMLImageElement, HTMLImageElement>;
    readonly imageInterval: number;
    private timeSinceLastImage: number;
    public gravity: number;
    private velocity: number;
    readonly jumpVelocity: number;
    private displacement: number | undefined;
    constructor(
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number,
        baseHeight: number
    ) {
        this.ctx = ctx
        this.spriteWidth = 55
        this.spriteHeight = 35
        this.y = (canvasHeight - baseHeight) * 0.5 - this.spriteHeight * 0.5
        this.x = canvasWidth * 0.5 - this.spriteWidth * 0.5
        this.hitBoxMargin = 5
        this.upflap = new Image(this.spriteWidth, this.spriteHeight)
        this.upflap.src = upflap
        this.midflap = new Image(this.spriteWidth, this.spriteHeight)
        this.midflap.src = midflap
        this.downflap = new Image(this.spriteWidth, this.spriteHeight)
        this.downflap.src = downflap
        this.currentImg = this.midflap
        this.jumpAudio = new Audio(wing);
        this.jumpAudio.volume = 0.1
        this.imageMap = new Map()
        this.imageMap.set(this.upflap, this.midflap)
        this.imageMap.set(this.midflap, this.downflap)
        this.imageMap.set(this.downflap, this.upflap)
        this.imageInterval = 200
        this.timeSinceLastImage = 0
        this.gravity = 0
        this.velocity = 0
        this.jumpVelocity = -300
    }

    update(changeInMs: number) {
        const delta = changeInMs / 1000;
        this.displacement = this.velocity * delta + 0.5 * this.gravity * delta ** 2;
        this.velocity = this.velocity + this.gravity * delta;
        this.y += this.displacement;
        this.timeSinceLastImage += changeInMs;
        if (this.timeSinceLastImage >= this.imageInterval) {
            this.timeSinceLastImage = 0;
            const newImage = this.imageMap.get(this.currentImg);
            if (newImage !== undefined) this.currentImg = newImage
        }
        this.draw()
    }

    jump() {
        this.velocity = this.jumpVelocity
        this.jumpAudio.currentTime = 0
        this.jumpAudio.play()
    }

    draw() {
        // this.drawHitBoxLines()
        this.ctx.save();
        this.ctx.translate(this.x + this.spriteWidth / 2, this.y + this.spriteHeight / 2);
        this.ctx.rotate(mapToRange(this.velocity));
        this.ctx.drawImage(this.currentImg, -this.spriteWidth / 2, -this.spriteHeight / 2, this.spriteWidth, this.spriteHeight);
        this.ctx.restore();
    }

    getHitBoxBounds() {
        const left = this.x + this.hitBoxMargin
        const right = left + this.spriteWidth - this.hitBoxMargin * 2
        const up = this.y + this.hitBoxMargin
        const down = up + this.spriteHeight - this.hitBoxMargin * 2
        return { left, up, right, down }
    }

    drawHitBoxLines() {
        const { left, up, right, down } = this.getHitBoxBounds()
        this.ctx.beginPath()
        this.ctx.moveTo(left, up)
        this.ctx.lineTo(left, down)
        this.ctx.lineTo(right, down)
        this.ctx.lineTo(right, up)
        this.ctx.lineTo(left, up)
        this.ctx.stroke()
    }
}

export default Bird