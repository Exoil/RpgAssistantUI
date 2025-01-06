<template>
  <circle
    :cx="props.characterNode.position.x"
    :cy="props.characterNode.position.y"
    :r="75"
    :fill="props.characterNode.fillColor"
    :stroke="props.characterNode.strokeColor"
    :stroke-width="props.characterNode.strokeWidth"
    @mousedown="startDrag"
  />
</template>

<script setup lang="ts">
import type { CharacterNode } from '@/types/characterNode';
import { ref, defineEmits } from 'vue'

const props = defineProps<{
  characterNode: CharacterNode
}>()

const emit = defineEmits<{
  'position-update': [id: string, x: number, y: number]
}>()


let lastX = props.characterNode.position.x
let lastY = props.characterNode.position.y

const startDrag = (event: MouseEvent) => {
  const startX = event.clientX
  const startY = event.clientY

  const onMouseMove = (moveEvent: MouseEvent) => {
    const dx = moveEvent.clientX - startX
    const dy = moveEvent.clientY - startY
    props.characterNode.position.value = lastX + dx
    props.characterNode.position.value = lastY + dy
    emit(
      'position-update',
      props.characterNode.id.value,
      props.characterNode.position.x.value,
      props.characterNode.position.y.value
    )
  }

  const onMouseUp = () => {
    lastX = props.characterNode.position.x.value
    lastY = props.characterNode.position.y.value
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}
</script>

<style scoped>
</style>
@/types/characterNode