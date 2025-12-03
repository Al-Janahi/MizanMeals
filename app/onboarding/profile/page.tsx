'use client'

import { useRouter } from 'next/navigation'
import { StepProgress } from '@/components/layout/step-progress'
import { ProfileForm } from '@/components/onboarding/profile-form'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

const ONBOARDING_STEPS = [
  'Connect WHOOP',
  'WHOOP Activity',
  'Profile',
  'Goal',
  'Targets',
  'Daily Plan'
]

export default function ProfilePage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    // Store in session/state
    sessionStorage.setItem('userProfile', JSON.stringify(data))
    router.push('/onboarding/goal')
  }

  return (
    <Container className="py-8 max-w-2xl">
      <StepProgress
        currentStep={3}
        totalSteps={ONBOARDING_STEPS.length}
        stepTitles={ONBOARDING_STEPS}
      />
      
      <div className="mt-12 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Tell Us About Yourself</h1>
          <p className="text-muted-foreground text-balance">
            We need some basic information to calculate your personalized nutrition targets.
          </p>
        </div>

        <ProfileForm onSubmit={handleSubmit} />

        <div className="flex justify-start">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </div>
    </Container>
  )
}
