import { cn } from '@/lib/utils'

interface ProgressRingProps {
  value: number
  max: number
  label: string
  color: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ProgressRing({ 
  value, 
  max, 
  label,
  color,
  size = 'md',
  className 
}: ProgressRingProps) {
  const percentage = Math.min((value / max) * 100, 100)
  
  const sizeConfig = {
    sm: { dimension: 80, strokeWidth: 6, fontSize: 'text-sm' },
    md: { dimension: 120, strokeWidth: 8, fontSize: 'text-base' },
    lg: { dimension: 160, strokeWidth: 10, fontSize: 'text-lg' }
  }
  
  const { dimension, strokeWidth, fontSize } = sizeConfig[size]
  const radius = (dimension - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className="relative" style={{ width: dimension, height: dimension }}>
        <svg width={dimension} height={dimension} className="rotate-[-90deg]">
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-muted"
          />
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('font-bold', fontSize)}>{value}</span>
          <span className="text-xs text-muted-foreground">/ {max}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  )
}
