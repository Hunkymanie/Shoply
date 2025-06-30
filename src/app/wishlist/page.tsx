'use client';

import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Trash2, Share2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/lib/products';
import { Product } from '@/types';

export default function WishlistPage() {
  const { user, isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  
  // Mock wishlist items - in a real app, this would come from user's wishlist data
  // For now, we'll simulate having some items for authenticated users
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  useEffect(() => {
    // Only show wishlist items if user is authenticated
    // For demo purposes, we'll show a few items from our product catalog
    if (isAuthenticated && user) {
      // Simulate user having some items in wishlist
      const mockWishlistProductIds = ['1', '2', '9']; // Some product IDs from our catalog
      const userWishlistItems = products.filter(product => 
        mockWishlistProductIds.includes(product.id)
      );
      setWishlistItems(userWishlistItems);
    } else {
      setWishlistItems([]);
    }
  }, [isAuthenticated, user]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (product: Product) => {
    addItem(product);
    // Optionally show a success message
    console.log(`Added ${product.name} to cart`);
  };

  // Show login prompt if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Wishlist</h1>
              <p className="text-sm md:text-base text-muted-foreground mt-2">Save your favorite items for later</p>
            </div>

            <div className="text-center py-12 md:py-16">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Lock className="w-10 h-10 md:w-12 md:h-12 text-primary" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4">Sign in to view your wishlist</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto">
                Create an account or sign in to save your favorite items and access them from any device
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/auth">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-sm md:text-base">
                    Sign In
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" size="lg" className="text-sm md:text-base">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Wishlist</h1>
              <p className="text-sm md:text-base text-muted-foreground mt-2">Save your favorite items for later</p>
            </div>

            <div className="text-center py-12 md:py-16">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Heart className="w-10 h-10 md:w-12 md:h-12 text-primary" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4">Your wishlist is empty</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto">
                Discover amazing products and save your favorites by clicking the heart icon
              </p>
              <Link href="/products">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-sm md:text-base">
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Wishlist</h1>
              <p className="text-sm md:text-base text-muted-foreground mt-2">{wishlistItems.length} items saved</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <Button variant="outline" className="flex items-center justify-center space-x-2 text-sm md:text-base">
                <Share2 className="w-3 h-3 md:w-4 md:h-4" />
                <span>Share Wishlist</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setWishlistItems([])}
                className="flex items-center justify-center space-x-2 text-red-600 border-red-200 hover:bg-red-50 text-sm md:text-base"
              >
                <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                <span>Clear All</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={400}
                      className="w-full h-48 md:h-64 object-cover rounded-t-lg"
                    />
                    {item.salePrice && (
                      <Badge className="absolute top-2 md:top-3 left-2 md:left-3 bg-red-500 text-xs">
                        Sale
                      </Badge>
                    )}
                    {!item.inStock && (
                      <Badge className="absolute top-2 md:top-3 right-10 md:right-12 bg-muted-foreground text-xs">
                        Out of Stock
                      </Badge>
                    )}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 md:top-3 right-2 md:right-3 w-7 h-7 md:w-8 md:h-8 bg-background rounded-full flex items-center justify-center shadow-md hover:bg-muted transition-colors"
                    >
                      <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500 fill-current" />
                    </button>
                  </div>

                  <div className="p-3 md:p-4">
                    <h3 className="font-medium text-sm md:text-base text-foreground mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mb-2 md:mb-3">
                      <span className="text-base md:text-lg font-semibold text-foreground">
                        {formatPrice(item.salePrice || item.price)}
                      </span>
                      {item.salePrice && (
                        <span className="text-xs md:text-sm text-muted-foreground line-through">
                          {formatPrice(item.price)}
                        </span>
                      )}
                    </div>

                    <div className="mb-2 md:mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Available Colors:</p>
                      <div className="flex space-x-1">
                        {item.colors?.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-border"
                            style={{ 
                              backgroundColor: 
                                color.toLowerCase().includes('white') ? '#ffffff' : 
                                color.toLowerCase().includes('black') ? '#000000' :
                                color.toLowerCase().includes('grey') || color.toLowerCase().includes('gray') ? '#6b7280' :
                                color.toLowerCase().includes('navy') ? '#1e3a8a' :
                                color.toLowerCase().includes('beige') ? '#f5f5dc' :
                                color.toLowerCase().includes('brown') ? '#8b4513' :
                                color.toLowerCase().includes('tan') ? '#d2b48c' :
                                color.toLowerCase().includes('gold') ? '#ffd700' :
                                color.toLowerCase().includes('champagne') ? '#f7e7ce' :
                                color.toLowerCase().includes('oatmeal') ? '#f5f5dc' :
                                color.toLowerCase().includes('charcoal') ? '#36454f' :
                                color.toLowerCase().includes('camel') ? '#c19a6b' :
                                color.toLowerCase().includes('ivory') ? '#fffff0' :
                                color.toLowerCase().includes('midnight') ? '#191970' :
                                color.toLowerCase().includes('deep') ? '#0a1128' :
                                '#9ca3af'
                            }}
                            title={color}
                          />
                        )) || []}
                        {(item.colors?.length || 0) > 3 && (
                          <span className="text-xs text-muted-foreground">+{(item.colors?.length || 0) - 3}</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-xs md:text-sm py-2"
                        disabled={!item.inStock}
                        onClick={() => addToCart(item)}
                      >
                        <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                      <Link href={`/products/${item.id}`}>
                        <Button variant="outline" className="w-full text-xs md:text-sm py-2">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {wishlistItems.length > 0 && (
            <div className="mt-8 md:mt-12 text-center">
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 md:mb-4">
                  Ready to make a purchase?
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                  Add your favorite items to cart and enjoy free shipping on orders over {formatPrice(75)}
                </p>
                <Link href="/products">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-sm md:text-base">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
