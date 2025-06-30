'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Plus, Minus, Heart, Star, Shield, Truck, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useState, use, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { fetchProduct, getDiscountedPrice, formatPrice, getStockStatus, type Product } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const resolvedParams = use(params);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await fetchProduct(resolvedParams.id);
        setProduct(productData);
      } catch (err) {
        setError('Failed to load product. Please try again.');
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-32 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="flex gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="aspect-square w-20 bg-muted rounded"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
            <h1 className="text-xl font-bold text-destructive mb-2">Product Not Found</h1>
            <p className="text-muted-foreground mb-4">
              {error || 'The product you\'re looking for doesn\'t exist.'}
            </p>
            <div className="flex gap-3 justify-center">
              <Button asChild variant="outline">
                <Link href="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Products
                </Link>
              </Button>
              {error && (
                <Button onClick={() => window.location.reload()}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Convert API product to cart item format
    const cartItem = {
      id: product.id.toString(),
      name: product.title,
      description: product.description,
      price: product.discountPercentage ? getDiscountedPrice(product.price, product.discountPercentage) : product.price,
      image: product.thumbnail,
      category: product.category,
      inStock: product.stock > 0
    };

    for (let i = 0; i < quantity; i++) {
      addItem(cartItem);
    }
    setQuantity(1);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const stockStatus = getStockStatus(product.stock);
  const discountedPrice = product.discountPercentage ? getDiscountedPrice(product.price, product.discountPercentage) : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Link
          href="/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 md:mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
          {/* Enhanced Product Images */}
          <div className="space-y-3 md:space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl md:rounded-2xl border border-border bg-muted/30 relative group">
              <Image
                src={product.images[selectedImage] || product.thumbnail}
                alt={product.title}
                width={600}
                height={600}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                priority
              />
              {product.discountPercentage && (
                <Badge className="absolute top-3 md:top-4 left-3 md:left-4 bg-primary text-primary-foreground">
                  {Math.round(product.discountPercentage)}% OFF
                </Badge>
              )}
              {/* Wishlist Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWishlist}
                className="absolute top-3 md:top-4 right-3 md:right-4 bg-background/80 backdrop-blur-sm hover:bg-background p-2"
              >
                <Heart className={`h-4 w-4 md:h-5 md:w-5 ${isWishlisted ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
              </Button>
            </div>
            
            {/* Image thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2">
                {product.images.slice(0, 5).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 aspect-square w-16 md:w-20 rounded-lg border overflow-hidden transition-all ${
                      selectedImage === index 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4 md:space-y-6">
            {/* Product Title & Category */}
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2 md:gap-3">
                <Badge variant="secondary" className="text-xs md:text-sm">
                  {product.category}
                </Badge>
                {product.brand && (
                  <Badge variant="outline" className="text-xs md:text-sm">
                    {product.brand}
                  </Badge>
                )}
                <Badge 
                  variant={stockStatus === 'In Stock' ? 'default' : stockStatus === 'Low Stock' ? 'destructive' : 'secondary'}
                  className="text-xs md:text-sm"
                >
                  {stockStatus}
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 md:h-5 md:w-5 ${
                      i < Math.floor(product.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm md:text-base font-medium text-foreground">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-2xl md:text-3xl font-bold text-foreground">
                {formatPrice(discountedPrice || product.price)}
              </span>
              {discountedPrice && (
                <span className="text-lg md:text-xl text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-sm md:prose-base max-w-none">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Info */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground">SKU:</span>
                <span className="font-medium">{product.id}</span>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Stock:</span>
                <span className="font-medium">{product.stock} available</span>
              </div>
              {product.weight && (
                <div className="space-y-1">
                  <span className="text-muted-foreground">Weight:</span>
                  <span className="font-medium">{product.weight}g</span>
                </div>
              )}
              {product.dimensions && (
                <div className="space-y-1">
                  <span className="text-muted-foreground">Dimensions:</span>
                  <span className="font-medium">
                    {product.dimensions.width}×{product.dimensions.height}×{product.dimensions.depth}cm
                  </span>
                </div>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-2 md:px-3"
                  >
                    <Minus className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                  <span className="px-3 md:px-4 py-1 md:py-2 font-medium text-sm md:text-base min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="px-2 md:px-3"
                  >
                    <Plus className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
                <span className="text-xs md:text-sm text-muted-foreground">
                  {product.stock} in stock
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1 text-sm md:text-base"
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlist}
                  className="sm:w-auto text-sm md:text-base"
                >
                  <Heart className={`mr-2 h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-4 md:pt-6 border-t border-border">
              <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                <div className="space-y-0.5">
                  <div className="font-medium text-foreground">Quality Guarantee</div>
                  <div className="text-muted-foreground">
                    {product.warrantyInformation || '30-day return policy'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                <Truck className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                <div className="space-y-0.5">
                  <div className="font-medium text-foreground">Fast Shipping</div>
                  <div className="text-muted-foreground">
                    {product.shippingInformation || 'Ships within 2-3 days'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                <RefreshCw className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                <div className="space-y-0.5">
                  <div className="font-medium text-foreground">Easy Returns</div>
                  <div className="text-muted-foreground">
                    {product.returnPolicy || '30-day return policy'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-12 md:mt-16">
            <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-foreground">Customer Reviews</h2>
            <div className="grid gap-4 md:gap-6">
              {product.reviews.slice(0, 3).map((review, index) => (
                <Card key={index}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-medium text-foreground">{review.reviewerName}</div>
                        <div className="text-xs md:text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 md:h-4 md:w-4 ${
                              i < review.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
