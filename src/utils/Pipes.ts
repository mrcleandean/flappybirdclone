import { Bird, Pipe, Score } from '.'
class Pipes {
    private ctx: CanvasRenderingContext2D;
    private score: Score;
    private canvasWidth: number;
    private canvasHeight: number;
    public bird: Bird;
    private baseHeight: number;
    private pipes: Pipe[];
    private spawnInterval: number;
    private timeSinceLastSpawn: number;
    constructor(
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number,
        baseHeight: number,
        bird: Bird,
        score: Score
    ) {
        this.ctx = ctx
        this.score = score
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.bird = bird
        this.baseHeight = baseHeight
        this.pipes = []
        this.spawnInterval = 2200
        this.timeSinceLastSpawn = 0
    }

    update(delta: number) {
        this.pipes.forEach(pipe => pipe.update(delta))
        this.timeSinceLastSpawn += delta
        if (this.timeSinceLastSpawn >= this.spawnInterval) {
            this.timeSinceLastSpawn = 0
            this.pipes.push(new Pipe(this.ctx, this.canvasWidth, this.canvasHeight, this.baseHeight))
        }
        this.pipes = this.pipes.filter(pipe => {
            return pipe.x > -this.canvasWidth
        })
    }

    draw() {
        this.pipes.forEach(pipe => pipe.draw())
    }

    detectCollisionAndScore(bird: Bird) {
        const { left, right, up, down } = bird.getHitBoxBounds()
        return this.pipes.some(pipe => {
            // Detecting Score Below
            const scored = right >= pipe.center && pipe.scored === false
            if (scored) {
                this.score.incScore()
                pipe.scored = true
            }
            // Detecting Collision Below
            const leftInBounds = left > pipe.x && left < pipe.x + pipe.width
            const rightInBounds = right > pipe.x && right < pipe.x + pipe.width
            const inVerticalBounds = up < pipe.upperBound || down > pipe.lowerBound
            return (leftInBounds || rightInBounds) && inVerticalBounds
        })
    }
}

export default Pipes