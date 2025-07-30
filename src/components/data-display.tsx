'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LLMResponse, StatusItem } from '@/lib/types'

interface DataDisplayProps {
  responses: LLMResponse[]
}

type SortBy = 'rating' | 'name' | 'model' | 'temperature'
type SortOrder = 'asc' | 'desc'

export function DataDisplay({ responses }: DataDisplayProps) {
  const [sortBy, setSortBy] = useState<SortBy>('rating')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

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

  const getRatingColor = (rating: number) => {
    if (rating >= 90) return 'bg-red-100 text-red-800 border-red-200'
    if (rating >= 80) return 'bg-orange-100 text-orange-800 border-orange-200'
    if (rating >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    if (rating >= 60) return 'bg-blue-100 text-blue-800 border-blue-200'
    return 'bg-gray-100 text-gray-800 border-gray-200'
  }

  if (responses.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No data available. Add JSON files to the /data folder to see results.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Data Display ({sortedItems.length} items)</CardTitle>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={(value: SortBy) => setSortBy(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="model">Sort by Model</SelectItem>
                  <SelectItem value="temperature">Sort by Temperature</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
              >
                {viewMode === 'grid' ? 'Table' : 'Grid'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedItems.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getRatingColor(item.rating)}`}>
                        {item.rating}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {item.type}
                      </span>
                    </div>
                    <h3 className="font-medium mb-2 line-clamp-2">{item.name}</h3>
                    <div className="text-xs text-muted-foreground">
                      <div>{item.model}</div>
                      <div>Temperature: {item.temperature}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Name</th>
                    <th className="text-left p-2 font-medium">Type</th>
                    <th className="text-left p-2 font-medium">Rating</th>
                    <th className="text-left p-2 font-medium">Model</th>
                    <th className="text-left p-2 font-medium">Temperature</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedItems.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2 capitalize">{item.type}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getRatingColor(item.rating)}`}>
                          {item.rating}
                        </span>
                      </td>
                      <td className="p-2 text-sm text-muted-foreground">{item.model}</td>
                      <td className="p-2 text-sm text-muted-foreground">{item.temperature}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}