'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface MealCategoryTabsProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function MealCategoryTabs({ categories, activeCategory, onCategoryChange }: MealCategoryTabsProps) {
  return (
    <Tabs value={activeCategory} onValueChange={onCategoryChange}>
      <TabsList className="w-full grid grid-cols-4">
        {categories.map(category => (
          <TabsTrigger key={category} value={category} className="capitalize">
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
