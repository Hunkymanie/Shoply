'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Star, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { trackAddToCart, trackProductView } = useAnalytics();
  const { formatPrice, currency } = useCurrency();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    trackAddToCart(product.id, product.name, product.salePrice || product.price);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleProductClick = () => {
    trackProductView(product.id, product.name);
  };

  const displayPrice = product.salePrice || product.price;
  const originalPrice = product.salePrice ? product.price : null;

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 bg-card border border-border">
      <Link href={`/products/${product.id}`} onClick={handleProductClick}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          {/* Skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-shimmer" />
          )}
          
          <Image
            src={product.image}
            alt={`${product.name} - ${product.category}`}
            width={400}
            height={400}
            className={`h-full w-full object-cover transition-all duration-300 ${
              imageLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground">
                New
              </Badge>
            )}
            {product.isSale && (
              <Badge className="bg-accent text-accent-foreground">
                Sale
              </Badge>
            )}
            {!product.inStock && (
              <Badge className="bg-muted-foreground text-primary-foreground">
                Sold Out
              </Badge>
            )}
          </div>

          {/* Rating & Wishlist */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {product.rating && (
              <div className="bg-background/90 backdrop-blur-sm rounded-full px-2 py-1">
                <div className="flex items-center text-primary">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-xs ml-1 font-medium">{product.rating}</span>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleWishlist}
              className="bg-background/90 backdrop-blur-sm rounded-full h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Heart 
                className={`h-4 w-4 transition-colors ${isWishlisted ? 'fill-primary text-primary' : 'text-muted-foreground hover:text-primary'}`} 
              />
            </Button>
          </div>

          {/* Sale percentage */}
          {product.salePrice && (
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-primary text-primary-foreground font-medium">
                -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
              </Badge>
            </div>
          )}
        </div>
      </Link>
      
      <CardContent className="p-2 md:p-3">
        <div className="space-y-2">
          <div>
            <div className="flex items-center justify-between mb-1">
              <Badge variant="outline" className="text-xs text-primary border-primary/20 px-1.5 py-0.5">
                {product.category}
              </Badge>
              {product.brand && (
                <span className="text-xs text-muted-foreground hidden sm:inline">{product.brand}</span>
              )}
            </div>
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-xs sm:text-sm hover:text-primary transition-colors line-clamp-2 leading-tight">
                {product.name}
              </h3>
            </Link>
          </div>
          
          {/* Colors - Only show on larger screens */}
          {product.colors && product.colors.length > 0 && (
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Colors:</span>
              <div className="flex gap-1">
                {product.colors.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full border border-border"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
                )}
              </div>
            </div>
          )}
          
          {/* Reviews - Only show on larger screens */}
          {product.reviewCount && (
            <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span>{product.rating}</span>
              <span>({product.reviewCount} reviews)</span>
            </div>
          )}
          
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1 md:gap-2">
                <span className="text-base md:text-lg font-bold text-primary truncate">
                  {formatPrice(displayPrice)}
                </span>
                {originalPrice && (
                  <span className="text-xs md:text-sm text-muted-foreground line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground hidden sm:inline">
                {currency === 'NGN' ? 'Free shipping on orders ₦120,000+' : 'Free shipping on orders $75+'}
              </span>
            </div>
            
            <Button 
              onClick={handleAddToCart}
              size="sm"
              disabled={!product.inStock}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-2 md:px-3 text-xs flex-shrink-0"
            >
              <Plus className="h-3 w-3 md:mr-1" />
              <span className="hidden md:inline">Add</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
