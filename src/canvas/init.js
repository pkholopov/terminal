import { GRID_STEP } from "./config"

export default function initCanvas(element, width, height) {
  const canvas = element
  canvas.width = width - (width % GRID_STEP)
  canvas.height = height
  const ctx = canvas.getContext('2d')  
  return { canvas, ctx }
}
