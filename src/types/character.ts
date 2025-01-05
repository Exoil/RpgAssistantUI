export interface Character {
  name: string
  description: string
}

export interface CharacterDetails extends Character {
  id: string
  name: string
  description: string
  knows?: CharacterDetails[]
}

export interface CharacterDetailsViewModel extends CharacterDetails {
  id: string
  name: string
  description: string
  knows?: CharacterDetails[]
  isModalOpen: boolean
}

export interface ProblemDetails {
  type: string
  title: string
  status: number
  detail: string
  instance: string
  extensions?: Record<string, unknown>
} 