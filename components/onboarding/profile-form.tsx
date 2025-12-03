'use client'

import { useState } from 'react'
import { UserProfile } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ProfileFormProps {
  onSubmit: (data: Omit<UserProfile, 'id' | 'createdAt' | 'goal'>) => void
  defaultValues?: Partial<Omit<UserProfile, 'id' | 'createdAt' | 'goal'>>
}

export function ProfileForm({ onSubmit, defaultValues }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: defaultValues?.name || '',
    email: defaultValues?.email || '',
    age: defaultValues?.age || 30,
    weight: defaultValues?.weight || 75,
    height: defaultValues?.height || 175,
    activityLevel: defaultValues?.activityLevel || 'moderate' as const
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          type="number"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="height">Height (cm)</Label>
        <Input
          id="height"
          type="number"
          value={formData.height}
          onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="activityLevel">Activity Level</Label>
        <Select
          value={formData.activityLevel}
          onValueChange={(value: any) => setFormData({ ...formData, activityLevel: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
            <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
            <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
            <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
            <SelectItem value="very_active">Very Active (intense exercise daily)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">Continue</Button>
    </form>
  )
}
