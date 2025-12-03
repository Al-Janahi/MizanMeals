'use client'

import { MealPlan } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MacroBar } from '@/components/shared/macro-bar'
import { CalorieBadge } from '@/components/shared/calorie-badge'

interface DailyPlanPreviewProps {
  mealPlan: MealPlan
}

export function DailyPlanPreview({ mealPlan }: DailyPlanPreviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Daily Meal Plan</CardTitle>
          <CardDescription>AI-generated based on your goals and targets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Calories</span>
            <CalorieBadge calories={mealPlan.totalCalories} />
          </div>
          
          <MacroBar
            protein={mealPlan.totalProtein}
            carbs={mealPlan.totalCarbs}
            fat={mealPlan.totalFat}
            total={mealPlan.totalCalories}
            showLabels
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        {mealPlan.breakfast.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Breakfast</CardTitle>
            </CardHeader>
            <CardContent>
              {mealPlan.breakfast.map(meal => (
                <div key={meal.id} className="flex justify-between items-center">
                  <span className="text-sm">{meal.name}</span>
                  <CalorieBadge calories={meal.calories} size="sm" />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {mealPlan.lunch.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lunch</CardTitle>
            </CardHeader>
            <CardContent>
              {mealPlan.lunch.map(meal => (
                <div key={meal.id} className="flex justify-between items-center">
                  <span className="text-sm">{meal.name}</span>
                  <CalorieBadge calories={meal.calories} size="sm" />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {mealPlan.dinner.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dinner</CardTitle>
            </CardHeader>
            <CardContent>
              {mealPlan.dinner.map(meal => (
                <div key={meal.id} className="flex justify-between items-center">
                  <span className="text-sm">{meal.name}</span>
                  <CalorieBadge calories={meal.calories} size="sm" />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {mealPlan.snacks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Snacks</CardTitle>
            </CardHeader>
            <CardContent>
              {mealPlan.snacks.map(meal => (
                <div key={meal.id} className="flex justify-between items-center">
                  <span className="text-sm">{meal.name}</span>
                  <CalorieBadge calories={meal.calories} size="sm" />
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
