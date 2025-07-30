import { LLMResponse } from './types'
import { promises as fs } from 'fs'
import path from 'path'

export async function loadLLMData(): Promise<LLMResponse[]> {
  const dataDir = path.join(process.cwd(), 'data')
  const responses: LLMResponse[] = []

  try {
    const files = await fs.readdir(dataDir)
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const filePath = path.join(dataDir, file)
          const content = await fs.readFile(filePath, 'utf-8')
          const data = JSON.parse(content)
          
          // Extract model and temperature from filename
          const [modelName, tempStr] = file.replace('.json', '').split('_')
          const temperature = parseFloat(tempStr)
          
          responses.push({
            model: modelName,
            temperature,
            items: data.items || []
          })
        } catch (error) {
          console.warn(`Failed to load ${file}:`, error)
        }
      }
    }
  } catch (error) {
    console.warn('Data directory not found or empty')
  }

  return responses
}