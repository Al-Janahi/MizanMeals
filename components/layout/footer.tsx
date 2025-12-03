import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('border-t bg-muted/30', className)}>
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/images/logomizan.png" 
                alt="MizanMeals" 
                width={32} 
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-bold text-primary">MizanMeals</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your personalized nutrition companion powered by AI and WHOOP data.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/browse" className="text-muted-foreground hover:text-primary">
                  Browse Meals
                </Link>
              </li>
              <li>
                <Link href="/restaurants" className="text-muted-foreground hover:text-primary">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="text-muted-foreground hover:text-primary">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-muted-foreground hover:text-primary">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://facebook.com" className="text-muted-foreground hover:text-primary">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MizanMeals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
