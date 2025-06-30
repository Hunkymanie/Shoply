import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Page Not Found - 404",
  description: "The page you're looking for doesn't exist. Let's get you back on track.",
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-9xl font-bold text-muted-foreground/20 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl">👗</div>
            </div>
          </div>
        </div>
        
        {/* Error Message */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">
            Oops! Page Not Found
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            It seems the page you're looking for has walked off the runway. 
            Don't worry, let's get you back to finding your perfect style.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="flex items-center gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link href="/products">
              <Search className="w-4 h-4" />
              Browse Products
            </Link>
          </Button>
        </div>
        
        {/* Additional Help */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Still can't find what you're looking for? 
            <Link 
              href="/contact" 
              className="text-primary hover:text-primary/80 font-medium ml-1 transition-colors"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
