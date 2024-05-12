import { background } from "../assets";

class City {
    private ctx: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;
    private img: HTMLImageElement;
    private speed: number;
    private x1: number;
    private x2: number;
    constructor(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
        this.ctx = ctx
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.img = new window.Image(this.canvasWidth, this.canvasHeight)
        this.img.src = background
        this.speed = 0.125
        this.x1 = 0
        this.x2 = this.canvasWidth - 1
    }

    update(delta: number) {
        this.x1 -= this.speed * delta
        this.x2 -= this.speed * delta
        if (this.x1 <= -this.canvasWidth) {
            this.x1 = this.x2 + this.canvasWidth - 1
        }
        if (this.x2 <= -this.canvasWidth) {
            this.x2 = this.x1 + this.canvasWidth - 1
        }
        this.draw()
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x1,
            0,
            this.canvasWidth,
            this.canvasHeight
        )
        this.ctx.drawImage(
            this.img,
            this.x2,
            0,
            this.canvasWidth,
            this.canvasHeight
        )
    }
}

export default City