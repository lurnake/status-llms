'use client'

import { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'

interface FiltersProps {
  availableModels: string[]
  availableTemperatures: number[]
  onFiltersChange: (filters: {
    models: string[]
    temperatures: number[]
    ratingRange: [number, number]
    itemType: 'activity' | 'object' | 'all'
  }) => void
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

export function Filters({ availableModels, availableTemperatures, onFiltersChange }: FiltersProps) {
  const [selectedModels, setSelectedModels] = useState<string[]>(availableModels)
  const [selectedTemperatures, setSelectedTemperatures] = useState<number[]>(availableTemperatures)
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 100])
  const [itemType, setItemType] = useState<'activity' | 'object' | 'all'>('all')

  useEffect(() => {
    onFiltersChange({
      models: selectedModels,
      temperatures: selectedTemperatures,
      ratingRange,
      itemType
    })
  }, [selectedModels, selectedTemperatures, ratingRange, itemType, onFiltersChange])

  const handleModelToggle = (model: string) => {
    setSelectedModels(prev =>
      prev.includes(model)
        ? prev.filter(m => m !== model)
        : [...prev, model]
    )
  }

  const handleTemperatureToggle = (temp: number) => {
    setSelectedTemperatures(prev =>
      prev.includes(temp)
        ? prev.filter(t => t !== temp)
        : [...prev, temp]
    )
  }

  return (
    <div className="space-y-8 sticky top-20">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
          Models
        </h3>
        <div className="space-y-2">
          {availableModels.map(model => (
            <button
              key={model}
              onClick={() => handleModelToggle(model)}
              className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                selectedModels.includes(model)
                  ? 'bg-foreground text-background font-medium'
                  : 'hover:bg-muted'
              }`}
            >
              {getHumanFriendlyModelName(model)}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t pt-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
          Temperature
        </h3>
        <div className="flex gap-2">
          {availableTemperatures.map(temp => (
            <button
              key={temp}
              onClick={() => handleTemperatureToggle(temp)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                selectedTemperatures.includes(temp)
                  ? 'bg-foreground text-background'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {temp}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t pt-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
          Rating range
        </h3>
        <div className="space-y-4">
          <Slider
            value={ratingRange}
            onValueChange={(value) => setRatingRange(value as [number, number])}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{ratingRange[0]}</span>
            <span>{ratingRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
          Type
        </h3>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All types' },
            { value: 'activity', label: 'Activities' },
            { value: 'object', label: 'Objects' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setItemType(option.value as 'activity' | 'object' | 'all')}
              className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                itemType === option.value
                  ? 'bg-foreground text-background font-medium'
                  : 'hover:bg-muted'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}