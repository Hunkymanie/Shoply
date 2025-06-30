'use client';

import { useEffect, useState, useRef } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Package, Truck, Mail, Copy, Check } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cartClearedRef = useRef(false);
  
  // Handle client-side mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Generate proper order number and clear cart
  useEffect(() => {
    if (!mounted) return;
    
    // Check if we already have an order number in session storage for this session
    const existingOrder = sessionStorage.getItem('current_order_number');
    
    if (existingOrder) {
      setOrderNumber(existingOrder);
    } else {
      // Generate order number: ORD-YYYY-MMDD-XXXX format
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
      const generatedOrderNumber = `ORD-${year}-${month}${day}-${random}`;
      
      setOrderNumber(generatedOrderNumber);
      // Store it in session storage so it persists during the session
      sessionStorage.setItem('current_order_number', generatedOrderNumber);
      
      // Clear cart only once when order is first created
      if (!cartClearedRef.current) {
        clearCart();
        cartClearedRef.current = true;
      }
    }
  }, [mounted, clearCart]);

  const copyOrderNumber = async () => {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy order number:', err);
    }
  };

  // Cleanup effect to ensure no lingering timeouts
  useEffect(() => {
    return () => {
      // Clear any pending timeouts when component unmounts
      if (copied) {
        setCopied(false);
      }
    };
  }, [copied]);

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
  
  const deliveryDate = estimatedDelivery.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Show loading state until component is mounted and order number is ready
  if (!mounted || !orderNumber) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Processing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8">
      <div className="max-w-xl mx-auto px-4 w-full">
        {/* Success Icon & Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            {/* Order Number */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl font-bold text-primary">{orderNumber}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyOrderNumber}
                  className="h-8 w-8 p-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Your order number</p>
            </div>

            {/* Status Steps */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mb-2">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-sm text-foreground">Email Sent</h3>
                <p className="text-xs text-muted-foreground">Confirmation sent</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mb-2">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-sm text-foreground">Processing</h3>
                <p className="text-xs text-muted-foreground">Being prepared</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mb-2">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-sm text-foreground">Shipping</h3>
                <p className="text-xs text-muted-foreground">3-5 business days</p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-primary/5 rounded-lg p-4 mb-4 border border-primary/20">
              <h3 className="font-semibold text-foreground mb-2 text-sm">What's Next?</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• Confirmation email sent to your inbox</p>
                <p>• Tracking info will be sent when shipped</p>
                <p>• Expected delivery: <span className="font-medium text-foreground">{deliveryDate}</span></p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/products">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href="/account">View Account</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Need help? <a href="mailto:support@shoply.com" className="text-primary hover:underline">Contact Support</a> or call{' '}
            <a href="tel:+1-555-FASHION" className="text-primary hover:underline">(555) FASHION</a>
          </p>
        </div>
      </div>
    </div>
  );
}
