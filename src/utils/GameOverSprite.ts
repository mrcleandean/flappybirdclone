import { gameover, tryagain, enterortap, highscore } from "../assets";

class GameOverSprite {
    private ctx: CanvasRenderingContext2D;
    private canvasWidth: number;
    private titleWidth: number;
    private titleHeight: number;
    private highscoreWidth: number;
    private highscoreHeight: number;
    private enterortapWidth: number;
    private enterortapHeight: number;
    private tryagainWidth: number;
    private tryagainHeight: number;
    private translateY: number;
    private gap: number;
    private titleY: number;
    private highscoreY: number;
    private enterortapY: number;
    private tryagainY: number;
    private title: HTMLImageElement;
    private highscore: HTMLImageElement;
    private enterortap: HTMLImageElement;
    private tryagain: HTMLImageElement;
    constructor(
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number
    ) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.titleWidth = 240;
        this.titleHeight = 90;
        this.highscoreWidth = 130;
        this.highscoreHeight = 40;
        this.enterortapWidth = 140;
        this.enterortapHeight = 35;
        this.tryagainWidth = 90;
        this.tryagainHeight = 30;
        this.translateY = 200;
        this.gap = 10;
        this.titleY = canvasHeight / 2 - this.translateY;
        this.highscoreY = this.titleY + this.titleHeight + this.gap * 2;
        this.enterortapY = this.highscoreY + this.highscoreHeight + this.gap + 40;
        this.tryagainY = this.enterortapY + this.enterortapHeight + this.gap;
        this.title = new Image(this.titleWidth, this.titleHeight);
        this.highscore = new Image(this.highscoreWidth, this.highscoreHeight);
        this.enterortap = new Image(this.enterortapWidth, this.enterortapHeight);
        this.tryagain = new Image(this.tryagainWidth, this.tryagainHeight);
        this.highscore.src = highscore;
        this.title.src = gameover;
        this.enterortap.src = enterortap;
        this.tryagain.src = tryagain;
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
            this.highscore,
            (this.canvasWidth - this.highscoreWidth) * 0.5,
            this.highscoreY,
            this.highscoreWidth,
            this.highscoreHeight
        );

        this.ctx.drawImage(
            this.enterortap,
            (this.canvasWidth - this.enterortapWidth) * 0.5,
            this.enterortapY,
            this.enterortapWidth,
            this.enterortapHeight
        );

        this.ctx.drawImage(
            this.tryagain,
            (this.canvasWidth - this.tryagainWidth) * 0.5,
            this.tryagainY,
            this.tryagainWidth,
            this.tryagainHeight
        );
    }
}

export default GameOverSprite