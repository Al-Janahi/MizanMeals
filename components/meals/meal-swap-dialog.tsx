'use client'

import { MealItem } from '@/lib/types'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MealCard } from './meal-card'
import { Button } from '@/components/ui/button'

interface MealSwapDialogProps {
  currentMeal: MealItem
  alternatives: MealItem[]
  onSelect: (meal: MealItem) => void
  open: boolean
  onClose: () => void
}

export function MealSwapDialog({ currentMeal, alternatives, onSelect, open, onClose }: MealSwapDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Swap {currentMeal.name}</DialogTitle>
          <DialogDescription>
            Choose an alternative meal from the same category
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="grid gap-4 md:grid-cols-2">
            {alternatives.map(meal => (
              <div key={meal.id} className="relative">
                <MealCard meal={meal} />
                <Button
                  onClick={() => {
                    onSelect(meal)
                    onClose()
                  }}
                  className="w-full mt-2"
                >
                  Select This Meal
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
