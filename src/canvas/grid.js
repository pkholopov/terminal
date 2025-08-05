import { GRID_STEP, GRID_LINE_WIDTH, GRID_COLOR } from "./config"

export default function drawGrid({canvas, ctx}) {
  const width = canvas.width
  const height = canvas.height
  
  const step = GRID_STEP
  ctx.beginPath()
  for (let x = 0; x <= width; x += step) {
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
  }
  for (let y = 0; y <= height; y += step) {
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
  }
  ctx.strokeStyle = GRID_COLOR
  ctx.lineWidth = GRID_LINE_WIDTH
  ctx.stroke()
}
