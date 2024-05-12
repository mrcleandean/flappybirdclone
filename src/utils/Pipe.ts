"use client";
import { upperpipe, lowerpipe } from "../assets";

function getRandomValue(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

class Pipe {
    private ctx: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;
    private baseHeight: number;
    private spawnDistance: number;
    public x: number;
    private gap: number;
    private boundsLimit: number;
    readonly lowerBound: number;
    readonly upperBound: number;
    readonly width: number;
    readonly height: number;
    private upperImg: HTMLImageElement;
    private lowerImg: HTMLImageElement;
    private speed: number;
    public center: number;
    public scored: boolean;
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
        this.spawnDistance = 10;
        this.x = this.canvasWidth + this.spawnDistance;
        this.gap = 115;
        this.boundsLimit = 15;
        this.lowerBound = getRandomValue(this.boundsLimit + this.gap, this.canvasHeight - this.baseHeight - this.gap);
        this.upperBound = this.lowerBound - this.gap;
        this.width = 75;
        this.height = this.canvasHeight;
        this.upperImg = new Image(this.width, this.height);
        this.upperImg.src = lowerpipe;
        this.lowerImg = new Image(this.width, this.height);
        this.lowerImg.src = upperpipe;
        this.speed = 0.1;
        this.center = this.x + this.width / 2;
        this.scored = false;
    }

    update(delta: number) {
        this.x -= this.speed * delta;
        this.center = this.x + this.width / 2;
        this.draw();
    }

    draw() {
        this.ctx.drawImage(this.lowerImg, this.x, this.upperBound - this.height, this.width, this.height);
        this.ctx.drawImage(this.upperImg, this.x, this.lowerBound, this.width, this.height);
    }
}

export default Pipe