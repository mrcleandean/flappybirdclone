"use client";
import { spaceortap, title, toplay } from "../assets";

class InitialSprite {
    private ctx: CanvasRenderingContext2D;
    private canvasWidth: number;
    private titleWidth: number;
    private titleHeight: number;
    private spaceortapWidth: number;
    private spaceortapHeight: number;
    private toplayWidth: number;
    private toplayHeight: number;
    private gap: number;
    private translateY: number;
    private titleY: number;
    private spaceortapY: number;
    private toplayY: number;
    private title: HTMLImageElement;
    private spaceortap: HTMLImageElement;
    private toplay: HTMLImageElement;
    constructor(
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
    ) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.titleWidth = 220;
        this.titleHeight = 75;
        this.spaceortapWidth = 140;
        this.spaceortapHeight = 35;
        this.toplayWidth = 65;
        this.toplayHeight = 20;
        this.gap = 5;
        this.translateY = 140;
        this.titleY = this.canvasWidth / 2 - this.translateY;
        this.spaceortapY = this.titleY + this.titleHeight + this.gap * 2;
        this.toplayY = this.spaceortapY + this.spaceortapHeight + this.gap;
        this.title = new Image(this.titleWidth, this.titleHeight);
        this.title.src = title;
        this.spaceortap = new Image(this.spaceortapWidth, this.spaceortapHeight);
        this.spaceortap.src = spaceortap;
        this.toplay = new Image(this.toplayWidth, this.toplayHeight);
        this.toplay.src = toplay;
    }

    public draw() {
        this.ctx.drawImage(
            this.title,
            (this.canvasWidth - this.titleWidth) * 0.5,
            this.titleY,
            this.titleWidth,
            this.titleHeight
        );
        this.ctx.drawImage(
            this.spaceortap,
            (this.canvasWidth - this.spaceortapWidth) * 0.5,
            this.spaceortapY,
            this.spaceortapWidth,
            this.spaceortapHeight
        );
        this.ctx.drawImage(
            this.toplay,
            (this.canvasWidth - this.toplayWidth) * 0.5,
            this.toplayY,
            this.toplayWidth,
            this.toplayHeight
        );
    }
}

export default InitialSprite