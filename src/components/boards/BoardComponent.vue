<script setup lang="ts">
import type { CharacterDetailsViewModel } from '@/types/character';
import CharacterNodeModel from '@/components/characters/CharacterNodeModel.vue'

const props = defineProps<{
  characters: CharacterDetailsViewModel[]
  width: number
  height: number
}>()
</script>

<template>
<svg :width="props.width" :height="props.height">
        <CharacterNodeModel
        v-for="character in characters"
        :characterNode="character"/>
</svg>
</template>