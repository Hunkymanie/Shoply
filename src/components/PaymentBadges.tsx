'use client';

import { Shield, Lock, CreditCard, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PaymentBadgesProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'detailed';
}

export function PaymentBadges({ className = "", variant = 'default' }: PaymentBadgesProps) {
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Shield className="h-4 w-4 text-green-600" />
        <span className="text-xs text-muted-foreground">Secure Payment</span>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          <span className="font-medium">Secure & Safe Payment</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>PCI Compliant</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            Stripe
          </Badge>
          <Badge variant="secondary" className="text-xs">
            PayPal
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Apple Pay
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Google Pay
          </Badge>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex items-center justify-center gap-4 py-2 px-4 bg-muted/50 rounded-lg ${className}`}>
      <div className="flex items-center gap-1">
        <Shield className="h-4 w-4 text-green-600" />
        <span className="text-xs text-muted-foreground">Secure</span>
      </div>
      
      <div className="flex items-center gap-1">
        <Lock className="h-4 w-4 text-blue-600" />
        <span className="text-xs text-muted-foreground">SSL</span>
      </div>
      
      <div className="flex items-center gap-1">
        <CreditCard className="h-4 w-4 text-primary" />
        <span className="text-xs text-muted-foreground">Stripe</span>
      </div>
    </div>
  );
}
