<script setup lang="ts">
import NodeCircle from '../components/NodeCircle.vue'
import { ref, computed } from 'vue'

interface NodePosition {
  id: number
  x: number
  y: number
}

const nodes = ref<NodePosition[]>([
  { id: 1, x: 50, y: 50 },
  { id: 2, x: 150, y: 150 }
])

const updateNodePosition = (id: number, x: number, y: number) => {
  const node = nodes.value.find(n => n.id === id)
  if (node) {
    node.x = x
    node.y = y
  }
}
</script>

<template>
  <main>
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
</template>
