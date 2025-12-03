'use client'

import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/ui/container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const subscriptionPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 300,
    interval: 'monthly' as const,
    description: 'Perfect for beginners',
    features: [
      '5 AI meal plans per month',
      'Basic nutrition tracking',
      'Access to partner restaurants',
      'Email support'
    ]
  },
  {
    id: 'core',
    name: 'Core',
    price: 500,
    interval: 'monthly' as const,
    description: 'Most popular choice',
    features: [
      '15 AI meal plans per month',
      'Advanced nutrition tracking',
      'WHOOP integration',
      'Meal swapping & customization',
      'Access to all partner restaurants',
      'Priority email support'
    ],
    isPopular: true
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 800,
    interval: 'monthly' as const,
    description: 'For serious athletes',
    features: [
      'Unlimited AI meal plans',
      'Full nutrition analytics',
      'WHOOP integration',
      'Unlimited meal swapping',
      'Exclusive restaurant partnerships',
      'Personal nutrition consultation',
      '24/7 priority support'
    ]
  }
]

export default function SubscriptionPage() {
  const { toast } = useToast()

  const handleSelectPlan = (planName: string) => {
    toast({
      title: 'Plan Selected',
      description: `You selected the ${planName} plan. Payment integration coming soon!`
    })
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 bg-muted/30">
        <Container className="max-w-6xl space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Choose Your Plan</h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Select the perfect subscription plan to achieve your nutrition goals with MizanMeals
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {subscriptionPlans.map(plan => (
              <Card 
                key={plan.id} 
                className={`relative ${plan.isPopular ? 'border-primary shadow-lg scale-105' : ''}`}
              >
                {plan.isPopular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center space-y-2">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground"> QAR/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button 
                    className="w-full" 
                    variant={plan.isPopular ? 'default' : 'outline'}
                    onClick={() => handleSelectPlan(plan.name)}
                  >
                    Get Started
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
