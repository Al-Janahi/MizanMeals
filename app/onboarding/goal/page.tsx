'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepProgress } from '@/components/layout/step-progress'
import { GoalOptionCard } from '@/components/onboarding/goal-option-card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { GoalType } from '@/lib/types'
import { whoopData } from '@/lib/mock-data'
import { calculateMacrosFromCalories } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

const ONBOARDING_STEPS = [
  'Connect WHOOP',
  'WHOOP Summary',
  'Food Preferences',
  'Set Your Goal'
]

export default function GoalPage() {
  const [selectedGoal, setSelectedGoal] = useState<GoalType | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedGoal) {
      const avgCaloriesBurned = Math.round(
        whoopData.reduce((sum, d) => sum + d.caloriesBurned, 0) / whoopData.length
      )
      
      // Use WHOOP calories as base TDEE, adjust for goal
      let targetCalories = avgCaloriesBurned
      if (selectedGoal === 'lose') targetCalories -= 500
      if (selectedGoal === 'gain') targetCalories += 300
      
      const macros = calculateMacrosFromCalories(targetCalories, selectedGoal)
      
      // Save targets and goal
      sessionStorage.setItem('goal', selectedGoal)
      sessionStorage.setItem('targets', JSON.stringify({
        dailyCalories: targetCalories,
        ...macros
      }))
      
      router.push('/dashboard')
    }
  }

  return (
    <Container className="py-8 max-w-4xl">
      <StepProgress
        currentStep={4}
        totalSteps={ONBOARDING_STEPS.length}
        stepTitles={ONBOARDING_STEPS}
      />
      
      <div className="mt-12 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">What's Your Goal?</h1>
          <p className="text-muted-foreground text-balance">
            We'll calculate your nutrition targets based on your WHOOP data
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <GoalOptionCard
            goal="lose"
            selected={selectedGoal === 'lose'}
            onClick={() => setSelectedGoal('lose')}
          />
          <GoalOptionCard
            goal="maintain"
            selected={selectedGoal === 'maintain'}
            onClick={() => setSelectedGoal('maintain')}
          />
          <GoalOptionCard
            goal="gain"
            selected={selectedGoal === 'gain'}
            onClick={() => setSelectedGoal('gain')}
          />
        </div>

        <div className="flex gap-4 justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={handleContinue} disabled={!selectedGoal}>
            Complete Setup
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Container>
  )
}
