import { num0, num1, num2, num3, num4, num5, num6, num7, num8, num9, point } from "../assets";

class Score {
    private ctx: CanvasRenderingContext2D;
    private canvasWidth: number;
    private score: number;
    private spriteWidth: number;
    private spriteHeight: number;
    private halfWidth: number;
    private halfHeight: number;
    private center: number;
    private y: number;
    private scoreString: string;
    private localStoreVal: string | null;
    private highScoreString: string;
    private imgSrcArr: string[]
    private imageMap: Map<string, HTMLImageElement>
    private scoreAudio: HTMLAudioElement;
    constructor(
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
    ) {
        this.ctx = ctx
        this.canvasWidth = canvasWidth
        this.score = 0
        this.spriteWidth = 20
        this.spriteHeight = 30
        this.halfWidth = this.spriteWidth * 0.5
        this.halfHeight = this.spriteHeight * 0.5
        this.center = this.canvasWidth / 2
        this.y = 25
        this.scoreString = '0'
        const highscore = localStorage.getItem('highscore');
        if (highscore !== null) {
            this.localStoreVal = JSON.parse(highscore);
        } else {
            this.localStoreVal = null;
        }
        this.highScoreString = this.localStoreVal === null ? '0' : this.localStoreVal
        this.imgSrcArr = [num0, num1, num2, num3, num4, num5, num6, num7, num8, num9]
        this.imageMap = new Map()
        for (let i = 0; i < this.imgSrcArr.length; i++) {
            const image = new Image(this.spriteWidth, this.spriteHeight)
            image.src = String(this.imgSrcArr[i])
            this.imageMap.set(String(i), image)
        }
        this.scoreAudio = new Audio(point);
        this.scoreAudio.volume = 0.1
    }

    getXCoors(string: string) {
        if (string.length === 0) return []
        if (string.length === 1) return [this.center]
        const coors = [];
        const totalWidth = this.spriteWidth * string.length
        const startPoint = this.center - (totalWidth / 2) + (this.spriteWidth / 2)
        for (let i = 0; i < string.length; i++) {
            coors.push(startPoint + this.spriteWidth * i);
        }
        return coors
    }

    draw() {
        const coors = this.getXCoors(this.scoreString)
        for (let i = 0; i < coors.length; i++) {
            const image = this.imageMap.get(this.scoreString[i]);
            if (image) {
                this.ctx.drawImage(
                    image,
                    coors[i] - this.halfWidth,
                    this.y,
                    this.spriteWidth,
                    this.spriteHeight
                )
            }
        }
    }

    incScore() {
        this.score++;
        this.scoreString = String(this.score)
        this.scoreAudio.play()
    }

    drawOnOver(translateY: number) {
        const coors = this.getXCoors(this.highScoreString)
        for (let i = 0; i < coors.length; i++) {
            const image = this.imageMap.get(this.highScoreString[i]);
            if (image) {
                this.ctx.drawImage(
                    image,
                    coors[i] - this.halfWidth,
                    translateY - this.halfHeight,
                    this.spriteWidth,
                    this.spriteHeight
                )
            }
        }
    }

    checkHighScore() {
        if (this.score > Number(this.highScoreString)) {
            this.highScoreString = this.scoreString
            localStorage.setItem('highscore', JSON.stringify(this.scoreString))
        }
    }
}

export default Score