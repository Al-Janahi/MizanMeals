'use client'

import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { RestaurantCard } from '@/components/shared/restaurant-card'
import { Container } from '@/components/ui/container'
import { restaurants, meals } from '@/lib/mock-data'

export default function RestaurantsPage() {
  const getMealCount = (restaurantId: string) => {
    return meals.filter(m => m.restaurantId === restaurantId).length
  }

  const sortedRestaurants = [...restaurants].sort((a, b) => 
    getMealCount(b.id) - getMealCount(a.id)
  )

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8 bg-muted/30">
        <Container className="max-w-7xl space-y-8">
          <div>
            <h1 className="text-4xl font-bold">Partner Restaurants</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Discover our network of {restaurants.length} healthy dining partners across Doha
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedRestaurants.map(restaurant => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                mealCount={getMealCount(restaurant.id)}
              />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
