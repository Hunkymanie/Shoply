'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  placeholder?: ReactNode;
  className?: string;
  threshold?: number;
}

export function LazyLoad({ 
  children, 
  placeholder = null, 
  className = '',
  threshold = 0.1 
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          // Unobserve after loading to clean up
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '50px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, hasLoaded]);

  return (
    <div ref={elementRef} className={className}>
      {isVisible ? children : placeholder}
    </div>
  );
}

// Placeholder components for common use cases
export function SectionPlaceholder({ height = 'h-96' }: { height?: string }) {
  return (
    <div className={`${height} bg-muted/20 animate-pulse rounded-lg flex items-center justify-center`}>
      <div className="text-muted-foreground text-sm">Loading...</div>
    </div>
  );
}

export function ProductGridPlaceholder({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="aspect-[4/3] bg-muted/20 animate-shimmer rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 bg-muted/20 animate-shimmer rounded w-3/4" />
            <div className="h-5 bg-muted/20 animate-shimmer rounded w-1/2" />
            <div className="h-4 bg-muted/20 animate-shimmer rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
