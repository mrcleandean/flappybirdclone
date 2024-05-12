import { base } from "../assets";
import { Bird } from ".";

class Ground {
    private ctx: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;
    private baseHeight: number;
    private img: HTMLImageElement;
    private speed: number;
    private x1: number;
    private x2: number;
    constructor(
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number,
        baseHeight: number
    ) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.baseHeight = baseHeight;
        this.img = new Image(this.canvasWidth, this.canvasHeight);
        this.img.src = base;
        this.speed = 0.125;
        this.x1 = 0;
        this.x2 = this.canvasWidth - 1;
    }

    public update(delta: number) {
        this.x1 -= this.speed * delta;
        this.x2 -= this.speed * delta;
        if (this.x1 <= -this.canvasWidth) {
            this.x1 = this.x2 + this.canvasWidth - 1;
        }
        if (this.x2 <= -this.canvasWidth) {
            this.x2 = this.x1 + this.canvasWidth - 1;
        }
        this.draw();
    }

    public draw() {
        this.ctx.drawImage(
            this.img,
            this.x1,
            this.canvasHeight - this.baseHeight,
            this.canvasWidth,
            this.baseHeight
        );
        this.ctx.drawImage(
            this.img,
            this.x2,
            this.canvasHeight - this.baseHeight,
            this.canvasWidth,
            this.baseHeight
        );
    }

    public detectCollision(bird: Bird) {
        const { down } = bird.getHitBoxBounds();
        if (down >= this.canvasHeight - this.baseHeight) return true;
        return false;
    }
}

export default Ground