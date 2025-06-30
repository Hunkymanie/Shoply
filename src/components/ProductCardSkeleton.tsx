import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <div className="group relative bg-card rounded-lg border border-border overflow-hidden shadow-sm">
      {/* Image skeleton */}
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <Skeleton className="h-4 w-3/4" />
        
        {/* Price skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        
        {/* Rating skeleton */}
        <div className="flex items-center space-x-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>
        
        {/* Button skeleton */}
        <Skeleton className="h-10 w-full mt-4" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
