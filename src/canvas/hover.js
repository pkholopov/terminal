import { GRID_STEP, GRID_LINE_WIDTH, PIXEL_SIZE, PIXEL_COLOR } from "./config"
import drawGrid from "./grid"

export default function hover({canvas, ctx}) {
  const width = canvas.width
  const height = canvas.height
  const drawPixel = (x, y) => {
    const _x = Math.floor(x / GRID_STEP) * GRID_STEP
    const _y = Math.floor(y / GRID_STEP) * GRID_STEP
    ctx.fillStyle = PIXEL_COLOR
    ctx.fillRect(_x + GRID_LINE_WIDTH, _y + GRID_LINE_WIDTH, PIXEL_SIZE, PIXEL_SIZE)
  }

  canvas.addEventListener('mousemove', (event) => {
    const x = event.offsetX
    const y = event.offsetY
    drawPixel(x, y)
  })

  canvas.addEventListener('mouseleave', (event) => {
    ctx.clearRect(0, 0, width, height)
    drawGrid({canvas, ctx})
  })
}
