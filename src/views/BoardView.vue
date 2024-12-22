<script setup lang="ts">
import NodeCircle from '../components/NodeCircle.vue'
import { CharacterService } from '../services/CharacterService'
import type { CharacterDetails } from '../types/character'
import { ref, onMounted } from 'vue'

interface NodePosition {
  id: number
  x: number
  y: number
}

const nodes = ref<NodePosition[]>([
  { id: 1, x: 50, y: 50 },
  { id: 2, x: 150, y: 150 }
])

const characters = ref<CharacterDetails[]>([])
const characterService = new CharacterService()

const updateNodePosition = (id: number, x: number, y: number) => {
  const node = nodes.value.find(n => n.id === id)
  if (node) {
    node.x = x
    node.y = y
  }
}

const loadCharacters = async () => {
  try {
    characters.value = await characterService.getCharacters()
  } catch (error) {
    console.error('Failed to load characters:', error)
  }
}

const createCharacter = async () => {
  try {
    await characterService.createCharacter({
      name: `Character ${characters.value.length + 1}`,
      description: 'New character'
    })
    await loadCharacters()
  } catch (error) {
    console.error('Failed to create character:', error)
  }
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
      <svg width="800" height="600">
        <line 
          :x1="nodes[0].x" 
          :y1="nodes[0].y" 
          :x2="nodes[1].x" 
          :y2="nodes[1].y"
          stroke="white"
          stroke-width="2"
        />
        <NodeCircle 
          v-for="node in nodes" 
          :key="node.id"
          :id="node.id"
          :cx="node.x" 
          :cy="node.y" 
          :r="40" 
          :fill="node.id === 1 ? 'red' : 'blue'"
          @position-update="updateNodePosition"
        />
      </svg>
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
