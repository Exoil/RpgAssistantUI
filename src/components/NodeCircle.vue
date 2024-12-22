<template>
  <circle
    :cx="currentCx"
    :cy="currentCy"
    :r="r"
    :fill="fill"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    @mousedown="startDrag"
  />
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps<{
  cx: number
  cy: number
  r: number
  fill: string
  stroke?: string
  strokeWidth?: number
}>()

const currentCx = ref(props.cx)
const currentCy = ref(props.cy)
let lastX = currentCx.value
let lastY = currentCy.value

const startDrag = (event: MouseEvent) => {
  const startX = event.clientX
  const startY = event.clientY

  const onMouseMove = (moveEvent: MouseEvent) => {
    const dx = moveEvent.clientX - startX
    const dy = moveEvent.clientY - startY
    currentCx.value = lastX + dx
    currentCy.value = lastY + dy
  }

  const onMouseUp = () => {
    lastX = currentCx.value
    lastY = currentCy.value
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}
</script>

<style scoped>
.board {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
