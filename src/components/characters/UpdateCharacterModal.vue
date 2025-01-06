<script setup lang="ts">
import { defineProps } from 'vue'
import { ref } from 'vue'
import type { CharacterDetailsViewModel } from '@/types/character'
import { CharacterService } from '@/services/CharacterService'

const props = defineProps<{
  charactersService: CharacterService
  character: CharacterDetailsViewModel
}>()

const name = ref(props.character.name)
const description = ref(props.character.description)
const emit = defineEmits(['delete'])


const updateCharacter = async () => {
    try{
        var updatedCharacter = {
            name: name.value,
            description: description.value
        }
        await props.charactersService.updateCharacter(props.character.id, updatedCharacter)

        props.character.name = name.value
        props.character.description = description.value
    } catch (error) {
        console.error('Failed to update character:', error)
    }
    finally {
        props.character.isModalOpen = false
    }
}

const deleteCharacter = async () => {
    try{
        await props.charactersService.deleteCharacter(props.character.id)
        emit('delete', props.character.id)
    } catch (error) {
        console.error('Failed to delete character:', error)
    }
    finally {
        props.character.isModalOpen = false
    }
}
</script>

<template>
    <div class="modal" v-if="character.isModalOpen">
      <div class="modal-content">
        <h2>Update Character</h2>
        <input v-model="name" placeholder="Name" />
        <textarea v-model="description" placeholder="Description"></textarea>
        <button @click="updateCharacter">Update</button>
        <button @click="deleteCharacter">Delete</button>
        <button @click="character.isModalOpen = false">Cancel</button>
      </div>
    </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 20%;
  height: 30%;
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