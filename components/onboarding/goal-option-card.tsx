'use client'

import { GoalType } from '@/lib/types'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingDown, Minus, TrendingUp } from 'lucide-react'

interface GoalOptionCardProps {
  goal: GoalType
  selected: boolean
  onClick: () => void
}

export function GoalOptionCard({ goal, selected, onClick }: GoalOptionCardProps) {
  const goalConfig = {
    lose: {
      icon: TrendingDown,
      title: 'Lose Weight',
      description: 'Caloric deficit to shed pounds'
    },
    maintain: {
      icon: Minus,
      title: 'Maintain Weight',
      description: 'Balanced nutrition to stay steady'
    },
    gain: {
      icon: TrendingUp,
      title: 'Gain Weight',
      description: 'Caloric surplus to build mass'
    }
  }

  const config = goalConfig[goal]
  const Icon = config.icon

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-md',
        selected && 'border-primary border-2 bg-primary/5'
      )}
      onClick={onClick}
    >
      <CardHeader className="text-center">
        <div className="mx-auto mb-2">
          <Icon className={cn('h-12 w-12', selected ? 'text-primary' : 'text-muted-foreground')} />
        </div>
        <CardTitle>{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
