'use client';

import { useState } from 'react';
import Link from 'next/link';
import { products, getProductsByCategory } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import HeroBanner from '@/components/HeroBanner';
import CategoryNav from '@/components/CategoryNav';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Award, Shield, Truck } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const { formatPrice } = useCurrency();
  
  const displayProducts = selectedCategory 
    ? getProductsByCategory(selectedCategory) 
    : products.slice(0, 8); // Show only 8 products on home page

  return (
    <main className="min-h-screen bg-background">
      <HeroBanner />
      
      <CategoryNav 
        selectedCategory={selectedCategory} 
        onCategorySelect={setSelectedCategory} 
      />

      {/* Brand Story Section */}
      <section 
        className="bg-muted/30 py-16" 
        aria-labelledby="brand-story-heading"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
              About Shoply
            </Badge>
            <h2 id="brand-story-heading" className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Where Style Meets <span className="text-primary">Sophistication</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              At Shoply, we believe fashion is more than clothing—it's a form of self-expression. 
              Our curated collection brings together contemporary trends and timeless elegance, 
              ensuring every piece tells your unique story.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12" role="list">
              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm" role="listitem">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Handpicked materials and expert craftsmanship in every piece
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm" role="listitem">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold mb-2">Sustainable Fashion</h3>
                  <p className="text-sm text-muted-foreground">
                    Committed to ethical production and environmental responsibility
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm" role="listitem">
                <CardContent className="p-6 text-center">
                  <Truck className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold mb-2">Fast & Free Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Free shipping on orders over {formatPrice(75)} with 30-day returns
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section 
        className="container mx-auto px-4 py-16" 
        aria-labelledby="featured-products-heading"
      >
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
            Curated Collection
          </Badge>
          <h2 id="featured-products-heading" className="text-4xl font-bold text-foreground mb-4">
            {selectedCategory || 'Featured Products'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most-loved pieces, carefully selected for their exceptional quality, 
            style, and versatility. Each item represents the perfect blend of contemporary design and timeless appeal.
          </p>
          {!selectedCategory && (
            <div className="text-sm text-muted-foreground mt-4" role="status" aria-live="polite">
              Showing {displayProducts.length} of {products.length} handpicked styles
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" role="list">
          {displayProducts.map((product) => (
            <div key={product.id} role="listitem">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {!selectedCategory && (
          <div className="text-center mt-16">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/products">
                Explore Full Collection
                <svg className="ml-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Over 500+ styles waiting to be discovered
            </p>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section 
        className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-16"
        aria-labelledby="newsletter-heading"
      >
        <div className="container mx-auto px-4 text-center">
          <h3 id="newsletter-heading" className="text-3xl font-bold mb-4">Stay in Style</h3>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Be the first to know about new arrivals, exclusive sales, and style tips from our fashion experts.
          </p>
          <form className="max-w-md mx-auto flex gap-4" aria-label="Newsletter subscription">
            <label htmlFor="email-newsletter" className="sr-only">
              Email Address
            </label>
            <input 
              id="email-newsletter"
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-3 rounded-full border-0 bg-background/20 backdrop-blur-sm text-primary-foreground placeholder:text-primary-foreground/70 focus:outline-none focus:ring-2 focus:ring-background/50"
              required
              aria-describedby="newsletter-description"
            />
            <Button 
              type="submit"
              className="bg-background text-foreground hover:bg-background/90 px-8 py-3 rounded-full font-semibold"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </Button>
          </form>
          <p id="newsletter-description" className="text-xs text-primary-foreground/70 mt-4">
            Unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </section>
    </main>
  );
}
