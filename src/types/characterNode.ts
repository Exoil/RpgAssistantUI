import type { CharacterDetailsViewModel } from '@/types/character'

export interface CharacterNode {
    character: CharacterDetailsViewModel
    position: {
        x: number
        y: number
    }
    fillColor: string
    strokeColor: string
    strokeWidth: number
}