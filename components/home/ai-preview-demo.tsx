"use client"

import { useState, useEffect } from "react"
import { Activity, Utensils, Sparkles, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const mealData = [
  {
    image: "/grilled-chicken-bowl-healthy.jpg",
    name: "Grilled Chicken Bowl",
    restaurant: "Reflect Restaurant",
    calories: 450,
    protein: 45,
    carbs: 30,
  },
  {
    image: "/salmon-quinoa-bowl-healthy.jpg",
    name: "Salmon & Quinoa",
    restaurant: "Oz Pure",
    calories: 520,
    protein: 38,
    carbs: 42,
  },
  {
    image: "/protein-smoothie-bowl-berries.jpg",
    name: "Berry Protein Bowl",
    restaurant: "Diet Shop",
    calories: 380,
    protein: 32,
    carbs: 28,
  },
]

const typingMessages = [
  "Analyzing wearable data...",
  "Optimizing nutrition targets...",
  "Selecting personalized meals...",
]

export function AiPreviewDemo() {
  const [step, setStep] = useState(0)
  const [typingIndex, setTypingIndex] = useState(0)
  const [showMeals, setShowMeals] = useState(false)
  const [showComplete, setShowComplete] = useState(false)

  useEffect(() => {
    const stepTimings = [2500, 2500, 9000]

    const timer = setTimeout(() => {
      if (step < 2) {
        setStep(step + 1)
        if (step === 1) {
          setTypingIndex(0)
          setShowMeals(false)
          setShowComplete(false)
        }
      } else {
        // Loop back to beginning
        setStep(0)
        setTypingIndex(0)
        setShowMeals(false)
        setShowComplete(false)
      }
    }, stepTimings[step])

    return () => clearTimeout(timer)
  }, [step])

  useEffect(() => {
    if (step === 2) {
      const typingTimer = setTimeout(() => {
        if (typingIndex < typingMessages.length - 1) {
          setTypingIndex(typingIndex + 1)
        } else {
          // Show meals after all typing is complete
          setTimeout(() => {
            setShowMeals(true)
            setTimeout(() => setShowComplete(true), 800)
          }, 400)
        }
      }, 800)

      return () => clearTimeout(typingTimer)
    }
  }, [step, typingIndex])

  return (
    <div className="relative mx-auto max-w-4xl">
      <div
        className={cn(
          "rounded-2xl border border-neutral-200 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.06)]",
          "transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(34,197,94,0.18)]",
        )}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-neutral-50 border-b border-neutral-200 rounded-t-2xl">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="h-6 bg-white rounded border border-neutral-200 flex items-center px-3">
              <span className="text-xs text-neutral-400">mizanmeals.com/generate-plan</span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-8 bg-[#f9fafb] rounded-b-2xl min-h-[480px] sm:min-h-[520px]">
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Smart Nutrition Engine</h3>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Step 1: Wearable Data */}
            {step >= 0 && (
              <div className="animate-slide-in-left">
                <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">Wearable Data</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="text-center p-2 sm:p-3 bg-neutral-50 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-foreground">89%</div>
                      <div className="text-[10px] sm:text-xs text-neutral-500 mt-1">Recovery</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-neutral-50 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-foreground">14.2</div>
                      <div className="text-[10px] sm:text-xs text-neutral-500 mt-1">Strain</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-neutral-50 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-foreground">2,845</div>
                      <div className="text-[10px] sm:text-xs text-neutral-500 mt-1">Calories</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Preferences */}
            {step >= 1 && (
              <div className="animate-slide-in-up">
                <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                      <Utensils className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">Your Preferences</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-foreground border-primary/20 text-xs">
                      High Protein
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-foreground border-primary/20 text-xs">
                      Low Carb
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-foreground border-primary/20 text-xs">
                      No Dairy
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: AI Processing */}
            {step >= 2 && (
              <div className="space-y-4 sm:space-y-5">
                {/* Typing animation */}
                <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-xl p-3 sm:p-4 animate-fade-in">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Sparkles className="h-4 sm:h-5 w-4 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="space-y-1.5 sm:space-y-2 flex-1">
                      {typingMessages.slice(0, typingIndex + 1).map((msg, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "text-xs sm:text-sm font-medium text-foreground flex items-center gap-2",
                            idx === 0 && "animate-fade-in",
                            idx === 1 && "animate-fade-in-delay-1",
                            idx === 2 && "animate-fade-in-delay-2",
                          )}
                        >
                          {msg}
                          {idx === typingIndex && !showMeals && (
                            <span className="inline-block w-0.5 h-3 sm:h-4 bg-primary animate-pulse" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {showMeals && (
                  <div className="animate-fade-in-delay-3">
                    <div className="bg-white rounded-xl border-2 border-primary/20 p-4 sm:p-6 shadow-md">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                          <span className="text-sm sm:text-base font-bold text-foreground">Your Meal Plan</span>
                        </div>
                        {showComplete && (
                          <Badge className="bg-primary/10 text-primary border-primary/30 animate-fade-in text-xs">
                            Ready!
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        {mealData.map((meal, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              "bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300",
                              idx === 0 && "animate-slide-in-horizontal",
                              idx === 1 && "animate-slide-in-horizontal-delay-1",
                              idx === 2 && "animate-slide-in-horizontal-delay-2",
                            )}
                          >
                            <div className="h-32 sm:h-36 bg-gradient-to-br from-neutral-100 to-neutral-50 overflow-hidden">
                              <img
                                src={meal.image || "/placeholder.svg"}
                                alt={meal.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="p-3">
                              <div className="text-sm font-bold text-foreground line-clamp-1">{meal.name}</div>
                              <div className="text-xs text-neutral-500 mt-1 line-clamp-1">{meal.restaurant}</div>
                              <div className="mt-3 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-semibold text-primary">{meal.calories} cal</span>
                                </div>
                                <div className="flex gap-1.5">
                                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                    {meal.protein}g P
                                  </span>
                                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                    {meal.carbs}g C
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-neutral-500 mt-4">Real wearable-powered logic. Demo data shown.</p>
    </div>
  )
}
