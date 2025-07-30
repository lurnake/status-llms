'use client'

import { useState, useMemo } from 'react'
import { Filters } from '@/components/filters'
import { DataDisplay } from '@/components/data-display'
import { LLMResponse } from '@/lib/types'

interface MainDisplayProps {
  initialData: LLMResponse[]
}

interface FilterState {
  models: string[]
  temperatures: number[]
  ratingRange: [number, number]
  itemType: 'activity' | 'object' | 'all'
}

export function MainDisplay({ initialData }: MainDisplayProps) {
  const availableModels = useMemo(() => [...new Set(initialData.map(res => res.model))].sort(), [initialData])
  const availableTemperatures = useMemo(() => [...new Set(initialData.map(res => res.temperature))].sort((a, b) => a - b), [initialData])

  const [filters, setFilters] = useState<FilterState>({
    models: availableModels,
    temperatures: availableTemperatures,
    ratingRange: [0, 100],
    itemType: 'all',
  })

  const filteredData = useMemo(() => {
    let data = [...initialData]

    // Filter responses by model and temperature
    data = data.filter(res => filters.models.includes(res.model))
    data = data.filter(res => filters.temperatures.includes(res.temperature))

    // Filter items within the remaining responses
    return data.map(res => {
      let items = res.items

      if (filters.itemType !== 'all') {
        items = items.filter(item => item.type === filters.itemType)
      }

      items = items.filter(item => item.rating >= filters.ratingRange[0] && item.rating <= filters.ratingRange[1])

      return { ...res, items }
    }).filter(res => res.items.length > 0) // Remove responses that have no items left

  }, [initialData, filters])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <Filters
          availableModels={availableModels}
          availableTemperatures={availableTemperatures}
          onFiltersChange={setFilters}
        />
      </div>
      <div className="lg:col-span-3">
        <DataDisplay responses={filteredData} />
      </div>
    </div>
  )
}
