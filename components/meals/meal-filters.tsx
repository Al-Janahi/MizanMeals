'use client'

import { FilterOptions, MealCategory } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Search, X } from 'lucide-react'

interface MealFiltersProps {
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
}

export function MealFilters({ filters, onFilterChange }: MealFiltersProps) {
  const availableTags = ['high-protein', 'low-fat', 'vegetarian', 'low-calorie']

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag]
    onFilterChange({ ...filters, tags: newTags })
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="space-y-2">
        <Label htmlFor="search">Search Meals</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            placeholder="Search by name..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Filter by Tags</Label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => (
            <Badge
              key={tag}
              variant={filters.tags.includes(tag) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
              {filters.tags.includes(tag) && <X className="ml-1 h-3 w-3" />}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
