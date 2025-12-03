'use client'

import { useRouter } from 'next/navigation'
import { StepProgress } from '@/components/layout/step-progress'
import { WhoopActivityChart } from '@/components/onboarding/whoop-activity-chart'
import { StatCard } from '@/components/shared/stat-card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { whoopData } from '@/lib/mock-data'
import { Activity, Heart, Moon } from 'lucide-react'

const ONBOARDING_STEPS = [
  'Connect WHOOP',
  'WHOOP Activity',
  'Profile',
  'Goal',
  'Targets',
  'Daily Plan'
]

export default function WhoopActivityPage() {
  const router = useRouter()

  const avgStrain = (whoopData.reduce((sum, d) => sum + d.strain, 0) / whoopData.length).toFixed(1)
  const avgRecovery = Math.round(whoopData.reduce((sum, d) => sum + d.recovery, 0) / whoopData.length)
  const avgSleep = (whoopData.reduce((sum, d) => sum + d.sleepHours, 0) / whoopData.length).toFixed(1)

  return (
    <Container className="py-8 max-w-4xl">
      <StepProgress
        currentStep={2}
        totalSteps={ONBOARDING_STEPS.length}
        stepTitles={ONBOARDING_STEPS}
      />
      
      <div className="mt-12 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Your WHOOP Activity</h1>
          <p className="text-muted-foreground text-balance">
            Here's your data from the past 7 days. We'll use this to optimize your meal recommendations based on your training load and recovery.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            label="Average Strain"
            value={avgStrain}
            icon={<Activity className="h-5 w-5" />}
          />
          <StatCard
            label="Average Recovery"
            value={`${avgRecovery}%`}
            icon={<Heart className="h-5 w-5" />}
          />
          <StatCard
            label="Average Sleep"
            value={`${avgSleep}h`}
            icon={<Moon className="h-5 w-5" />}
          />
        </div>

        <WhoopActivityChart data={whoopData} />

        <div className="flex gap-4 justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={() => router.push('/onboarding/profile')}>
            Next
          </Button>
        </div>
      </div>
    </Container>
  )
}
