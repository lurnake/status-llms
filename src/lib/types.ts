export interface StatusItem {
  name: string
  type: 'activity' | 'object'
  rating: number
}

export interface LLMResponse {
  model: string
  temperature: number
  items: StatusItem[]
}

export const MODELS = [
  'claude-sonnet-4',
  'claude-opus-4', 
  'gemini-2.5-pro',
  'grok-4',
  'gpt-4.1',
  'gpt-4o',
  'gpt-o3',
  'kimi-v2',
  'deepseek-r1'
] as const

export const TEMPERATURES = [0.2, 0.7, 1.0, 1.2] as const

export type Model = typeof MODELS[number]
export type Temperature = typeof TEMPERATURES[number]