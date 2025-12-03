import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  trend?: number
  className?: string
}

export function StatCard({ 
  label, 
  value, 
  icon,
  trend,
  className 
}: StatCardProps) {
  return (
    <Card className={cn('', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
            {trend !== undefined && (
              <div className={cn(
                'mt-2 flex items-center gap-1 text-sm font-medium',
                trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-muted-foreground'
              )}>
                {trend > 0 ? <ArrowUp className="h-4 w-4" /> : trend < 0 ? <ArrowDown className="h-4 w-4" /> : null}
                <span>{Math.abs(trend)}%</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
