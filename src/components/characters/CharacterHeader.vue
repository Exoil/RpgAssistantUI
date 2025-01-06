<script setup lang="ts">
import { defineProps } from 'vue'
import type { CharacterDetailsViewModel } from '@/types/character'

const props = defineProps<{
  character: CharacterDetailsViewModel
}>()

const handleClick = () => {
  if(!props.character.isModalOpen) {
    props.character.isModalOpen = true
    return;
  }

  props.character.isModalOpen = false;
}
const handleDoubleClick = () => {
  console.log('Double click detected')
}
</script>

<template>
  <div class="character-header" @click="handleClick">
    {{ character.name }}
  </div>
</template>

<style scoped>
.character-header {
  cursor: pointer;
  padding: 0.5rem;
  background: #34495e;
  color: white;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}
</style> 