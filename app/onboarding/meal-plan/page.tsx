'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { StepProgress } from '@/components/layout/step-progress'
import { DailyPlanPreview } from '@/components/onboarding/daily-plan-preview'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { generateMealPlan } from '@/lib/utils'
import { meals } from '@/lib/mock-data'
import { MealPlan } from '@/lib/types'

const ONBOARDING_STEPS = [
  'Connect WHOOP',
  'WHOOP Activity',
  'Profile',
  'Goal',
  'Targets',
  'Daily Plan'
]

export default function MealPlanPage() {
  const router = useRouter()
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null)

  useEffect(() => {
    const targetsData = sessionStorage.getItem('targets')
    if (targetsData) {
      const targets = JSON.parse(targetsData)
      const plan = generateMealPlan(targets.calories, meals)
      setMealPlan(plan)
      sessionStorage.setItem('mealPlan', JSON.stringify(plan))
    }
  }, [])

  const handleGoToDashboard = () => {
    router.push('/dashboard')
  }

  if (!mealPlan) {
    return (
      <Container className="py-8 max-w-2xl">
        <div className="text-center">Generating your meal plan...</div>
      </Container>
    )
  }

  return (
    <Container className="py-8 max-w-2xl">
      <StepProgress
        currentStep={6}
        totalSteps={ONBOARDING_STEPS.length}
        stepTitles={ONBOARDING_STEPS}
      />
      
      <div className="mt-12 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">You're All Set!</h1>
          <p className="text-muted-foreground text-balance">
            Here's your first AI-generated meal plan. You can swap meals anytime to match your preferences.
          </p>
        </div>

        <DailyPlanPreview mealPlan={mealPlan} />

        <div className="flex gap-4 justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={handleGoToDashboard} size="lg">
            Go to Dashboard
          </Button>
        </div>
      </div>
    </Container>
  )
}
