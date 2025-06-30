'use client';

import { Globe, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCurrency } from '@/contexts/CurrencyContext';

interface CurrencySwitcherProps {
  variant?: 'header' | 'inline' | 'compact';
  showRate?: boolean;
}

export default function CurrencySwitcher({ 
  variant = 'header', 
  showRate = false 
}: CurrencySwitcherProps) {
  const { currency, exchangeRate, setCurrency, isLoading } = useCurrency();

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <Select value={currency} onValueChange={(value: 'USD' | 'NGN') => setCurrency(value)}>
          <SelectTrigger className="w-20 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="NGN">NGN</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Currency:</span>
        <div className="flex gap-1">
          <Button
            variant={currency === 'USD' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrency('USD')}
            className="h-7 px-3 text-xs"
          >
            USD $
          </Button>
          <Button
            variant={currency === 'NGN' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrency('NGN')}
            className="h-7 px-3 text-xs"
          >
            NGN ₦
          </Button>
        </div>
        {showRate && currency === 'NGN' && (
          <Badge variant="secondary" className="text-xs">
            1 USD = ₦{exchangeRate.toLocaleString()}
          </Badge>
        )}
      </div>
    );
  }

  // Header variant (default)
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground hidden sm:inline">Currency:</span>
      </div>
      
      <div className="flex gap-1">
        <Button
          variant={currency === 'USD' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setCurrency('USD')}
          className="h-8 px-3 text-xs font-medium"
          disabled={isLoading}
        >
          <DollarSign className="h-3 w-3 mr-1" />
          USD
        </Button>
        <Button
          variant={currency === 'NGN' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setCurrency('NGN')}
          className="h-8 px-3 text-xs font-medium"
          disabled={isLoading}
        >
          ₦ NGN
        </Button>
      </div>

      {showRate && currency === 'NGN' && !isLoading && (
        <Badge variant="outline" className="text-xs hidden md:flex">
          $1 = ₦{exchangeRate.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </Badge>
      )}

      {isLoading && (
        <div className="text-xs text-muted-foreground">
          Updating...
        </div>
      )}
    </div>
  );
}
