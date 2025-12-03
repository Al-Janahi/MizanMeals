import { getMacroColor } from '@/lib/theme'

interface MacroBarProps {
  protein: number
  carbs: number
  fat: number
  total: number
  showLabels?: boolean
  className?: string
}

export function MacroBar({ 
  protein, 
  carbs, 
  fat, 
  total,
  showLabels = false,
  className = ''
}: MacroBarProps) {
  const proteinPercent = (protein / total) * 100
  const carbsPercent = (carbs / total) * 100
  const fatPercent = (fat / total) * 100

  return (
    <div className={className}>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-neutral-200">
        <div 
          className="transition-all"
          style={{ 
            width: `${proteinPercent}%`,
            backgroundColor: getMacroColor('protein')
          }}
        />
        <div 
          className="transition-all"
          style={{ 
            width: `${carbsPercent}%`,
            backgroundColor: getMacroColor('carbs')
          }}
        />
        <div 
          className="transition-all"
          style={{ 
            width: `${fatPercent}%`,
            backgroundColor: getMacroColor('fat')
          }}
        />
      </div>
      
      {showLabels && (
        <div className="mt-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <div 
              className="h-3 w-3 rounded-sm" 
              style={{ backgroundColor: getMacroColor('protein') }}
            />
            <span className="text-muted-foreground">Protein {protein}g</span>
          </div>
          <div className="flex items-center gap-1">
            <div 
              className="h-3 w-3 rounded-sm" 
              style={{ backgroundColor: getMacroColor('carbs') }}
            />
            <span className="text-muted-foreground">Carbs {carbs}g</span>
          </div>
          <div className="flex items-center gap-1">
            <div 
              className="h-3 w-3 rounded-sm" 
              style={{ backgroundColor: getMacroColor('fat') }}
            />
            <span className="text-muted-foreground">Fat {fat}g</span>
          </div>
        </div>
      )}
    </div>
  )
}
