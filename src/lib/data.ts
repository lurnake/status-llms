import { LLMResponse } from './types'

export function getAvailableModels(responses: LLMResponse[]): string[] {
  return [...new Set(responses.map(r => r.model))].sort()
}

export function getAvailableTemperatures(responses: LLMResponse[]): number[] {
  return [...new Set(responses.map(r => r.temperature))].sort((a, b) => a - b)
}

export function filterResponses(
  responses: LLMResponse[],
  filters: {
    models?: string[]
    temperatures?: number[]
    ratingRange?: [number, number]
    itemType?: 'activity' | 'object' | 'all'
  }
): LLMResponse[] {
  return responses.filter(response => {
    if (filters.models && !filters.models.includes(response.model)) return false
    if (filters.temperatures && !filters.temperatures.includes(response.temperature)) return false
    
    if (filters.ratingRange || filters.itemType !== 'all') {
      const filteredItems = response.items.filter(item => {
        if (filters.ratingRange) {
          const [min, max] = filters.ratingRange
          if (item.rating < min || item.rating > max) return false
        }
        if (filters.itemType && filters.itemType !== 'all' && item.type !== filters.itemType) return false
        return true
      })
      
      return filteredItems.length > 0
    }
    
    return true
  })
}