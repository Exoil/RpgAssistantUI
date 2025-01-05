<script setup lang="ts">
import { CharacterService } from '@/services/CharacterService'
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'
import type { CharacterDetails } from '@/types/character'

const props = defineProps<{
  charactersService: CharacterService
  showModal: boolean
  characters: CharacterDetails[]
}>()

const emit = defineEmits(['close'])
const name = ref('')
const description = ref('')

const createCharacter = async () => {
    try {
    let id = await props.charactersService.createCharacter({
      name: name.value,
      description: description.value
    })
    props.characters.push({
      id: id,
      name: name.value,
      description: description.value
    })
  } catch (error) {
    console.error('Failed to create character:', error)
  }
  finally {
    emit('close')
  }
}
</script>

<template>
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h2>Create New Character</h2>
        <input v-model="name" placeholder="Name" />
        <textarea v-model="description" placeholder="Description"></textarea>
        <button @click="createCharacter">Save</button>
        <button @click="$emit('close')">Cancel</button>
      </div>
    </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>