'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LLMResponse, StatusItem } from '@/lib/types'
import { BarChart, BrainCircuit, Box, Thermometer, Star, TrendingUp, ArrowDown, HelpCircle } from 'lucide-react'

interface StatsOverviewProps {
  responses: LLMResponse[]
}

const StatCard = ({ icon, title, value, footer }: { icon: React.ReactNode, title: string, value: string, footer: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{footer}</p>
    </CardContent>
  </Card>
)

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
      <Card>
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <HelpCircle className="w-12 h-12 text-muted-foreground"/>
            <div>
              <p className="font-medium">No data loaded yet.</p>
              <p className="text-sm text-muted-foreground">Add JSON files to the `/data` directory to begin exploring LLM status perceptions.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const totalItems = responses.reduce((sum, response) => sum + response.items.length, 0)
  const uniqueModels = [...new Set(responses.map(r => r.model))]
  const uniqueTemperatures = [...new Set(responses.map(r => r.temperature))]
  const humanFriendlyModels = uniqueModels.map(getHumanFriendlyModelName)

  const allItems = responses.flatMap(r => 
    r.items.map(item => ({ ...item, model: r.model, temperature: r.temperature }))
  )

  const highestRatedItem = allItems.reduce((max, item) => item.rating > max.rating ? item : max, allItems[0])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard 
        icon={<BrainCircuit className="h-4 w-4 text-muted-foreground" />} 
        title="Models Tested" 
        value={uniqueModels.length.toString()}
        footer={humanFriendlyModels.join(', ')}
      />
      <StatCard 
        icon={<Thermometer className="h-4 w-4 text-muted-foreground" />} 
        title="Temperatures" 
        value={uniqueTemperatures.length.toString()}
        footer={`Tested at ${uniqueTemperatures.join(', ')} creativity levels`}
      />
      <StatCard 
        icon={<Box className="h-4 w-4 text-muted-foreground" />} 
        title="Total Items Analyzed" 
        value={totalItems.toString()}
        footer={`${responses.length} total responses from models`}
      />
      
      {highestRatedItem && (
        <Card className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/50 dark:to-orange-900/50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-500" />
              <CardTitle className="text-lg">Top Status Symbol</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tracking-tight">{highestRatedItem.name}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
              <span>Rating: <span className="font-bold text-foreground">{highestRatedItem.rating}</span></span>
              <span>Type: <span className="font-bold text-foreground capitalize">{highestRatedItem.type}</span></span>
              <span>Source: <span className="font-bold text-foreground">{getHumanFriendlyModelName(highestRatedItem.model)} @ {highestRatedItem.temperature}</span></span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
