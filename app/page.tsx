import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Brain, Activity, Store, Shield, Watch } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { AiPreviewDemo } from '@/components/home/ai-preview-demo'

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <section className="relative overflow-hidden">
          {/* Subtle radial gradient background - center white to soft mint green */}
          <div 
            className="absolute inset-0" 
            style={{
              background: 'radial-gradient(ellipse at center, rgba(232, 244, 237, 0.25) 0%, rgba(232, 244, 237, 0.15) 40%, transparent 70%)'
            }}
          ></div>
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Watch className="absolute top-20 left-[10%] h-16 w-16 text-primary animate-float" style={{ opacity: 0.06 }} />
            <Activity className="absolute top-32 right-[15%] h-20 w-20 text-primary animate-float" style={{ opacity: 0.05, animationDelay: '1s' }} />
            <Watch className="absolute bottom-32 left-[20%] h-12 w-12 text-primary animate-float" style={{ opacity: 0.07, animationDelay: '2s' }} />
            <Activity className="absolute bottom-20 right-[12%] h-14 w-14 text-primary animate-float" style={{ opacity: 0.06, animationDelay: '1.5s' }} />
          </div>
          
          <div className="container relative mx-auto px-4 py-16 md:py-20 max-w-4xl">
            <div className="flex flex-col items-center text-center space-y-5">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance leading-[1.1] max-w-4xl">
                Personalized Meal Plans from{' '}
                <span className="text-primary">Wearable Data.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl leading-relaxed">
                AI-optimized nutrition synced with your WHOOP, Apple Watch, or Fitbit. Delivered from Doha's top healthy restaurants.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Button asChild size="lg" className="text-base px-8 h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                  <Link href="/onboarding/connect-whoop">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base px-8 h-12 border-primary/30 hover:bg-primary/5">
                  <Link href="/browse">Browse Meals</Link>
                </Button>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Shield className="h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Trusted by active users across Doha
                </p>
              </div>
            </div>
          </div>
          
          <div 
            className="absolute bottom-0 left-0 right-0 h-24"
            style={{
              background: 'linear-gradient(to bottom, transparent, white)'
            }}
          ></div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">See MizanMeals in Action</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Watch how your wearable data transforms into personalized meal plans in seconds.
            </p>
          </div>

          <div 
            className="rounded-3xl p-8 md:p-10"
            style={{
              backgroundColor: '#F6FBF8',
              border: '1px solid #DDEFE4',
              boxShadow: '0 4px 16px rgba(0, 128, 55, 0.08)'
            }}
          >
            <AiPreviewDemo />
          </div>
        </section>

        <Separator className="my-6" />

        <section className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-8">Why MizanMeals?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-primary/10 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Brain className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Smart Nutrition</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Auto-calculated calories & macros from your wearable
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Activity className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">AI Meal Plans</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Agentic AI builds meals based on your preferences
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Store className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Healthy Restaurants</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Curated meals from top Doha restaurants
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-6" />

        <section className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          <div className="text-center space-y-5">
            <h2 className="text-3xl font-bold">Ready to transform your nutrition?</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Join MizanMeals today and experience personalized meal planning tailored to your fitness goals.
            </p>
            <Button asChild size="lg" className="text-base px-8 h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              <Link href="/onboarding/connect-whoop">
                Start Your Personalized Plan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
