import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/ui/container'
import { Skeleton } from '@/components/ui/skeleton'

export default function BrowseLoading() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8 bg-muted/30">
        <Container className="max-w-7xl space-y-8">
          <div>
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-6 w-96 mt-2" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-7 w-24" />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-5 w-48" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
