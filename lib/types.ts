export type GoalType = 'lose' | 'maintain' | 'gain'

export interface FoodPreferences {
  foodTypes: string[] // e.g., ['beef', 'chicken', 'fish', 'vegetarian', 'vegan']
  dislikes: string[] // e.g., ['mushrooms', 'spicy', 'tomatoes', 'dairy', 'nuts']
  allergies: string[]
  cuisineLikes: string[] // e.g., ['qatari', 'lebanese', 'italian', 'asian']
  budgetQar: number // daily budget in QAR
}

export interface UserProfile {
  id: string
  name: string
  email: string
  age: number
  weight: number // kg
  height: number // cm
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  goal: GoalType
  createdAt: Date
}

export interface WhoopData {
  date: string
  strain: number // 0-21
  recovery: number // 0-100
  sleepHours: number
  caloriesBurned: number
  heartRateAvg: number
}

export interface NutritionTargets {
  userId: string
  dailyCalories: number
  protein: number // grams
  carbs: number // grams
  fat: number // grams
}

export type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface MealItem {
  id: string
  name: string
  description: string
  imageUrl: string
  category: MealCategory
  calories: number
  protein: number
  carbs: number
  fat: number
  prepTime: number
  tags: string[]
  restaurantId: string
  ingredients: string[]
  priceQar?: number
}

export interface MealPlan {
  id: string
  userId: string
  date: string // YYYY-MM-DD
  breakfast: MealItem[]
  lunch: MealItem[]
  dinner: MealItem[]
  snacks: MealItem[]
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
  generatedAt: Date
}

export interface Restaurant {
  id: string
  name: string
  logoUrl: string
  description: string
  address: string
  cuisine: string[]
  rating: number
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  isPartner: boolean
}

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: 'monthly' | 'yearly'
  features: string[]
  isPopular?: boolean
}

export interface FilterOptions {
  searchQuery: string
  categories: MealCategory[]
  tags: string[]
  calorieRange: [number, number]
  prepTimeMax: number
}
