'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Truck, Sparkles, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchProductsByCategory, type Product } from '@/lib/api';

export default function HeroBanner() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        // Fetch products from women's categories for featured display
        const dressesResponse = await fetchProductsByCategory('womens-dresses', 2, 0);
        const shoesResponse = await fetchProductsByCategory('womens-shoes', 1, 0);
        
        const combined = [...dressesResponse.products, ...shoesResponse.products];
        setFeaturedProducts(combined.slice(0, 3));
      } catch (error) {
        console.error('Failed to load featured products:', error);
        // Fallback to empty array if API fails
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-primary"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-primary"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rotate-45 bg-primary"></div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] md:min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-4 md:space-y-6">
              <Badge className="bg-primary text-primary-foreground border-0 w-fit animate-pulse mx-auto lg:mx-0">
                ✨ New Collection Drop - 40% Off
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-foreground">
                Fashion
                <br />
                <span className="text-primary relative">
                  Redefined
                  <div className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-0.5 md:h-1 bg-primary/30 rounded-full"></div>
                </span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed mx-auto lg:mx-0">
              Where luxury meets accessibility. Discover handpicked fashion pieces that elevate your wardrobe and express your unique personality.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Link href="/products">
                  <ShoppingCart className="mr-2 md:mr-3 h-4 md:h-5 w-4 md:w-5" />
                  Shop Collection
                  <ArrowRight className="ml-1 md:ml-2 h-4 md:h-5 w-4 md:w-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-full transition-all hover:scale-105"
              >
                <Link href="/collections/new-arrivals">
                  <Heart className="mr-2 md:mr-3 h-4 md:h-5 w-4 md:w-5" />
                  New Arrivals
                </Link>
              </Button>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-4 md:pt-6">
              <div className="text-center">
                <Star className="h-6 md:h-8 w-6 md:w-8 text-primary mx-auto mb-1 md:mb-2" />
                <span className="text-xs md:text-sm font-semibold block text-foreground">Premium Quality</span>
                <span className="text-xs text-muted-foreground">Curated Materials</span>
              </div>
              <div className="text-center">
                <Truck className="h-6 md:h-8 w-6 md:w-8 text-primary mx-auto mb-1 md:mb-2" />
                <span className="text-xs md:text-sm font-semibold block text-foreground">Free Shipping</span>
                <span className="text-xs text-muted-foreground">Orders $75+</span>
              </div>
              <div className="text-center">
                <Sparkles className="h-6 md:h-8 w-6 md:w-8 text-primary mx-auto mb-1 md:mb-2" />
                <span className="text-xs md:text-sm font-semibold block text-foreground">Exclusive Styles</span>
                <span className="text-xs text-muted-foreground">Limited Edition</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Product Showcase */}
          <div className="relative order-first lg:order-last">
            {/* Main Featured Product */}
            {!loading && featuredProducts.length > 0 ? (
              <div className="relative group cursor-pointer">
                <Link href={`/products/${featuredProducts[0].id}`}>
                  <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full rounded-2xl lg:rounded-3xl overflow-hidden bg-card shadow-xl lg:shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                    <Image
                      src={featuredProducts[0].thumbnail}
                      alt={featuredProducts[0].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 text-white">
                      <Badge className="bg-primary text-primary-foreground mb-2 lg:mb-3 text-xs lg:text-sm">
                        {featuredProducts[0].category}
                      </Badge>
                      <h3 className="text-lg lg:text-2xl font-bold mb-2 line-clamp-2">{featuredProducts[0].title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg lg:text-xl font-bold">
                            ${featuredProducts[0].discountPercentage 
                              ? (featuredProducts[0].price * (1 - featuredProducts[0].discountPercentage / 100)).toFixed(2)
                              : featuredProducts[0].price.toFixed(2)
                            }
                          </span>
                          {featuredProducts[0].discountPercentage && (
                            <span className="text-sm line-through opacity-70">
                              ${featuredProducts[0].price.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs lg:text-sm">
                          Shop Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full rounded-2xl lg:rounded-3xl overflow-hidden bg-muted animate-pulse">
                <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6">
                  <div className="h-6 bg-muted-foreground/20 rounded mb-2"></div>
                  <div className="h-8 bg-muted-foreground/20 rounded mb-2"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded w-1/2"></div>
                </div>
              </div>
            )}

            {/* Secondary Products - Hidden on mobile, visible on larger screens */}
            <div className="absolute -right-2 lg:-right-4 top-8 lg:top-12 space-y-3 lg:space-y-4 hidden md:block">
              {!loading && featuredProducts.slice(1).map((product, index) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div className="group relative w-24 lg:w-32 h-32 lg:h-40 rounded-xl lg:rounded-2xl overflow-hidden bg-card shadow-md lg:shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 25vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-1 lg:bottom-2 left-1 lg:left-2 right-1 lg:right-2 text-white">
                      <div className="text-xs font-semibold truncate">{product.title}</div>
                      <div className="text-xs lg:text-sm font-bold">
                        {product.discountPercentage ? (
                          <div className="flex items-center gap-1">
                            <span>${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                            <span className="text-xs line-through opacity-70">${product.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span>${product.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Product Grid - Show secondary products in grid on mobile */}
            <div className="grid grid-cols-2 gap-3 mt-4 md:hidden">
              {!loading && featuredProducts.slice(1).map((product, index) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div className="group relative h-32 rounded-xl overflow-hidden bg-card shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <div className="text-xs font-semibold truncate">{product.title}</div>
                      <div className="text-sm font-bold">
                        {product.discountPercentage ? (
                          <div className="flex items-center gap-1">
                            <span>${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                            <span className="text-xs line-through opacity-70">${product.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span>${product.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Floating Stats - Adjusted for mobile */}
            <div className="absolute -left-2 lg:-left-6 bottom-16 lg:bottom-20 bg-card rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-lg lg:shadow-xl border border-border hidden sm:block">
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-primary">500+</div>
                <div className="text-xs text-muted-foreground">Styles</div>
              </div>
            </div>
            
            <div className="absolute -left-2 lg:-left-6 top-24 lg:top-32 bg-card rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-lg lg:shadow-xl border border-border hidden sm:block">
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-primary flex items-center justify-center">
                  4.9
                  <Star className="h-3 lg:h-4 w-3 lg:w-4 ml-1 fill-primary text-primary" />
                </div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
