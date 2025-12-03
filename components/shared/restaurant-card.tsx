'use client'

import { Restaurant } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, Utensils } from 'lucide-react'
import Image from 'next/image'

interface RestaurantCardProps {
  restaurant: Restaurant
  onClick?: () => void
  mealCount?: number
}

export function RestaurantCard({ restaurant, onClick, mealCount }: RestaurantCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all overflow-hidden group" onClick={onClick}>
      <div className="relative h-40 w-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center overflow-hidden">
        <Image
          src={restaurant.logoUrl || "/placeholder.svg"}
          alt={restaurant.name}
          width={140}
          height={140}
          className="object-contain p-4 group-hover:scale-110 transition-transform"
        />
      </div>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl leading-tight">{restaurant.name}</CardTitle>
          {restaurant.isPartner && (
            <Badge className="text-xs shrink-0">Partner</Badge>
          )}
        </div>
        <CardDescription className="line-clamp-2 text-sm">{restaurant.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{restaurant.address}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{restaurant.rating}</span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">{restaurant.priceRange}</span>
          {mealCount !== undefined && (
            <div className="flex items-center gap-1 text-primary">
              <Utensils className="h-4 w-4" />
              <span className="text-sm font-semibold">{mealCount}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {restaurant.cuisine.slice(0, 3).map(c => (
            <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
