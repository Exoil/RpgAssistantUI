<template>
  <circle
    v-if="props.characterNode.isNodeView"
    :id="props.characterNode.character.id"
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
import type { CharacterNode } from '@/types/CharacterDetailsViewModel';
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
    props.characterNode.position.x = lastX + dx
    props.characterNode.position.y = lastY + dy
    emit(
      'position-update',
      props.characterNode.character.id,
      props.characterNode.position.x,
      props.characterNode.position.y
    )
  }

  const onMouseUp = () => {
    lastX = props.characterNode.position.x
    lastY = props.characterNode.position.y
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}
</script>

<style scoped>
</style>