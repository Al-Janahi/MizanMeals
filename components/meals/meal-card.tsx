'use client'

import { MealItem } from '@/lib/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, RefreshCw, Store } from 'lucide-react'
import Image from 'next/image'
import { restaurants } from '@/lib/mock-data'

interface MealCardProps {
  meal: MealItem
  showSwapButton?: boolean
  onSwap?: () => void
}

export function MealCard({ meal, showSwapButton = false, onSwap }: MealCardProps) {
  const restaurant = restaurants.find(r => r.id === meal.restaurantId)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 duration-200">
      <div className="relative h-48 w-full bg-muted">
        <Image
          src={meal.imageUrl || "/placeholder.svg?height=200&width=400&query=healthy+meal"}
          alt={meal.name}
          fill
          className="object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground font-semibold">
          {meal.calories} cal
        </Badge>
      </div>
      
      {showSwapButton && onSwap && (
        <div className="px-4 pt-4">
          <Button variant="outline" size="sm" className="w-full" onClick={onSwap}>
            <RefreshCw className="mr-2 h-3.5 w-3.5" />
            Swap
          </Button>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-1">{meal.name}</CardTitle>
        {restaurant && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
            <Store className="h-3.5 w-3.5" />
            <span>{restaurant.name}</span>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3 pb-4">
        <div className="flex items-center gap-2">
          <Badge 
            variant="outline" 
            className="rounded-full h-8 w-8 p-0 flex items-center justify-center text-xs font-semibold border-2"
            style={{ borderColor: 'hsl(var(--chart-1))', color: 'hsl(var(--chart-1))' }}
          >
            P
          </Badge>
          <span className="text-sm font-medium">{meal.protein}g</span>
          
          <Badge 
            variant="outline" 
            className="rounded-full h-8 w-8 p-0 flex items-center justify-center text-xs font-semibold border-2 ml-2"
            style={{ borderColor: 'hsl(var(--chart-2))', color: 'hsl(var(--chart-2))' }}
          >
            C
          </Badge>
          <span className="text-sm font-medium">{meal.carbs}g</span>
          
          <Badge 
            variant="outline" 
            className="rounded-full h-8 w-8 p-0 flex items-center justify-center text-xs font-semibold border-2 ml-2"
            style={{ borderColor: 'hsl(var(--chart-3))', color: 'hsl(var(--chart-3))' }}
          >
            F
          </Badge>
          <span className="text-sm font-medium">{meal.fat}g</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{meal.prepTime} min prep</span>
        </div>

        {meal.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {meal.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
