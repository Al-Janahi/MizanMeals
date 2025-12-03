'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { MealCard } from '@/components/meals/meal-card'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { meals } from '@/lib/mock-data'
import { Search } from 'lucide-react'

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const allTags = Array.from(new Set(meals.flatMap(m => m.tags)))

  const filteredMeals = meals.filter(meal => {
    const matchesSearch = searchQuery === '' || 
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => meal.tags.includes(tag))
    
    return matchesSearch && matchesTags
  })

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8 bg-muted/30">
        <Container className="max-w-7xl space-y-8">
          <div>
            <h1 className="text-4xl font-bold">Browse Meals</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Explore {meals.length} nutritious meals from partner restaurants
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search meals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2">
              <Label>Filter by tags:</Label>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer px-3 py-1"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredMeals.length} of {meals.length} meals
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMeals.map(meal => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
