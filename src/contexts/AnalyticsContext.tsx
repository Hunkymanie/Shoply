'use client';

import { createContext, useContext, useEffect } from 'react';

interface AnalyticsContextType {
  trackEvent: (event: string, properties?: Record<string, any>) => void;
  trackPageView: (path: string) => void;
  trackProductView: (productId: string, productName: string) => void;
  trackAddToCart: (productId: string, productName: string, price: number) => void;
  trackPurchase: (orderId: string, total: number, items: any[]) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useEffect(() => {
    // Initialize analytics when component mounts
    console.log('Analytics initialized');
  }, []);

  const trackEvent = (event: string, properties?: Record<string, any>) => {
    // In a real implementation, you would send this to your analytics service
    console.log('Analytics Event:', event, properties);
    
    // Example: Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, properties);
    }
    
    // Example: Plausible
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible(event, { props: properties });
    }
  };

  const trackPageView = (path: string) => {
    trackEvent('page_view', { page_path: path });
  };

  const trackProductView = (productId: string, productName: string) => {
    trackEvent('view_item', {
      item_id: productId,
      item_name: productName,
    });
  };

  const trackAddToCart = (productId: string, productName: string, price: number) => {
    trackEvent('add_to_cart', {
      item_id: productId,
      item_name: productName,
      value: price,
      currency: 'USD',
    });
  };

  const trackPurchase = (orderId: string, total: number, items: any[]) => {
    trackEvent('purchase', {
      transaction_id: orderId,
      value: total,
      currency: 'USD',
      items: items,
    });
  };

  const value: AnalyticsContextType = {
    trackEvent,
    trackPageView,
    trackProductView,
    trackAddToCart,
    trackPurchase,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

// Analytics script loader component
export function AnalyticsScript() {
  useEffect(() => {
    // Google Analytics 4 (replace with your GA4 measurement ID)
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    
    if (GA_MEASUREMENT_ID) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          page_title: document.title,
          page_location: window.location.href,
        });
      `;
      document.head.appendChild(configScript);
    }
    
    // Plausible Analytics (replace with your domain)
    const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    
    if (PLAUSIBLE_DOMAIN) {
      const script = document.createElement('script');
      script.defer = true;
      script.dataset.domain = PLAUSIBLE_DOMAIN;
      script.src = 'https://plausible.io/js/script.js';
      document.head.appendChild(script);
    }
  }, []);

  return null;
}
