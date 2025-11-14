'use client'

import { LLMResponse } from '@/lib/types'

interface StatsOverviewProps {
  responses: LLMResponse[]
}

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

export function StatsOverview({ responses }: StatsOverviewProps) {
  if (responses.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center bg-muted/50">
        <p className="font-medium mb-2">No data loaded</p>
        <p className="text-sm text-muted-foreground">
          Add JSON files to the /data directory to begin analyzing LLM responses.
        </p>
      </div>
    )
  }

  const totalItems = responses.reduce((sum, response) => sum + response.items.length, 0)
  const uniqueModels = [...new Set(responses.map(r => r.model))]
  const uniqueTemperatures = [...new Set(responses.map(r => r.temperature))].sort((a, b) => a - b)
  const humanFriendlyModels = uniqueModels.map(getHumanFriendlyModelName)

  const allItems = responses.flatMap(r =>
    r.items.map(item => ({ ...item, model: r.model, temperature: r.temperature }))
  )

  const highestRatedItem = allItems.reduce((max, item) => item.rating > max.rating ? item : max, allItems[0])
  const lowestRatedItem = allItems.reduce((min, item) => item.rating < min.rating ? item : min, allItems[0])
  const avgRating = (allItems.reduce((sum, item) => sum + item.rating, 0) / allItems.length).toFixed(1)

  const activities = allItems.filter(item => item.type === 'activity').length
  const objects = allItems.filter(item => item.type === 'object').length

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-16">
        <div>
          <div className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            {uniqueModels.length}
          </div>
          <div className="text-sm text-muted-foreground">Models tested</div>
        </div>
        <div>
          <div className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            {totalItems.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Total responses</div>
        </div>
        <div>
          <div className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            {uniqueTemperatures.length}
          </div>
          <div className="text-sm text-muted-foreground">Temperature settings</div>
        </div>
        <div>
          <div className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            {avgRating}
          </div>
          <div className="text-sm text-muted-foreground">Average rating</div>
        </div>
      </div>

      <div className="border rounded-lg p-8 md:p-10 bg-card">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
              Highest rated
            </div>
            <div className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {highestRatedItem.name}
            </div>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Score: </span>
                <span className="font-semibold">{highestRatedItem.rating}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Type: </span>
                <span className="font-semibold capitalize">{highestRatedItem.type}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
              Lowest rated
            </div>
            <div className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {lowestRatedItem.name}
            </div>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Score: </span>
                <span className="font-semibold">{lowestRatedItem.rating}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Type: </span>
                <span className="font-semibold capitalize">{lowestRatedItem.type}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t">
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <div>
            <span className="font-medium text-foreground">{humanFriendlyModels.join(', ')}</span>
          </div>
          <div className="border-l pl-6">
            <span className="font-medium text-foreground">{activities}</span> activities, <span className="font-medium text-foreground">{objects}</span> objects
          </div>
          <div className="border-l pl-6">
            Temperatures: <span className="font-medium text-foreground">{uniqueTemperatures.join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
