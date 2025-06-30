'use client';

import { useCurrency } from '@/contexts/CurrencyContext';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Globe } from 'lucide-react';

export default function CurrencyDemo() {
  const { currency, exchangeRate, formatPrice } = useCurrency();
  
  const samplePrices = [50, 100, 200, 500];
  
  if (currency === 'USD') return null;
  
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-green-500 rounded-full p-1">
          <Globe className="h-3 w-3 text-white" />
        </div>
        <h3 className="text-sm font-semibold text-green-800">
          🇳🇬 Nigerian Naira Conversion Active
        </h3>
        <Badge variant="secondary" className="text-xs">
          Live Rate
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        {samplePrices.map(price => (
          <div key={price} className="flex justify-between items-center bg-white rounded px-2 py-1">
            <span className="text-gray-600">${price}</span>
            <span className="font-medium text-green-700">{formatPrice(price)}</span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-1 mt-2 text-xs text-green-700">
        <TrendingUp className="h-3 w-3" />
        <span>Exchange rate: $1 = ₦{exchangeRate.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
      </div>
    </div>
  );
}
