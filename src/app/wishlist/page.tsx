'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrency } from '@/contexts/CurrencyContext';

// Mock wishlist data
const mockWishlistItems = [
  {
    id: 1,
    name: "Classic White Button-Down Shirt",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop",
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Light Blue", "Black"]
  },
  {
    id: 2,
    name: "Luxury Cashmere Scarf",
    price: 149.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&h=400&fit=crop",
    inStock: true,
    sizes: ["One Size"],
    colors: ["Beige", "Grey", "Navy"]
  },
  {
    id: 3,
    name: "Premium Leather Handbag",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=400&fit=crop",
    inStock: false,
    sizes: ["One Size"],
    colors: ["Black", "Brown", "Tan"]
  },
  {
    id: 4,
    name: "Designer Sunglasses",
    price: 199.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=400&fit=crop",
    inStock: true,
    sizes: ["One Size"],
    colors: ["Black", "Tortoise", "Gold"]
  }
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);
  const { formatPrice } = useCurrency();

  const removeFromWishlist = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (id: number) => {
    // This would integrate with your cart context
    console.log(`Adding item ${id} to cart`);
  };

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
                    {item.originalPrice && (
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
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs md:text-sm text-muted-foreground line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="mb-2 md:mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Available Colors:</p>
                      <div className="flex space-x-1">
                        {item.colors.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-border"
                            style={{ 
                              backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                             color.toLowerCase() === 'black' ? '#000000' :
                                             color.toLowerCase() === 'grey' || color.toLowerCase() === 'gray' ? '#6b7280' :
                                             color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                             color.toLowerCase() === 'beige' ? '#f5f5dc' :
                                             color.toLowerCase() === 'brown' ? '#8b4513' :
                                             color.toLowerCase() === 'tan' ? '#d2b48c' :
                                             color.toLowerCase() === 'gold' ? '#ffd700' :
                                             color.toLowerCase() === 'tortoise' ? '#8b4513' :
                                             color.toLowerCase() === 'light blue' ? '#87ceeb' :
                                             '#9ca3af'
                            }}
                            title={color}
                          />
                        ))}
                        {item.colors.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{item.colors.length - 3}</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-xs md:text-sm py-2"
                        disabled={!item.inStock}
                        onClick={() => addToCart(item.id)}
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
