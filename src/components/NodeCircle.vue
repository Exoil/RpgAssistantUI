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
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  id: number
  cx: number
  cy: number
  r: number
  fill: string
  stroke?: string
  strokeWidth?: number
}>()

const emit = defineEmits<{
  'position-update': [id: number, x: number, y: number]
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
    emit('position-update', props.id, currentCx.value, currentCy.value)
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
