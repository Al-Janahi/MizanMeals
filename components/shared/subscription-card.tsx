'use client'

import { SubscriptionPlan } from '@/lib/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SubscriptionCardProps {
  plan: SubscriptionPlan
  isPopular?: boolean
  onSelect: () => void
}

export function SubscriptionCard({ plan, isPopular, onSelect }: SubscriptionCardProps) {
  return (
    <Card className={cn(
      'relative',
      isPopular && 'border-primary border-2 shadow-lg'
    )}>
      {isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          Most Popular
        </Badge>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription>
          <span className="text-4xl font-bold text-foreground">QAR {plan.price}</span>
          <span className="text-muted-foreground">/{plan.interval}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onSelect}
          variant={isPopular ? 'default' : 'outline'}
          className="w-full"
        >
          Choose Plan
        </Button>
      </CardFooter>
    </Card>
  )
}
