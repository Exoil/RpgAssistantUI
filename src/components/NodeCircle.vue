<template>
      <circle
        :cx="cx"
        :cy="cy"
        :r="r"
        :fill="fill"
        :stroke="stroke"
        :stroke-width="strokeWidth"
      />
</template>

<script setup lang="ts">
defineProps<{
  cx: number | string
  cy: number | string
  r: number | string
  fill: string
  stroke?: string
  strokeWidth?: number | string
}>()
</script>

<style scoped>
.board {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
