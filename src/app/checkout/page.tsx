'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CreditCard, ShieldCheck, Truck, Lock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardName: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CheckoutPage() {
  const { items, total, itemCount } = useCart();
  const { formatPrice } = useCurrency();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  
  const shippingCost = total >= 75 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shippingCost + tax;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Required field validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiry.trim()) newErrors.expiry = 'Expiry date is required';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Card number validation (basic)
    if (formData.cardNumber && formData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    
    // CVV validation
    if (formData.cvv && (formData.cvv.length < 3 || formData.cvv.length > 4)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Generate order number before processing
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    const orderNumber = `ORD-${year}-${month}${day}-${random}`;
    
    // Store order number in session storage
    sessionStorage.setItem('current_order_number', orderNumber);
    
    // Simulate payment processing with more realistic timing
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to success page
      window.location.href = '/checkout/success';
    }, 2500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some beautiful fashion pieces to get started!</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Secure Checkout</h1>
          <p className="text-muted-foreground mt-2">Complete your purchase securely</p>
          
          {/* Progress indicator */}
          <div className="flex items-center mt-6 space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="ml-2 text-sm font-medium text-foreground">Shipping</span>
            </div>
            <div className="flex-1 h-px bg-border"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-foreground">Payment</span>
            </div>
            <div className="flex-1 h-px bg-border"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm">
                3
              </div>
              <span className="ml-2 text-sm text-muted-foreground">Review</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-primary" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName" 
                        placeholder="John" 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={errors.firstName ? 'border-destructive' : ''}
                        required 
                      />
                      {errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe" 
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={errors.lastName ? 'border-destructive' : ''}
                        required 
                      />
                      {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-destructive' : ''}
                      required 
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input 
                      id="address" 
                      placeholder="123 Fashion Street" 
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={errors.address ? 'border-destructive' : ''}
                      required 
                    />
                    {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input 
                        id="city" 
                        placeholder="New York" 
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={errors.city ? 'border-destructive' : ''}
                        required 
                      />
                      {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input 
                        id="zipCode" 
                        placeholder="10001" 
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className={errors.zipCode ? 'border-destructive' : ''}
                        required 
                      />
                      {errors.zipCode && <p className="text-sm text-destructive mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-primary" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input 
                      id="cardNumber" 
                      placeholder="1234 5678 9012 3456" 
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                      className={errors.cardNumber ? 'border-destructive' : ''}
                      maxLength={19}
                      required 
                    />
                    {errors.cardNumber && <p className="text-sm text-destructive mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date *</Label>
                      <Input 
                        id="expiry" 
                        placeholder="MM/YY" 
                        value={formData.expiry}
                        onChange={(e) => handleInputChange('expiry', e.target.value)}
                        className={errors.expiry ? 'border-destructive' : ''}
                        maxLength={5}
                        required 
                      />
                      {errors.expiry && <p className="text-sm text-destructive mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input 
                        id="cvv" 
                        placeholder="123" 
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                        className={errors.cvv ? 'border-destructive' : ''}
                        maxLength={4}
                        required 
                      />
                      {errors.cvv && <p className="text-sm text-destructive mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Name on Card *</Label>
                    <Input 
                      id="cardName" 
                      placeholder="John Doe" 
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      className={errors.cardName ? 'border-destructive' : ''}
                      required 
                    />
                    {errors.cardName && <p className="text-sm text-destructive mt-1">{errors.cardName}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <div className="flex items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                <ShieldCheck className="h-5 w-5 text-primary mr-3" />
                <div className="text-sm">
                  <p className="font-medium text-foreground flex items-center">
                    <Lock className="h-4 w-4 mr-1" />
                    256-bit SSL Encryption
                  </p>
                  <p className="text-muted-foreground">Your payment information is encrypted and secure</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <p className="text-sm text-muted-foreground">{itemCount} items</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-1 text-foreground">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                        {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-2xl font-bold text-primary">{formatPrice(finalTotal)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Free Shipping Notice */}
                  {total < 75 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800">
                        💚 Add <span className="font-bold">{formatPrice(75 - total)}</span> more for free shipping!
                      </p>
                    </div>
                  )}

                  {/* Security Badges */}
                  <div className="border-t pt-4">
                    <div className="flex justify-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <ShieldCheck className="h-4 w-4 mr-1" />
                        SSL Secure
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verified
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Complete Secure Purchase
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    By completing your purchase, you agree to our Terms of Service
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
