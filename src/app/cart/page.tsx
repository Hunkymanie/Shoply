'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, Truck, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, total, itemCount } = useCart();
  const { formatPrice } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="bg-card rounded-full p-6 md:p-8 w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 flex items-center justify-center border border-border">
              <ShoppingBag className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-foreground">Your cart is empty</h1>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              Discover beautiful fashion pieces and add them to your cart to get started.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-sm md:text-base">
              <Link href="/products">
                <ShoppingBag className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Start Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const savings = total * 0.1; // Mock savings
  const deliveryFee = total >= 75 ? 0 : 9.99;
  const finalTotal = total + deliveryFee;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Shopping Cart</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {/* Delivery Notice */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-primary">
                        {total >= 75 ? 'Free shipping on this order!' : `Add ${formatPrice(75 - total)} more for free shipping`}
                      </p>
                      <p className="text-sm text-primary/80">
                        Orders over {formatPrice(75)} qualify for free shipping
                      </p>
                    </div>
                  </div>
              </CardContent>
            </Card>

            {/* Cart Items */}
            {items.map((item) => (
              <Card key={item.id} className="bg-white">
                <CardContent className="p-3 md:p-6">
                  <div className="flex gap-3 md:gap-4">
                    <div className="h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-lg border border-border flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base md:text-lg text-foreground truncate">{item.name}</h3>
                          <Badge variant="outline" className="text-xs mt-1 text-primary border-primary/20">
                            {item.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 md:p-2 flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 md:mt-4 gap-3">
                        <div className="flex items-center border rounded-lg w-fit">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="hover:bg-muted p-2"
                          >
                            <Minus className="h-3 w-3 md:h-4 md:w-4" />
                          </Button>
                          <span className="px-3 py-2 min-w-10 text-center font-medium text-sm md:text-base">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="hover:bg-muted p-2"
                          >
                            <Plus className="h-3 w-3 md:h-4 md:w-4" />
                          </Button>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="font-bold text-base md:text-lg text-primary">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          <div className="text-xs md:text-sm text-muted-foreground">
                            {formatPrice(item.price)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4 lg:top-24 bg-white">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-foreground">Order Summary</h2>
                
                {/* Order Details */}
                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm md:text-base text-muted-foreground">Subtotal ({itemCount} items)</span>
                    <span className="font-medium text-sm md:text-base">{formatPrice(total)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-accent">
                      <span className="text-sm md:text-base">Savings</span>
                      <span className="text-sm md:text-base">-{formatPrice(savings)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm md:text-base text-muted-foreground">Delivery Fee</span>
                    <span className={`text-sm md:text-base ${deliveryFee === 0 ? 'text-primary font-medium' : 'font-medium'}`}>
                      {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="border-t pt-2 md:pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-base md:text-lg font-bold text-foreground">Total</span>
                      <span className="text-xl md:text-2xl font-bold text-primary">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-muted/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6 space-y-2 md:space-y-3">
                  <div className="flex items-center space-x-2 text-xs md:text-sm">
                    <Shield className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                    <span className="text-foreground">Secure checkout</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs md:text-sm">
                    <Clock className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                    <span className="text-foreground">Fast delivery</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs md:text-sm">
                    <Truck className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                    <span className="text-foreground">Free returns</span>
                  </div>
                </div>

                <Button className="w-full mb-2 md:mb-3 bg-primary hover:bg-primary/90 text-primary-foreground text-sm md:text-base" size="lg" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full mb-3 md:mb-4 border-border hover:bg-muted text-sm md:text-base"
                  asChild
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-xs md:text-sm text-muted-foreground hover:text-destructive"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
