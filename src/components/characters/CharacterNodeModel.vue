<template>
  <circle
    v-if="props.characterNode.isNodeView"
    :id="props.characterNode.id"
    :cx="props.characterNode.nodePosition.x"
    :cy="props.characterNode.nodePosition.y"
    :r="75"
    :fill="props.characterNode.nodeFillColor"
    :stroke="props.characterNode.nodeStrokeColor"
    :stroke-width="props.characterNode.nodeStrokeWidth"
    @mousedown="startDrag"
  />
</template>

<script setup lang="ts">
import type { CharacterDetailsViewModel } from '@/types/character';

const props = defineProps<{
  characterNode: CharacterDetailsViewModel
}>()

const emit = defineEmits<{
  'position-update': [id: string, x: number, y: number]
}>()

let lastX = props.characterNode.nodePosition.x
let lastY = props.characterNode.nodePosition.y

const startDrag = (event: MouseEvent) => {
  const startX = event.clientX
  const startY = event.clientY

  const onMouseMove = (moveEvent: MouseEvent) => {
    const dx = moveEvent.clientX - startX
    const dy = moveEvent.clientY - startY
    props.characterNode.nodePosition.x = lastX + dx
    props.characterNode.nodePosition.y = lastY + dy
    emit(
      'position-update',
      props.characterNode.id,
      props.characterNode.nodePosition.x,
      props.characterNode.nodePosition.y
    )
  }

  const onMouseUp = () => {
    lastX = props.characterNode.nodePosition.x
    lastY = props.characterNode.nodePosition.y
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}
</script>

<style scoped>
</style>