import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Wrench, Clock, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Under Maintenance",
  description: "Shoply is temporarily under maintenance. We'll be back shortly with exciting updates!",
}

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-background">
      <div className="text-center max-w-md mx-auto">
        {/* Maintenance Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-16 h-16 text-primary animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-accent-foreground" />
            </div>
          </div>
        </div>
        
        {/* Maintenance Message */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            We're Making Things Better
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Shoply is currently undergoing scheduled maintenance to bring you 
            an even better shopping experience. We'll be back online shortly!
          </p>
        </div>
        
        {/* Status Information */}
        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-2">
            <Clock className="w-4 h-4" />
            <span>Estimated downtime: 2-4 hours</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Started: {new Date().toLocaleString()}
          </p>
        </div>
        
        {/* What's New Preview */}
        <div className="space-y-3 mb-8">
          <h3 className="text-lg font-semibold text-foreground">
            What's Coming:
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>✨ Enhanced product search</li>
            <li>🚀 Faster page loading</li>
            <li>📱 Improved mobile experience</li>
            <li>🎨 Fresh new features</li>
          </ul>
        </div>
        
        {/* Contact Information */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Need immediate assistance?
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button variant="outline" size="sm" asChild>
              <a href="mailto:support@shoply.com">
                Contact Support
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="tel:+1-555-FASHION">
                Call Us
              </a>
            </Button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Thank you for your patience while we improve your shopping experience.
          </p>
        </div>
      </div>
    </div>
  )
}
