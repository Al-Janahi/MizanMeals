'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { MealCard } from '@/components/meals/meal-card'
import { MealSwapDialog } from '@/components/meals/meal-swap-dialog'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MealPlan, MealItem, NutritionTargets } from '@/lib/types'
import { generateMealPlan } from '@/lib/utils'
import { meals } from '@/lib/mock-data'
import { Calendar, Download, RefreshCw, Coffee, UtensilsCrossed, Pizza, Apple, Target, Flame, Beef, Wheat, Droplet } from 'lucide-react'
import { getMacroColor } from '@/lib/theme'

export default function DashboardPage() {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null)
  const [targets, setTargets] = useState<NutritionTargets | null>(null)
  const [swapDialogOpen, setSwapDialogOpen] = useState(false)
  const [currentMeal, setCurrentMeal] = useState<MealItem | null>(null)

  useEffect(() => {
    const savedPlan = sessionStorage.getItem('mealPlan')
    const savedTargets = sessionStorage.getItem('targets')
    
    if (savedTargets) {
      setTargets(JSON.parse(savedTargets))
    }
    
    if (savedPlan) {
      setMealPlan(JSON.parse(savedPlan))
    } else if (savedTargets) {
      const targetsData = JSON.parse(savedTargets)
      const plan = generateMealPlan(targetsData.dailyCalories, meals)
      setMealPlan(plan)
      sessionStorage.setItem('mealPlan', JSON.stringify(plan))
    }
  }, [])

  const handleSwapMeal = (meal: MealItem) => {
    setCurrentMeal(meal)
    setSwapDialogOpen(true)
  }

  const handleSelectMeal = (newMeal: MealItem) => {
    if (!mealPlan || !currentMeal) return

    const category = currentMeal.category
    const updatedMeals = mealPlan[category].map(m =>
      m.id === currentMeal.id ? newMeal : m
    )

    const allMeals = [
      ...updatedMeals,
      ...mealPlan.breakfast.filter(m => m.category !== category),
      ...mealPlan.lunch.filter(m => m.category !== category),
      ...mealPlan.dinner.filter(m => m.category !== category),
      ...mealPlan.snacks.filter(m => m.category !== category)
    ]

    const updatedPlan = {
      ...mealPlan,
      [category]: updatedMeals,
      totalCalories: allMeals.reduce((sum, m) => sum + m.calories, 0),
      totalProtein: allMeals.reduce((sum, m) => sum + m.protein, 0),
      totalCarbs: allMeals.reduce((sum, m) => sum + m.carbs, 0),
      totalFat: allMeals.reduce((sum, m) => sum + m.fat, 0)
    }

    setMealPlan(updatedPlan)
    sessionStorage.setItem('mealPlan', JSON.stringify(updatedPlan))
  }

  const getAlternatives = (): MealItem[] => {
    if (!currentMeal) return []
    return meals.filter(
      m => m.category === currentMeal.category && m.id !== currentMeal.id
    )
  }

  const handleRegeneratePlan = () => {
    if (!targets) return
    const newPlan = generateMealPlan(targets.dailyCalories, meals)
    setMealPlan(newPlan)
    sessionStorage.setItem('mealPlan', JSON.stringify(newPlan))
  }

  if (!mealPlan || !targets) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading your meal plan...</p>
        </div>
        <Footer />
      </>
    )
  }

  const totalMacroGrams = mealPlan.totalProtein + mealPlan.totalCarbs + mealPlan.totalFat
  const proteinPercent = Math.round((mealPlan.totalProtein / totalMacroGrams) * 100)
  const carbsPercent = Math.round((mealPlan.totalCarbs / totalMacroGrams) * 100)
  const fatPercent = Math.round((mealPlan.totalFat / totalMacroGrams) * 100)

  const userGoal = sessionStorage.getItem('goal') || 'maintain'
  const goalText = userGoal === 'lose' ? 'Lose Weight' : userGoal === 'gain' ? 'Gain Weight' : 'Maintain Weight'

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8 bg-neutral-50">
        <Container className="max-w-7xl space-y-4">
          <div className="space-y-2 pb-3 border-b">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-medium text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h2>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">Today's Meal Plan</h1>
                <Badge variant="default" className="px-3 py-1 bg-primary text-primary-foreground flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5" />
                  {goalText}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleRegeneratePlan}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          <Card className="shadow-sm border-2">
            <CardHeader className="pb-3 pt-4">
              <CardTitle className="text-lg">Daily Nutrition Overview</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Beef className="h-4 w-4" style={{ color: getMacroColor('protein') }} />
                    <span className="text-sm font-medium">Protein</span>
                  </div>
                  <p className="text-base font-semibold">
                    {mealPlan.totalProtein} / {targets.protein}g
                  </p>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all"
                      style={{ 
                        width: `${mealPlan.totalProtein === 0 ? 2 : Math.min((mealPlan.totalProtein / targets.protein) * 100, 100)}%`,
                        backgroundColor: getMacroColor('protein'),
                        opacity: mealPlan.totalProtein === 0 ? 0.3 : 1
                      }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Wheat className="h-4 w-4" style={{ color: getMacroColor('carbs') }} />
                    <span className="text-sm font-medium">Carbs</span>
                  </div>
                  <p className="text-base font-semibold">
                    {mealPlan.totalCarbs} / {targets.carbs}g
                  </p>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all"
                      style={{ 
                        width: `${mealPlan.totalCarbs === 0 ? 2 : Math.min((mealPlan.totalCarbs / targets.carbs) * 100, 100)}%`,
                        backgroundColor: getMacroColor('carbs'),
                        opacity: mealPlan.totalCarbs === 0 ? 0.3 : 1
                      }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Droplet className="h-4 w-4" style={{ color: getMacroColor('fat') }} />
                    <span className="text-sm font-medium">Fat</span>
                  </div>
                  <p className="text-base font-semibold">
                    {mealPlan.totalFat} / {targets.fat}g
                  </p>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all"
                      style={{ 
                        width: `${mealPlan.totalFat === 0 ? 2 : Math.min((mealPlan.totalFat / targets.fat) * 100, 100)}%`,
                        backgroundColor: getMacroColor('fat'),
                        opacity: mealPlan.totalFat === 0 ? 0.3 : 1
                      }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Calories</span>
                  </div>
                  <p className="text-base font-semibold">
                    {mealPlan.totalCalories} / {targets.dailyCalories}
                  </p>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ 
                        width: `${mealPlan.totalCalories === 0 ? 2 : Math.min((mealPlan.totalCalories / targets.dailyCalories) * 100, 100)}%`,
                        opacity: mealPlan.totalCalories === 0 ? 0.3 : 1
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-xs text-muted-foreground">Macro Distribution</p>
                <div className="flex h-2.5 w-full overflow-hidden rounded-full">
                  <div 
                    className="transition-all relative group"
                    style={{ 
                      width: `${proteinPercent}%`,
                      backgroundColor: getMacroColor('protein')
                    }}
                  >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-medium">
                      {proteinPercent}%
                    </span>
                  </div>
                  <div 
                    className="transition-all relative group"
                    style={{ 
                      width: `${carbsPercent}%`,
                      backgroundColor: getMacroColor('carbs')
                    }}
                  >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-medium">
                      {carbsPercent}%
                    </span>
                  </div>
                  <div 
                    className="transition-all relative group"
                    style={{ 
                      width: `${fatPercent}%`,
                      backgroundColor: getMacroColor('fat')
                    }}
                  >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-medium">
                      {fatPercent}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-2">
            <CardContent className="pt-6">
              <Tabs defaultValue="breakfast" className="space-y-4">
                <div className="border-b pb-3">
                  <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/50">
                    <TabsTrigger 
                      value="breakfast" 
                      className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all"
                    >
                      <Coffee className="h-4 w-4" />
                      <span className="font-medium">Breakfast</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="lunch" 
                      className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all"
                    >
                      <UtensilsCrossed className="h-4 w-4" />
                      <span className="font-medium">Lunch</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="dinner" 
                      className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all"
                    >
                      <Pizza className="h-4 w-4" />
                      <span className="font-medium">Dinner</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="snacks" 
                      className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all"
                    >
                      <Apple className="h-4 w-4" />
                      <span className="font-medium">Snacks</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="breakfast" className="space-y-4">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {mealPlan.breakfast.map(meal => (
                      <MealCard
                        key={meal.id}
                        meal={meal}
                        showSwapButton
                        onSwap={() => handleSwapMeal(meal)}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="lunch" className="space-y-4">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {mealPlan.lunch.map(meal => (
                      <MealCard
                        key={meal.id}
                        meal={meal}
                        showSwapButton
                        onSwap={() => handleSwapMeal(meal)}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="dinner" className="space-y-4">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {mealPlan.dinner.map(meal => (
                      <MealCard
                        key={meal.id}
                        meal={meal}
                        showSwapButton
                        onSwap={() => handleSwapMeal(meal)}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="snacks" className="space-y-4">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {mealPlan.snacks.map(meal => (
                      <MealCard
                        key={meal.id}
                        meal={meal}
                        showSwapButton
                        onSwap={() => handleSwapMeal(meal)}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </Container>
      </main>
      <Footer />

      {currentMeal && (
        <MealSwapDialog
          currentMeal={currentMeal}
          alternatives={getAlternatives()}
          onSelect={handleSelectMeal}
          open={swapDialogOpen}
          onClose={() => setSwapDialogOpen(false)}
        />
      )}
    </>
  )
}
