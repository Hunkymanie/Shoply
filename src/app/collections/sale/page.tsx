'use client';

import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Percent, Timer } from 'lucide-react';

export default function SalePage() {
  const saleProducts = products.filter(product => product.isSale);

  const breadcrumbItems = [
    { label: 'Collections', href: '/collections' },
    { label: 'Sale' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-primary/5 py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="mb-6" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Percent className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Sale</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don&apos;t miss out on incredible deals! Save big on your favorite fashion pieces with discounts up to 50% off.
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Badge className="bg-primary text-primary-foreground">
                {saleProducts.length} Items on Sale
              </Badge>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Timer className="h-4 w-4" />
                <span className="text-sm">Limited Time Offer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        {saleProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              No sale items available at the moment.
            </div>
            <p className="text-gray-400">
              Check back soon for amazing deals!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
