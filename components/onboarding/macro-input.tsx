'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface MacroInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  unit: string
  color: string
}

export function MacroInput({ label, value, onChange, unit, color }: MacroInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase()} style={{ color }}>
        {label}
      </Label>
      <div className="flex gap-2 items-center">
        <Input
          id={label.toLowerCase()}
          type="number"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="flex-1"
        />
        <span className="text-sm text-muted-foreground w-16">{unit}</span>
      </div>
    </div>
  )
}
