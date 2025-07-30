'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'

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

export function Filters({ availableModels, availableTemperatures, onFiltersChange }: FiltersProps) {
  const [selectedModels, setSelectedModels] = useState<string[]>(availableModels)
  const [selectedTemperatures, setSelectedTemperatures] = useState<number[]>(availableTemperatures)
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 100])
  const [itemType, setItemType] = useState<'activity' | 'object' | 'all'>('all')

  const handleApplyFilters = () => {
    onFiltersChange({
      models: selectedModels,
      temperatures: selectedTemperatures,
      ratingRange,
      itemType
    })
  }

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
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Models</label>
          <div className="flex flex-wrap gap-2">
            {availableModels.map(model => (
              <Button
                key={model}
                variant={selectedModels.includes(model) ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleModelToggle(model)}
              >
                {model}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Temperatures</label>
          <div className="flex gap-2">
            {availableTemperatures.map(temp => (
              <Button
                key={temp}
                variant={selectedTemperatures.includes(temp) ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTemperatureToggle(temp)}
              >
                {temp}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Rating Range: {ratingRange[0]} - {ratingRange[1]}
          </label>
          <Slider
            value={ratingRange}
            onValueChange={(value) => setRatingRange(value as [number, number])}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Item Type</label>
          <Select value={itemType} onValueChange={(value: 'activity' | 'object' | 'all') => setItemType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="activity">Activities</SelectItem>
              <SelectItem value="object">Objects</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleApplyFilters} className="w-full">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  )
}