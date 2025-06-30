'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Menu, MapPin, Phone, Heart, User } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import Image from 'next/image';

export default function Header() {
  const { itemCount } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.trim()) {
      router.push(`/products?search=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50" role="banner">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs sm:text-sm" role="complementary" aria-label="Store information">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center">
                <MapPin className="h-3 sm:h-4 w-3 sm:w-4 mr-1" aria-hidden="true" />
                <span className="hidden sm:inline">Free shipping on orders $75+</span>
                <span className="sm:hidden">Free shipping $75+</span>
              </div>
              <div className="hidden md:flex items-center">
                <Phone className="h-4 w-4 mr-1" aria-hidden="true" />
                <span aria-label="Phone number">(555) FASHION</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs sm:text-sm">
              <span className="hidden sm:inline">New Collection • Free Returns</span>
              <span className="sm:hidden">New Collection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" aria-label="Shoply home page">
            <div className="bg-primary p-1.5 md:p-2 rounded-lg">
              <Image 
                src="/shoply-logo.svg" 
                alt="Shoply Logo" 
                width={24} 
                height={24} 
                className="h-5 md:h-6 w-5 md:w-6 text-primary-foreground"
                priority
              />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-foreground">Shoply</h1>
              <p className="text-xs text-muted-foreground hidden sm:block" aria-hidden="true">Fashion • Style • Elegance</p>
            </div>
          </Link>

          {/* Search Bar (hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8" role="search">
            <SearchBar
              value={search}
              onChange={handleSearch}
              placeholder="Search for clothing, shoes, accessories..."
              className="w-full"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4" role="navigation" aria-label="Main navigation">
            <Link 
              href="/" 
              className="text-foreground hover:text-primary font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="text-foreground hover:text-primary font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
            >
              Products
            </Link>
            
            {/* Currency Switcher */}
            <div className="px-2">
              <CurrencySwitcher variant="header" showRate={false} />
            </div>
            
            <Link href="/wishlist">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-foreground hover:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="View wishlist"
              >
                <Heart className="h-4 w-4 mr-1" aria-hidden="true" />
                Wishlist
              </Button>
            </Link>
            <Link href={isAuthenticated ? "/account" : "/auth"}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-foreground hover:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={isAuthenticated ? 'View account' : 'Sign in'}
              >
                <User className="h-4 w-4 mr-1" aria-hidden="true" />
                {isAuthenticated ? user?.name?.split(' ')[0] || 'Account' : 'Sign In'}
              </Button>
            </Link>
            <Link href="/cart" className="relative">
              <Button 
                variant="outline" 
                className="border-border hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <ShoppingCart className="h-4 w-4 mr-2" aria-hidden="true" />
                Cart
                {itemCount > 0 && (
                  <Badge className="ml-2 bg-accent text-accent-foreground" aria-hidden="true">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Link href="/cart" className="relative">
              <Button 
                variant="ghost" 
                size="sm"
                aria-label={`Shopping cart with ${itemCount} items`}
                className="px-2 py-2"
              >
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                {itemCount > 0 && (
                  <Badge className="ml-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5" aria-hidden="true">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  aria-label="Open navigation menu"
                  aria-expanded={isOpen}
                  className="px-2 py-2"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-6 mt-8" role="navigation" aria-label="Mobile navigation">
                  <div role="search">
                    <SearchBar
                      value={search}
                      onChange={handleSearch}
                      placeholder="Search fashion..."
                      className="mb-6"
                    />
                  </div>
                  
                  {/* User Section */}
                  {isAuthenticated && user && (
                    <div className="border-b border-border pb-4 mb-4">
                      <Link 
                        href="/account"
                        className="flex items-center space-x-3 hover:bg-accent/50 rounded-lg p-2 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          View Profile →
                        </div>
                      </Link>
                    </div>
                  )}
                  
                  {/* Navigation Links */}
                  <div className="space-y-4">
                    <Link 
                      href="/" 
                      className="flex items-center space-x-3 text-lg font-medium hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-3 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Image 
                          src="/shoply-logo.svg" 
                          alt="Shoply Logo" 
                          width={16} 
                          height={16} 
                          className="h-4 w-4 text-primary"
                        />
                      </div>
                      Home
                    </Link>
                    <Link 
                      href="/products" 
                      className="flex items-center space-x-3 text-lg font-medium hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-3 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="h-4 w-4 text-primary" />
                      </div>
                      Products
                    </Link>
                    <Link 
                      href="/wishlist" 
                      className="flex items-center space-x-3 text-lg font-medium hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-3 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Heart className="h-4 w-4 text-primary" />
                      </div>
                      Wishlist
                    </Link>
                    {!isAuthenticated && (
                      <Link 
                        href="/auth" 
                        className="flex items-center space-x-3 text-lg font-medium hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-3 py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        Sign In
                      </Link>
                    )}
                    <Link 
                      href="/cart" 
                      className="flex items-center space-x-3 text-lg font-medium hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-3 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center relative">
                        <ShoppingCart className="h-4 w-4 text-primary" />
                        {itemCount > 0 && (
                          <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5">
                            {itemCount}
                          </Badge>
                        )}
                      </div>
                      Cart {itemCount > 0 && `(${itemCount})`}
                    </Link>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="border-t border-border pt-6 mt-6">
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/collections/new-arrivals" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full text-sm">
                          New Arrivals
                        </Button>
                      </Link>
                      <Link href="/collections/sale" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full text-sm">
                          Sale
                        </Button>
                      </Link>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
