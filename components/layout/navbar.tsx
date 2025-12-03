'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, User, Settings, LogOut, Home, Utensils, Store, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserProfile } from '@/lib/types'

interface NavbarProps {
  user?: UserProfile
  className?: string
}

export function Navbar({ user, className }: NavbarProps) {
  return (
    <header className={cn('sticky top-0 z-50 w-full bg-white border-b backdrop-blur', className)} style={{ borderColor: '#e5e5e5' }}>
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/images/logomizan.png" 
            alt="MizanMeals" 
            width={24} 
            height={24}
            className="h-6 w-6"
          />
          <span className="text-base font-bold text-foreground">MizanMeals</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          <Link href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/browse" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Browse Meals
          </Link>
          <Link href="/restaurants" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Restaurants
          </Link>
          <Link href="/subscription" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Subscription
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/browse" className="flex items-center">
                    <Utensils className="mr-2 h-4 w-4" />
                    Browse Meals
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/restaurants" className="flex items-center">
                    <Store className="mr-2 h-4 w-4" />
                    Restaurants
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/subscription" className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Subscription
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/onboarding/connect-whoop">Get Started</Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="md:hidden hover:bg-muted">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
