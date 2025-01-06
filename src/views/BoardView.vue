<script setup lang="ts">
import { CharacterService } from '../services/CharacterService'
import type { CharacterDetailsViewModel } from '@/types/character'
import CreateCharacterModal from '../components/characters/CreateCharacterModal.vue'
import UpdateCharacterModal from '../components/characters/UpdateCharacterModal.vue'
import CharacterNodeModel from '../components/characters/CharacterNodeModel.vue'
import CharacterHeader from '../components/characters/CharacterHeader.vue'
import { ref, onMounted } from 'vue'
const characters = ref<CharacterDetailsViewModel[]>([])
const characterService = new CharacterService()
const isShowCreateCharacterModal = ref(false)


const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const getRandomPosition = (radius: number) => {
  const x = Math.random() * (window.innerWidth - 2 * radius) + radius
  const y = Math.random() * (window.innerHeight - 2 * radius) + radius
  return { x, y }
}

const loadCharacters = async () => {
  try {
    const characterDetails = await characterService.getCharacters()
    characters.value = characterDetails.map(character => ({
      ...character,
      isModalOpen: false,
      isNodeView: false,
      nodePosition: {x: 80, y: 80},
      nodeFillColor: getRandomColor(),
      nodeStrokeColor: '#000000',
      nodeStrokeWidth: 1
    }))
  } catch (error) {
    console.error('Failed to load characters:', error)
  }
}

const showCreateCharacterModal = async () => {
  isShowCreateCharacterModal.value = true
}

const addCharacterToList = (character: CharacterDetailsViewModel) => {
  characters.value.push(character)
}

const removeCharacterFromList = (id: string) => {
  characters.value = characters.value.filter(character => character.id !== id)
}

onMounted(loadCharacters)
</script>

<template>
  <div class="board-container">
    <div class="side-panel">
      <button class="create-btn" @click="showCreateCharacterModal">Create Character</button>
      <div class="character-list">
        <CharacterHeader 
          v-for="character in characters" 
          :key="character.id" 
          :character="character" 
        />
      </div>
    </div>
    <main class="board">
      <svg class="board-svg" width="100%" height="100%">
      <CharacterNodeModel 
        v-for="character in characters"
        :characterNode="character" 
      />
    </svg>
      <UpdateCharacterModal 
          v-for="character in characters" 
          :key="character.id"
          :character="character" 
          :charactersService="characterService" 
          :characters="characters"
          @delete="removeCharacterFromList"
        />
      <CreateCharacterModal 
        :showModal="isShowCreateCharacterModal" 
        :charactersService="characterService" 
        :characters="characters"
        @close="isShowCreateCharacterModal = false"
        @addToList="addCharacterToList"
      />
    </main>
  </div>
</template>

<style scoped>
.board-container {
  display: flex;
  height: 100vh;
  width: 100vw;
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
  background: gray;
}
</style>
