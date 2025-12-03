import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepProgressProps {
  currentStep: number
  totalSteps: number
  stepTitles: string[]
  className?: string
}

export function StepProgress({ 
  currentStep, 
  totalSteps, 
  stepTitles,
  className 
}: StepProgressProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="mb-8 flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isCompleted = step < currentStep
          const isCurrent = step === currentStep
          const isUpcoming = step > currentStep

          return (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-colors',
                    isCompleted && 'border-primary bg-primary text-primary-foreground',
                    isCurrent && 'border-primary bg-background text-primary',
                    isUpcoming && 'border-muted-foreground/30 bg-background text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
                <span
                  className={cn(
                    'hidden text-xs font-medium sm:block',
                    isCurrent && 'text-primary',
                    isUpcoming && 'text-muted-foreground'
                  )}
                >
                  {stepTitles[step - 1]}
                </span>
              </div>
              {step < totalSteps && (
                <div
                  className={cn(
                    'mx-2 h-0.5 flex-1 transition-colors',
                    step < currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
