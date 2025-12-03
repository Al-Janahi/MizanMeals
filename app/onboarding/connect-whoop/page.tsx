'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepProgress } from '@/components/layout/step-progress'
import { WhoopConnectButton } from '@/components/onboarding/whoop-connect-button'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

const ONBOARDING_STEPS = [
  'Connect WHOOP',
  'WHOOP Summary',
  'Food Preferences',
  'Set Your Goal'
]

export default function ConnectWhoopPage() {
  const [isConnected, setIsConnected] = useState(false)
  const router = useRouter()

  const handleConnect = () => {
    setIsConnected(true)
  }

  const handleContinue = () => {
    if (isConnected) {
      router.push('/onboarding/whoop-summary')
    }
  }

  return (
    <Container className="py-8 max-w-2xl">
      <StepProgress
        currentStep={1}
        totalSteps={ONBOARDING_STEPS.length}
        stepTitles={ONBOARDING_STEPS}
      />
      
      <div className="mt-12 text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Connect Your WHOOP</h1>
          <p className="text-muted-foreground text-balance">
            Connect your WHOOP account to unlock smarter meal recommendations based on your recovery and activity data.
          </p>
        </div>

        <div className="flex justify-center py-8">
          <WhoopConnectButton
            onConnect={handleConnect}
            isConnected={isConnected}
          />
        </div>

        {isConnected && (
          <div className="space-y-2">
            <p className="text-sm text-green-600 font-medium">Successfully connected!</p>
            <Button onClick={handleContinue} size="lg" className="w-full max-w-md">
              Continue
            </Button>
          </div>
        )}
      </div>
    </Container>
  )
}
