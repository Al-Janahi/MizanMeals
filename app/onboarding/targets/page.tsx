'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { StepProgress } from '@/components/layout/step-progress'
import { MacroInput } from '@/components/onboarding/macro-input'
import { MacroBar } from '@/components/shared/macro-bar'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { calculateDailyCalories, calculateMacrosFromCalories } from '@/lib/utils'
import { getMacroColor } from '@/lib/theme'

const ONBOARDING_STEPS = [
  'Connect WHOOP',
  'WHOOP Activity',
  'Profile',
  'Goal',
  'Targets',
  'Daily Plan'
]

export default function TargetsPage() {
  const router = useRouter()
  const [targets, setTargets] = useState({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 67
  })

  useEffect(() => {
    // Calculate defaults based on profile
    const profileData = sessionStorage.getItem('userProfile')
    const goal = sessionStorage.getItem('goal') as any
    
    if (profileData && goal) {
      const profile = JSON.parse(profileData)
      const calories = calculateDailyCalories(
        profile.weight,
        profile.height,
        profile.age,
        profile.activityLevel,
        goal
      )
      const macros = calculateMacrosFromCalories(calories, goal)
      setTargets({
        calories,
        ...macros
      })
    }
  }, [])

  const handleContinue = () => {
    sessionStorage.setItem('targets', JSON.stringify(targets))
    router.push('/onboarding/meal-plan')
  }

  return (
    <Container className="py-8 max-w-2xl">
      <StepProgress
        currentStep={5}
        totalSteps={ONBOARDING_STEPS.length}
        stepTitles={ONBOARDING_STEPS}
      />
      
      <div className="mt-12 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Set Your Daily Targets</h1>
          <p className="text-muted-foreground text-balance">
            Based on your profile and goal, here are your recommended daily nutrition targets. You can adjust them as needed.
          </p>
        </div>

        <div className="space-y-6 max-w-md mx-auto">
          <MacroInput
            label="Calories"
            value={targets.calories}
            onChange={(value) => setTargets({ ...targets, calories: value })}
            unit="kcal"
            color="#22c55e"
          />
          <MacroInput
            label="Protein"
            value={targets.protein}
            onChange={(value) => setTargets({ ...targets, protein: value })}
            unit="grams"
            color={getMacroColor('protein')}
          />
          <MacroInput
            label="Carbs"
            value={targets.carbs}
            onChange={(value) => setTargets({ ...targets, carbs: value })}
            unit="grams"
            color={getMacroColor('carbs')}
          />
          <MacroInput
            label="Fat"
            value={targets.fat}
            onChange={(value) => setTargets({ ...targets, fat: value })}
            unit="grams"
            color={getMacroColor('fat')}
          />

          <div className="pt-4">
            <p className="text-sm font-medium mb-2">Macro Distribution</p>
            <MacroBar
              protein={targets.protein}
              carbs={targets.carbs}
              fat={targets.fat}
              total={targets.calories}
              showLabels
            />
          </div>
        </div>

        <div className="flex gap-4 justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={handleContinue}>
            Generate Meal Plan
          </Button>
        </div>
      </div>
    </Container>
  )
}
