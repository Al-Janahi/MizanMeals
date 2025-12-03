'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { StepProgress } from '@/components/layout/step-progress'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, X, Plus, Beef, Drumstick, Fish, Leaf, Sprout, Pizza, Info } from 'lucide-react'
import { FoodPreferences } from '@/lib/types'

const ONBOARDING_STEPS = [
  'Connect WHOOP',
  'WHOOP Summary',
  'Food Preferences',
  'Set Your Goal'
]

const FOOD_TYPES = [
  { name: 'Beef', icon: '🥩' },
  { name: 'Chicken', icon: '🍗' },
  { name: 'Fish', icon: '🐟' },
  { name: 'Vegetarian', icon: '🥦' },
  { name: 'Vegan', icon: '🌱' }
]

const COMMON_DISLIKES = [
  'Mushrooms', 'Spicy', 'Tomatoes', 'Dairy', 'Nuts',
  'Onions', 'Ginger', 'Garlic', 'Peas', 'Eggplant',
  'Zucchini', 'Broccoli', 'Bell Peppers'
]

const CUISINES = [
  { name: 'Lebanese', icon: '🇱🇧' },
  { name: 'Italian', icon: '🇮🇹' },
  { name: 'Asian', icon: '🍜' },
  { name: 'Mexican', icon: '🌮' },
  { name: 'Healthy Bowls', icon: '🥗' }
]

export default function PreferencesPage() {
  const router = useRouter()
  
  const [preferences, setPreferences] = useState<FoodPreferences>({
    foodTypes: [],
    dislikes: [],
    allergies: [],
    cuisineLikes: [],
    budgetQar: 150
  })
  
  const [allergyInput, setAllergyInput] = useState('')
  const [dislikeInput, setDislikeInput] = useState('')

  const toggleSelection = (category: keyof Pick<FoodPreferences, 'foodTypes' | 'dislikes' | 'cuisineLikes'>, item: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }))
  }

  const addDislike = () => {
    if (dislikeInput.trim() && !preferences.dislikes.includes(dislikeInput.trim())) {
      setPreferences(prev => ({
        ...prev,
        dislikes: [...prev.dislikes, dislikeInput.trim()]
      }))
      setDislikeInput('')
    }
  }

  const removeDislike = (dislike: string) => {
    setPreferences(prev => ({
      ...prev,
      dislikes: prev.dislikes.filter(d => d !== dislike)
    }))
  }

  const addAllergy = () => {
    if (allergyInput.trim()) {
      setPreferences(prev => ({
        ...prev,
        allergies: [...prev.allergies, allergyInput.trim()]
      }))
      setAllergyInput('')
    }
  }

  const removeAllergy = (allergy: string) => {
    setPreferences(prev => ({
      ...prev,
      allergies: prev.allergies.filter(a => a !== allergy)
    }))
  }

  const handleContinue = () => {
    sessionStorage.setItem('preferences', JSON.stringify(preferences))
    router.push('/onboarding/goal')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Container className="max-w-3xl py-8 space-y-6">
        <StepProgress
          currentStep={3}
          totalSteps={ONBOARDING_STEPS.length}
          stepTitles={ONBOARDING_STEPS}
        />

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Food Preferences</h1>
            <p className="text-base text-muted-foreground">
              Tell us what you like so we can personalize your meal plans
            </p>
          </div>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm">
            <CardContent className="pt-4 pb-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-green-900">Smart Recommendation Engine</p>
                  <p className="text-xs text-green-700">
                    Your preferences help us filter meals from partner restaurants and generate personalized daily plans that match your goals and tastes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="pt-5 pb-5 space-y-6">
              <div className="space-y-2.5">
                <div className="h-px bg-gradient-to-r from-transparent via-green-200 to-transparent" />
                <Label className="text-base font-semibold">Food Types</Label>
                <div className="flex flex-wrap gap-2">
                  {FOOD_TYPES.map(type => (
                    <Badge
                      key={type.name}
                      variant={preferences.foodTypes.includes(type.name) ? 'default' : 'outline'}
                      className="cursor-pointer px-4 py-2.5 text-sm rounded-full transition-all hover:scale-105 active:scale-95"
                      onClick={() => toggleSelection('foodTypes', type.name)}
                    >
                      <span className="mr-1.5">{type.icon}</span>
                      {type.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="h-px bg-gradient-to-r from-transparent via-green-200 to-transparent" />
                <Label className="text-base font-semibold">Dislikes</Label>
                
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add custom dislike..."
                      value={dislikeInput}
                      onChange={(e) => setDislikeInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addDislike()}
                      className="transition-all focus:ring-2 focus:ring-green-500"
                    />
                    <Button 
                      type="button" 
                      size="icon" 
                      onClick={addDislike}
                      className="transition-all hover:scale-105 active:scale-95"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Common Dislikes:</p>
                    <div className="flex flex-wrap gap-2">
                      {COMMON_DISLIKES.map(item => (
                        <Badge
                          key={item}
                          variant={preferences.dislikes.includes(item) ? 'default' : 'outline'}
                          className="cursor-pointer px-3 py-1.5 text-sm rounded-full transition-all hover:scale-105 active:scale-95"
                          onClick={() => toggleSelection('dislikes', item)}
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {preferences.dislikes.some(d => !COMMON_DISLIKES.includes(d)) && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Your Custom Dislikes:</p>
                      <div className="flex flex-wrap gap-2">
                        {preferences.dislikes
                          .filter(d => !COMMON_DISLIKES.includes(d))
                          .map(dislike => (
                            <Badge
                              key={dislike}
                              variant="default"
                              className="cursor-pointer px-3 py-1.5 text-sm rounded-full transition-all hover:scale-105 active:scale-95"
                              onClick={() => removeDislike(dislike)}
                            >
                              {dislike} <X className="ml-1 h-3 w-3" />
                            </Badge>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="h-px bg-gradient-to-r from-transparent via-green-200 to-transparent" />
                <Label className="text-base font-semibold">Allergies</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add an allergy..."
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addAllergy()}
                    className="transition-all focus:ring-2 focus:ring-green-500"
                  />
                  <Button 
                    type="button" 
                    onClick={addAllergy}
                    className="transition-all hover:scale-105 active:scale-95"
                  >
                    Add
                  </Button>
                </div>
                {preferences.allergies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {preferences.allergies.map(allergy => (
                      <Badge
                        key={allergy}
                        variant="destructive"
                        className="cursor-pointer px-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95"
                        onClick={() => removeAllergy(allergy)}
                      >
                        {allergy} <X className="ml-1 h-3 w-3" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2.5">
                <div className="h-px bg-gradient-to-r from-transparent via-green-200 to-transparent" />
                <Label className="text-base font-semibold">Cuisine Preferences</Label>
                <div className="flex flex-wrap gap-2">
                  {CUISINES.map(cuisine => (
                    <Badge
                      key={cuisine.name}
                      variant={preferences.cuisineLikes.includes(cuisine.name) ? 'default' : 'outline'}
                      className="cursor-pointer px-4 py-2.5 text-sm rounded-full transition-all hover:scale-105 active:scale-95"
                      onClick={() => toggleSelection('cuisineLikes', cuisine.name)}
                    >
                      <span className="mr-1.5">{cuisine.icon}</span>
                      {cuisine.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="h-px bg-gradient-to-r from-transparent via-green-200 to-transparent" />
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Daily Budget (QAR)</Label>
                  <p className="text-sm text-muted-foreground">
                    Optional — used to filter restaurant choices
                  </p>
                </div>
                <Input
                  type="number"
                  value={preferences.budgetQar}
                  onChange={(e) => setPreferences(prev => ({ ...prev, budgetQar: Number(e.target.value) }))}
                  min={50}
                  max={500}
                  className="transition-all focus:ring-2 focus:ring-green-500"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-2">
            <Button 
              size="lg" 
              onClick={handleContinue}
              className="shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
