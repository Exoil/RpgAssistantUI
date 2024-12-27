import type { Character, CharacterDetails } from '../types/character'

export class CharacterService {
  private baseUrl: string = 'http://localhost:8080'
  private contentTypeValue: string = 'application/json'
  private contentTypeKey: string = 'Content-Type'

  async createCharacter(character: Character): Promise<string> {
    const response = await fetch(`${this.baseUrl}/`, {
      method: 'POST',
      headers: { [this.contentTypeKey]: this.contentTypeValue },
      body: JSON.stringify(character)
    })

    if (!response.ok) throw new Error(response.statusText)

    return await response.json()
  }

  async getCharacter(id: string): Promise<CharacterDetails> {
    const response = await fetch(`${this.baseUrl}/${id}`)

    if (!response.ok) throw new Error(response.statusText)

    return await response.json()
  }

  async updateCharacter(id: string, character: Character): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { [this.contentTypeKey]: this.contentTypeValue },
      body: JSON.stringify(character)
    })

    if (!response.ok) throw new Error(response.statusText)
  }

  async deleteCharacter(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) throw new Error(response.statusText)
  }

  async createKnowsRelationship(sourceId: string, targetId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${sourceId}/knows/${targetId}`, {
      method: 'PUT'
    })

    if (!response.ok) throw new Error(response.statusText)
  }

  async deleteKnowsRelationship(sourceId: string, targetId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${sourceId}/knows/${targetId}`, {
      method: 'DELETE'
    })

    if (!response.ok) throw new Error(response.statusText)
  }

  async getCharacters(page: number = 0, size: number = 10): Promise<CharacterDetails[]> {
    const response = await fetch(`${this.baseUrl}/?number=${page}&size=${size}`)

    if (!response.ok) throw new Error(response.statusText)

    return await response.json()
  }
} 