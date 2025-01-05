<script setup lang="ts">
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'
import type { CharacterDetails } from '@/types/character'
import { CharacterService } from '@/services/CharacterService'

const props = defineProps<{
  charactersService: CharacterService
  showModal: boolean
  character: CharacterDetails
}>()

const emit = defineEmits(['close'])

const updateCharacter = async () => {
    try{
        await props.charactersService.updateCharacter(props.character.id, props.character)
    } catch (error) {
        console.error('Failed to update character:', error)
    }
    finally {
        emit('close')
    }
}

const deleteCharacter = async () => {
    try{
        await props.charactersService.deleteCharacter(props.character.id)
    } catch (error) {
        console.error('Failed to delete character:', error)
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
        <input v-model="character.name" placeholder="Name" />
        <textarea v-model="character.description" placeholder="Description"></textarea>
        <button @click="updateCharacter">Update</button>
        <button @click="deleteCharacter">Delete</button>
        <button @click="$emit('close')">Cancel</button>
      </div>
    </div>
</template>