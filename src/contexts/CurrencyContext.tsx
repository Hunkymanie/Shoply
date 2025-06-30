'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

interface CurrencyContextType {
  currency: 'USD' | 'NGN';
  exchangeRate: number;
  setCurrency: (currency: 'USD' | 'NGN') => void;
  convertPrice: (usdPrice: number) => number;
  formatPrice: (price: number) => string;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [exchangeRate, setExchangeRate] = useState(1600); // Default fallback rate
  const [isLoading, setIsLoading] = useState(false);

  // Fetch exchange rate from a free API
  const fetchExchangeRate = async () => {
    try {
      setIsLoading(true);
      // Using exchangerate-api.com (free tier)
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      if (data.rates && data.rates.NGN) {
        setExchangeRate(data.rates.NGN);
        localStorage.setItem('usd-ngn-rate', data.rates.NGN.toString());
        localStorage.setItem('rate-timestamp', Date.now().toString());
      }
    } catch (error) {
      console.log('Exchange rate fetch failed, using fallback rate');
      // Try to use cached rate
      const cachedRate = localStorage.getItem('usd-ngn-rate');
      if (cachedRate) {
        setExchangeRate(parseFloat(cachedRate));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if we have a recent cached rate (less than 1 hour old)
    const cachedRate = localStorage.getItem('usd-ngn-rate');
    const timestamp = localStorage.getItem('rate-timestamp');
    
    if (cachedRate && timestamp) {
      const hourInMs = 60 * 60 * 1000;
      const isCacheValid = Date.now() - parseInt(timestamp) < hourInMs;
      
      if (isCacheValid) {
        setExchangeRate(parseFloat(cachedRate));
        return;
      }
    }
    
    // Fetch fresh rate
    fetchExchangeRate();
  }, []);

  // Load saved currency preference
  useEffect(() => {
    const savedCurrency = localStorage.getItem('preferred-currency') as 'USD' | 'NGN';
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  // Save currency preference
  const handleSetCurrency = (newCurrency: 'USD' | 'NGN') => {
    setCurrency(newCurrency);
    localStorage.setItem('preferred-currency', newCurrency);
  };

  const convertPrice = useCallback((usdPrice: number): number => {
    return currency === 'NGN' ? usdPrice * exchangeRate : usdPrice;
  }, [currency, exchangeRate]);

  const formatPrice = useCallback((price: number): string => {
    const convertedPrice = convertPrice(price);
    
    if (currency === 'NGN') {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(convertedPrice);
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(convertedPrice);
    }
  }, [currency, convertPrice]);

  const contextValue = useMemo(() => ({
    currency,
    exchangeRate,
    setCurrency: handleSetCurrency,
    convertPrice,
    formatPrice,
    isLoading,
  }), [currency, exchangeRate, convertPrice, formatPrice, isLoading]);

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
