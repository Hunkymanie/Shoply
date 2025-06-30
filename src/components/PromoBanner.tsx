'use client';

import { useState } from 'react';
import { X, Truck, Gift, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PromoBannerProps {
  message?: string;
  icon?: 'truck' | 'gift' | 'zap';
  dismissible?: boolean;
  className?: string;
}

const icons = {
  truck: Truck,
  gift: Gift,
  zap: Zap,
};

export function PromoBanner({ 
  message = "🚚 FREE SHIPPING on orders over $75 | 🎁 Free returns within 30 days",
  icon = 'truck',
  dismissible = true,
  className = ""
}: PromoBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const IconComponent = icons[icon];

  return (
    <div className={`bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 text-center text-sm ${className}`}>
      <div className="flex items-center justify-center gap-2 max-w-4xl mx-auto">
        <IconComponent className="h-4 w-4 flex-shrink-0" />
        <span className="flex-1">{message}</span>
        {dismissible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 p-0 text-primary-foreground hover:bg-background/20 flex-shrink-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
}
