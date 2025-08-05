<script setup>
import { onMounted, ref } from 'vue'
import { initCanvas, drawGrid, hover } from '@/canvas'

const header = ref("(⊙＿⊙')")
const headerRef = ref(null)
const headerCanvasRef = ref(null)
const initializedCanvas = ref(null)



onMounted(() => {
  const headerWidth = headerRef.value.offsetWidth
  initializedCanvas.value = initCanvas(headerCanvasRef.value, headerWidth, 100)
  drawGrid(initializedCanvas.value)
  hover(initializedCanvas.value)
})

</script>

<template>
  <div class="terminal-header" ref="headerRef">
    <canvas ref="headerCanvasRef"></canvas>
  </div>
</template>

<style scoped>
.terminal-header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: inherit;
  font-size: 2rem;
}
canvas {
  height: 100px;
  width: 100%;
}
</style>
