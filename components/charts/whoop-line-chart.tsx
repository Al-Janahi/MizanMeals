'use client'

import { WhoopData } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface WhoopLineChartProps {
  data: WhoopData[]
  dataKey: keyof WhoopData
  title: string
  color: string
  yAxisMax?: number
}

export function WhoopLineChart({ data, dataKey, title, color, yAxisMax }: WhoopLineChartProps) {
  const chartData = data.map(d => ({
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: d[dataKey]
  }))

  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" opacity={0.5} />
            <XAxis 
              dataKey="date" 
              fontSize={12}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              fontSize={12}
              stroke="hsl(var(--muted-foreground))"
              domain={yAxisMax ? [0, yAxisMax] : undefined}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color, r: 5 }}
              activeDot={{ r: 7, fill: color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
