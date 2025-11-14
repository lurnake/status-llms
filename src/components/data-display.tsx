'use client'

import { useState } from 'react'
import { LLMResponse, StatusItem } from '@/lib/types'

interface DataDisplayProps {
  responses: LLMResponse[]
}

type SortBy = 'rating' | 'name' | 'model' | 'temperature'
type SortOrder = 'asc' | 'desc'

const getHumanFriendlyModelName = (modelName: string): string => {
  const modelMap: Record<string, string> = {
    'claude-sonnet-4': 'Claude Sonnet 4',
    'claude-opus-4': 'Claude Opus 4',
    'gemini-2.5-pro': 'Gemini 2.5 Pro',
    'grok-4': 'Grok-4',
    'kimi-k2': 'Kimi K2',
    'deepseek-r1': 'DeepSeek R1',
    'gpt-4.1': 'GPT-4.1',
    'gpt-4o': 'GPT-4o',
    'gpt-o3': 'GPT-o3'
  }
  return modelMap[modelName] || modelName
}

export function DataDisplay({ responses }: DataDisplayProps) {
  const [sortBy, setSortBy] = useState<SortBy>('rating')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const allItems = responses.flatMap(response =>
    response.items.map(item => ({
      ...item,
      model: response.model,
      temperature: response.temperature
    }))
  )

  const sortedItems = allItems.sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case 'rating':
        comparison = a.rating - b.rating
        break
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'model':
        comparison = a.model.localeCompare(b.model)
        break
      case 'temperature':
        comparison = a.temperature - b.temperature
        break
    }

    return sortOrder === 'asc' ? comparison : -comparison
  })

  if (responses.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center bg-muted/50">
        <p className="text-muted-foreground">No data to display</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 pb-6 border-b">
        <div className="text-sm text-muted-foreground">
          {sortedItems.length.toLocaleString()} items
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by</span>
            <div className="flex gap-1">
              {[
                { value: 'rating', label: 'Rating' },
                { value: 'name', label: 'Name' },
                { value: 'model', label: 'Model' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value as SortBy)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                    sortBy === option.value
                      ? 'bg-foreground text-background'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-1.5 text-xs font-medium bg-muted hover:bg-muted/80 rounded transition-colors"
          >
            {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {sortedItems.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-5 hover:border-foreground/20 transition-colors bg-card"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {item.name}
                  </h3>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground px-2 py-0.5 bg-muted rounded">
                    {item.type}
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{getHumanFriendlyModelName(item.model)}</span>
                  <span className="border-l pl-4">Temperature {item.temperature}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="text-right">
                  <div className="text-3xl font-bold tracking-tight tabular-nums">
                    {item.rating}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    /100
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}