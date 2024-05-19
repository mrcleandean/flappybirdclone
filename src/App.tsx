import { Game } from "./utils"
import { useEffect, useRef } from "react"

const FlappyBirdClone = () => {
  const canvasRef = useRef<null | HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    let game = new Game(ctx, canvas.width, canvas.height, 90)
    let prevTime = 0
    let animationFrameId: number | null = null

    const render = (currentTime: number) => {
      let delta = currentTime - prevTime
      prevTime = currentTime
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let runState = game.runState
      if (runState === 'initial') game.initial(delta)
      else if (runState === 'flying') game.flying(delta)
      else if (runState === 'falling') game.falling(delta)
      else if (runState === 'laying') game.laying()
      animationFrameId = window.requestAnimationFrame(render)
    }

    const isKeyPressed: {
      [key: string]: boolean
    } = {}

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isKeyPressed[e.code]) {
        isKeyPressed[e.code] = true
        let runState = game.runState
        if (runState === 'initial') {
          if (e.code === 'Space') {
            game.toFlying()
            game.bird.jump()
          }
        } else if (runState === 'flying') {
          if (e.code === 'Space') {
            game.bird.jump()
          }
        } else if (runState === 'laying') {
          if (e.code === 'Enter') {
            game = new Game(ctx, canvas.width, canvas.height, 90)
          }
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      isKeyPressed[e.code] = false
    }

    const handleTouch = () => {
      let runState = game.runState
      if (runState === 'initial') {
        game.toFlying()
        game.bird.jump()
      } else if (runState === 'flying') {
        game.bird.jump()
      } else if (runState === 'laying') {
        game = new Game(ctx, canvas.width, canvas.height, 90)
      }
    }

    window.addEventListener('touchstart', handleTouch)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    render(0)
    return () => {
      window.removeEventListener('touchstart', handleTouch)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <canvas
        ref={canvasRef}
        width={375}
        height={665}
        className="w-screen h-screen object-contain block"
      />
    </div>
  )
}

export default FlappyBirdClone