'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { StepProgress } from '@/components/layout/step-progress'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { WhoopLineChart } from '@/components/charts/whoop-line-chart'
import { WhoopBarChart } from '@/components/charts/whoop-bar-chart'
import { whoopData } from '@/lib/mock-data'
import { ArrowRight, Flame, Activity, Battery, Moon, Heart, Zap, CheckCircle2 } from 'lucide-react'

const ONBOARDING_STEPS = [
  'Connect WHOOP',
  'WHOOP Summary',
  'Food Preferences',
  'Set Your Goal'
]

export default function WhoopSummaryPage() {
  const router = useRouter()

  const avgCaloriesBurned = Math.round(
    whoopData.reduce((sum, d) => sum + d.caloriesBurned, 0) / whoopData.length
  )
  const avgStrain = (
    whoopData.reduce((sum, d) => sum + d.strain, 0) / whoopData.length
  ).toFixed(1)
  const avgRecovery = Math.round(
    whoopData.reduce((sum, d) => sum + d.recovery, 0) / whoopData.length
  )
  const avgSleep = (
    whoopData.reduce((sum, d) => sum + d.sleepHours, 0) / whoopData.length
  ).toFixed(1)
  const avgRestingHR = Math.round(
    whoopData.reduce((sum, d) => sum + d.heartRateAvg, 0) / whoopData.length
  )

  const getMinMax = (key: keyof typeof whoopData[0]) => {
    const values = whoopData.map(d => d[key] as number)
    return { min: Math.min(...values), max: Math.max(...values) }
  }

  const strainStats = getMinMax('strain')
  const caloriesStats = getMinMax('caloriesBurned')
  const sleepStats = getMinMax('sleepHours')
  const recoveryStats = getMinMax('recovery')
  const hrStats = getMinMax('heartRateAvg')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
      
      <Container className="max-w-5xl py-8 space-y-6 relative">
        <StepProgress
          currentStep={2}
          totalSteps={ONBOARDING_STEPS.length}
          stepTitles={ONBOARDING_STEPS}
        />

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                WHOOP Integration Verified
              </Badge>
            </div>
            <h1 className="text-3xl font-bold">Your WHOOP Summary</h1>
            <p className="text-base text-muted-foreground">
              Your average data from the past 7 days
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="shadow-md hover:shadow-lg transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-4" style={{ animationDelay: '0ms' }}>
              <CardContent className="pt-5 pb-4 space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Avg Calories Burned</span>
                </div>
                <p className="text-3xl font-bold text-primary">{avgCaloriesBurned}</p>
                <p className="text-xs text-muted-foreground">
                  Min: {caloriesStats.min} · Max: {caloriesStats.max}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-4" style={{ animationDelay: '100ms' }}>
              <CardContent className="pt-5 pb-4 space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Avg Strain</span>
                </div>
                <p className="text-3xl font-bold text-primary">{avgStrain}</p>
                <p className="text-xs text-muted-foreground">
                  Min: {strainStats.min.toFixed(1)} · Max: {strainStats.max.toFixed(1)}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-4" style={{ animationDelay: '200ms' }}>
              <CardContent className="pt-5 pb-4 space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Battery className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Avg Recovery</span>
                </div>
                <p className="text-3xl font-bold text-primary">{avgRecovery}%</p>
                <p className="text-xs text-muted-foreground">
                  Min: {recoveryStats.min}% · Max: {recoveryStats.max}%
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-4" style={{ animationDelay: '300ms' }}>
              <CardContent className="pt-5 pb-4 space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Moon className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Avg Sleep</span>
                </div>
                <p className="text-3xl font-bold text-primary">{avgSleep}h</p>
                <p className="text-xs text-muted-foreground">
                  Min: {sleepStats.min.toFixed(1)}h · Max: {sleepStats.max.toFixed(1)}h
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-4" style={{ animationDelay: '400ms' }}>
              <CardContent className="pt-5 pb-4 space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Avg Resting HR</span>
                </div>
                <p className="text-3xl font-bold text-primary">{avgRestingHR}</p>
                <p className="text-xs text-muted-foreground">
                  Min: {hrStats.min} · Max: {hrStats.max}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-4" style={{ animationDelay: '500ms' }}>
              <CardContent className="pt-5 pb-4 space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Total Days</span>
                </div>
                <p className="text-3xl font-bold text-primary">7</p>
                <p className="text-xs text-muted-foreground">
                  Complete dataset
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3 animate-in fade-in-50 slide-in-from-bottom-6" style={{ animationDelay: '600ms' }}>
            <WhoopLineChart
              data={whoopData}
              dataKey="strain"
              title="Daily Strain (7 Days)"
              color="#22c55e"
              yAxisMax={21}
            />
            
            <div className="grid gap-3 md:grid-cols-2">
              <WhoopBarChart
                data={whoopData}
                dataKey="caloriesBurned"
                title="Calories Burned (7 Days)"
                color="#22c55e"
              />
              <WhoopBarChart
                data={whoopData}
                dataKey="sleepHours"
                title="Sleep Hours (7 Days)"
                color="#22c55e"
              />
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground pt-2">
            Data synced from WHOOP for the past 7 days
          </p>

          <div className="flex justify-center pt-2">
            <Button size="lg" onClick={() => router.push('/onboarding/preferences')} className="shadow-md hover:shadow-lg transition-all">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
