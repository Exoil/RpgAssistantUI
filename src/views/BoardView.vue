<script setup lang="ts">
import NodeCircle from '../components/NodeCircle.vue'
</script>

<template>
  <main>
    <svg width="200" height="200">
      <NodeCircle cx="50" cy="50" r="40" fill="red" />
      <NodeCircle cx="150" cy="50" r="40" fill="blue" stroke="black" strokeWidth="3" />
    </svg>
  </main>
</template>
