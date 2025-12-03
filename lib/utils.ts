import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateMacrosFromCalories(
  calories: number,
  goal: 'lose' | 'maintain' | 'gain'
): { protein: number; carbs: number; fat: number } {
  // Protein: 30% of calories (for muscle maintenance)
  const proteinCalories = calories * 0.3
  const protein = Math.round(proteinCalories / 4) // 4 cal per gram

  // Fat: 25-30% of calories
  const fatCalories = calories * (goal === 'lose' ? 0.25 : 0.3)
  const fat = Math.round(fatCalories / 9) // 9 cal per gram

  // Carbs: remaining calories
  const carbCalories = calories - proteinCalories - fatCalories
  const carbs = Math.round(carbCalories / 4) // 4 cal per gram

  return { protein, carbs, fat }
}

export function calculateDailyCalories(
  weight: number,
  height: number,
  age: number,
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active',
  goal: 'lose' | 'maintain' | 'gain'
): number {
  // Mifflin-St Jeor equation (BMR)
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5

  // Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  }

  const tdee = bmr * activityMultipliers[activityLevel]

  // Adjust for goal
  if (goal === 'lose') return Math.round(tdee - 500) // 500 cal deficit
  if (goal === 'gain') return Math.round(tdee + 300) // 300 cal surplus
  return Math.round(tdee)
}

export function generateMealPlan(
  targetCalories: number,
  availableMeals: any[]
): any {
  const breakfast = availableMeals.filter(m => m.category === 'breakfast')
  const lunch = availableMeals.filter(m => m.category === 'lunch')
  const dinner = availableMeals.filter(m => m.category === 'dinner')
  const snacks = availableMeals.filter(m => m.category === 'snack')

  // For high calorie targets (3000+), adjust meal distribution
  const needsExtraMeals = targetCalories >= 3000
  const snackCount = needsExtraMeals ? 4 : 2

  // Pick one from each category, closest to target distribution
  const breakfastTarget = targetCalories * 0.25
  const lunchTarget = targetCalories * 0.35
  const dinnerTarget = targetCalories * 0.30
  const totalSnackTarget = targetCalories * 0.10
  const snackTarget = totalSnackTarget / snackCount

  const selectedBreakfast = breakfast.reduce((prev, curr) =>
    Math.abs(curr.calories - breakfastTarget) < Math.abs(prev.calories - breakfastTarget) ? curr : prev
  )
  const selectedLunch = lunch.reduce((prev, curr) =>
    Math.abs(curr.calories - lunchTarget) < Math.abs(prev.calories - lunchTarget) ? curr : prev
  )
  const selectedDinner = dinner.reduce((prev, curr) =>
    Math.abs(curr.calories - dinnerTarget) < Math.abs(prev.calories - dinnerTarget) ? curr : prev
  )
  
  // Select multiple snacks based on calorie needs
  const selectedSnacks = []
  const usedSnackIds = new Set()
  
  for (let i = 0; i < snackCount && snacks.length > 0; i++) {
    const availableSnacks = snacks.filter(s => !usedSnackIds.has(s.id))
    if (availableSnacks.length === 0) break
    
    const snack = availableSnacks.reduce((prev, curr) =>
      Math.abs(curr.calories - snackTarget) < Math.abs(prev.calories - snackTarget) ? curr : prev
    )
    selectedSnacks.push(snack)
    usedSnackIds.add(snack.id)
  }

  const selected = [selectedBreakfast, selectedLunch, selectedDinner, ...selectedSnacks].filter(Boolean)
  
  const totalCalories = selected.reduce((sum, m) => sum + m.calories, 0)
  const totalProtein = selected.reduce((sum, m) => sum + m.protein, 0)
  const totalCarbs = selected.reduce((sum, m) => sum + m.carbs, 0)
  const totalFat = selected.reduce((sum, m) => sum + m.fat, 0)

  return {
    id: 'draft-plan',
    userId: 'temp',
    date: new Date().toISOString().split('T')[0],
    breakfast: [selectedBreakfast],
    lunch: [selectedLunch],
    dinner: [selectedDinner],
    snacks: selectedSnacks,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    generatedAt: new Date()
  }
}
