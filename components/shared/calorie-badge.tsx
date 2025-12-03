import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface CalorieBadgeProps {
  calories: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CalorieBadge({ 
  calories, 
  size = 'md',
  className 
}: CalorieBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  }

  return (
    <Badge 
      variant="secondary"
      className={cn(
        'bg-primary/10 text-primary hover:bg-primary/20 font-semibold',
        sizeClasses[size],
        className
      )}
    >
      {calories} cal
    </Badge>
  )
}
