<script setup lang="ts">
import NodeCircle from '../components/NodeCircle.vue'
</script>

<template>
  <main>
    <svg width="800" height="600">
      <NodeCircle :cx="50" :cy="50" :r="40" fill="red" />
      <NodeCircle :cx="50" :cy="50" :r="40" fill="blue" />
    </svg>
  </main>
</template>
