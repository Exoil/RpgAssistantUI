<script setup lang="ts">
import { computed } from 'vue'
import type { CharacterDetailsViewModel } from '@/types/character'

const props = defineProps<{
  character: CharacterDetailsViewModel
}>()

const checkboxValue = computed(() => {
  return props.character.isNodeView ? 'Node View Enabled' : 'Node View Disabled'
})

const handleClick = () => {
  if(!props.character.isModalOpen) {
    props.character.isModalOpen = true
    return;
  }

  props.character.isModalOpen = false;
}
const changeNodeViewState = () => {
  console.log('Double click detected')
  if(!props.character.isNodeView){
    props.character.isNodeView = true;
    return;
  }

  props.character.isNodeView = false;
}


</script>

<template>
  <div class="character-header">
    <p @click="handleClick">{{ character.name }}</p>
    <div>
      <input 
      type="checkbox"
      id="check-box-{{ character.id }}"
      name="check-box-{{ character.id }}"
      :value="props.character.isNodeView"
      @click="changeNodeViewState"/>
      <p>{{ checkboxValue }}</p>
    </div>
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