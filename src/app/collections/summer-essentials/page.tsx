'use client';

import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Sun, Waves } from 'lucide-react';

export default function SummerEssentialsPage() {
  // Filter products that are suitable for summer
  const summerProducts = products.filter(product => 
    product.tags?.some(tag => 
      ['summer', 'light', 'blouse', 'sandals', 'casual', 'shorts'].includes(tag.toLowerCase())
    ) ||
    product.name.toLowerCase().includes('summer') ||
    product.name.toLowerCase().includes('blouse') ||
    product.name.toLowerCase().includes('sandal') ||
    product.category === 'Activewear'
  );

  const breadcrumbItems = [
    { label: 'Collections', href: '/collections' },
    { label: 'Summer Essentials' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-primary/5 py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="mb-6" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sun className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Summer Essentials</h1>
              <Waves className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Beat the heat in style! Our curated summer collection features lightweight fabrics, 
              breathable designs, and effortless pieces perfect for sunny days.
            </p>
            <Badge className="mt-4 bg-primary text-primary-foreground">
              {summerProducts.length} Summer Pieces
            </Badge>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-lg p-4 text-center shadow-sm border border-border">
            <div className="text-2xl mb-2">👗</div>
            <h3 className="font-medium text-foreground">Light Dresses</h3>
          </div>
          <div className="bg-card rounded-lg p-4 text-center shadow-sm border border-border">
            <div className="text-2xl mb-2">👕</div>
            <h3 className="font-medium text-foreground">Breezy Tops</h3>
          </div>
          <div className="bg-card rounded-lg p-4 text-center shadow-sm border border-border">
            <div className="text-2xl mb-2">👡</div>
            <h3 className="font-medium text-foreground">Summer Shoes</h3>
          </div>
          <div className="bg-card rounded-lg p-4 text-center shadow-sm border border-border">
            <div className="text-2xl mb-2">🕶️</div>
            <h3 className="font-medium text-foreground">Accessories</h3>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 pb-8">
        {summerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {summerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-muted-foreground mb-4">
              Summer collection coming soon!
            </div>
            <p className="text-muted-foreground">
              Get ready for the season with our upcoming summer essentials.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
