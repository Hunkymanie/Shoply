'use client';

import Image from 'next/image';
import { ArrowLeft, Plus, Minus, Heart, Star, Shield, Truck, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useState, use, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { fetchProduct, getDiscountedPrice } from '@/lib/api';
import { getProductById } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Product as LocalProduct } from '@/types';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState<LocalProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const { addItem } = useCart();
  const { currency, convertPrice, formatPrice } = useCurrency();
  const resolvedParams = use(params);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First try to get from static products
        const staticProduct = getProductById(resolvedParams.id);
        if (staticProduct) {
          console.log('Found static product:', staticProduct.id, staticProduct.name);
          setProduct(staticProduct);
          // Set default selections for static products
          if (staticProduct.colors?.length) {
            setSelectedColor(staticProduct.colors[0]);
          }
          if (staticProduct.sizes?.length) {
            setSelectedSize(staticProduct.sizes[0]);
          }
          setLoading(false);
          return;
        }

        // If not found in static products, try API
        console.log('Static product not found, trying API for ID:', resolvedParams.id);
        const apiProduct = await fetchProduct(resolvedParams.id);
        
        // Convert API product to local Product type
        const localProduct: LocalProduct = {
          id: apiProduct.id.toString(),
          name: apiProduct.title,
          description: apiProduct.description,
          price: apiProduct.price,
          salePrice: apiProduct.discountPercentage ? getDiscountedPrice(apiProduct.price, apiProduct.discountPercentage) : undefined,
          image: apiProduct.thumbnail,
          category: apiProduct.category,
          inStock: apiProduct.stock > 0,
          brand: apiProduct.brand,
          rating: apiProduct.rating,
          reviewCount: apiProduct.reviews?.length || 0,
          tags: apiProduct.tags,
          isSale: !!apiProduct.discountPercentage,
          isNew: false,
          colors: ['Black', 'White', 'Gray'], // Default colors since API doesn't provide them
          sizes: ['S', 'M', 'L', 'XL'], // Default sizes since API doesn't provide them
        };
        
        console.log('Found API product:', localProduct.id, localProduct.name);
        setProduct(localProduct);
        // Set default selections
        if (localProduct.colors?.length) {
          setSelectedColor(localProduct.colors[0]);
        }
        if (localProduct.sizes?.length) {
          setSelectedSize(localProduct.sizes[0]);
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [resolvedParams.id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Add the product to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    
    // Reset quantity to 1 after adding to cart
    setQuantity(1);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button asChild>
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <Button asChild>
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gray-900">Products</Link>
        <span>/</span>
        <Link href={`/collections/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-gray-900 capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      {/* Back Button */}
      <Button variant="ghost" className="mb-6 p-0 h-auto font-normal text-gray-600 hover:text-gray-900" asChild>
        <Link href="/products">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            
            {/* Sale Badge */}
            {product.isSale && product.salePrice && (
              <div className="absolute top-4 left-4">
                <Badge variant="destructive" className="bg-red-500">
                  SALE
                </Badge>
              </div>
            )}

            {/* New Badge */}
            {product.isNew && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-600">
                  NEW
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating || 0)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating?.toFixed(1) || '0.0'}
              </span>
              <span className="text-sm text-gray-400">
                ({product.reviewCount || 0} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            {product.salePrice ? (
              <>
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(convertPrice(product.salePrice))}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(convertPrice(product.price))}
                </span>
                <Badge variant="destructive" className="ml-2">
                  {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                </Badge>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(convertPrice(product.price))}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600">
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Brand */}
          {product.brand && (
            <div>
              <span className="text-sm text-gray-600">Brand: </span>
              <span className="font-medium">{product.brand}</span>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? 'border-gray-900 ring-2 ring-gray-300'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={decreaseQuantity}
                    className="p-2 hover:bg-gray-50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 h-12"
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlist}
                className="h-12 w-12"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="border-t pt-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders over {formatPrice(100)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-500">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-sm">Secure Payment</p>
                  <p className="text-xs text-gray-500">SSL encrypted checkout</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Product Details</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
              
              {product.brand && (
                <div>
                  <h4 className="font-medium mb-2">Brand</h4>
                  <p className="text-gray-600">{product.brand}</p>
                </div>
              )}
              
              <div>
                <h4 className="font-medium mb-2">Category</h4>
                <p className="text-gray-600 capitalize">{product.category}</p>
              </div>
              
              {product.tags && product.tags.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Features</h4>
                  <ul className="text-gray-600 space-y-1">
                    {product.tags.map((tag) => (
                      <li key={tag}>• {tag}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
