<script setup lang="ts">
import { CharacterService } from '../services/CharacterService'
import type { CharacterDetails } from '../types/character'
import { ref, onMounted } from 'vue'
const characters = ref<CharacterDetails[]>([])
const characterService = new CharacterService()
const showCreateCharacterModal = ref(false)
const loadCharacters = async () => {
  try {
    characters.value = await characterService.getCharacters()
  } catch (error) {
    console.error('Failed to load characters:', error)
  }
}

const createCharacter = () => {
  showCreateCharacterModal.value = true
}

onMounted(loadCharacters)
</script>

<template>
  <div class="board-container">
    <div class="side-panel">
      <button class="create-btn" @click="createCharacter">Create Character</button>
      <div class="character-list">
        <div v-for="character in characters" :key="character.id" class="character-item">
          {{ character.name }}
        </div>
      </div>
    </div>
    <main class="board">

      <CreateCharacterModal :showModal="showCreateCharacterModal" @close="showCreateCharacterModal = false" />
    </main>
  </div>
</template>

<style scoped>
.board-container {
  display: flex;
  height: 100vh;
}

.side-panel {
  width: 250px;
  background: #2c3e50;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.create-btn {
  padding: 0.5rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.character-list {
  flex: 1;
  overflow-y: auto;
}

.character-item {
  padding: 0.5rem;
  background: #34495e;
  color: white;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}

.board {
  flex: 1;
  background: #1a1a1a;
}
</style>
