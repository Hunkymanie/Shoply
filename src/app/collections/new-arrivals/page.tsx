'use client';

import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

export default function NewArrivalsPage() {
  const newProducts = products.filter(product => product.isNew);

  const breadcrumbItems = [
    { label: 'Collections', href: '/collections' },
    { label: 'New Arrivals' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-primary/5 py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="mb-6" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">New Arrivals</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the latest additions to our collection. Fresh styles, trending colors, and must-have pieces for every wardrobe.
            </p>
            <Badge className="mt-4 bg-primary text-primary-foreground">
              {newProducts.length} New Items
            </Badge>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        {newProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg mb-4">
              No new arrivals at the moment.
            </div>
            <p className="text-muted-foreground">
              Check back soon for the latest fashion trends!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
