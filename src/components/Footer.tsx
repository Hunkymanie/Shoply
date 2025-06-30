import Link from 'next/link';
import { Store, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Heart } from 'lucide-react';
import { PaymentBadges } from '@/components/PaymentBadges';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-20 w-40 h-40 rounded-full border border-primary"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full border border-primary"></div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Enhanced Company Info */}
          <div className="space-y-4 md:space-y-6 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 md:p-3 rounded-xl shadow-lg">
                <Store className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">Shoply</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Fashion • Style • Elegance</p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
              Your trusted fashion destination, bringing the latest trends and timeless pieces
              to your wardrobe since 2020. Where style meets sophistication.
            </p>
            <div className="flex space-x-2 md:space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all p-2 md:p-3 rounded-full"
                asChild
              >
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all p-2 md:p-3 rounded-full"
                asChild
              >
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all p-2 md:p-3 rounded-full"
                asChild
              >
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-3 md:space-y-4">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'All Products' },
                { href: '/collections/new-arrivals', label: 'New Arrivals' },
                { href: '/collections/sale', label: 'Sale Items' },
                { href: '/cart', label: 'Shopping Cart' },
                { href: '/about', label: 'About Us' }
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transform duration-200 block text-sm md:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-foreground">Shop by Category</h4>
            <ul className="space-y-3 md:space-y-4">
              {[
                { href: '/products?category=women', label: 'Women\'s Clothing' },
                { href: '/products?category=men', label: 'Men\'s Clothing' },
                { href: '/products?category=shoes', label: 'Shoes' },
                { href: '/products?category=accessories', label: 'Accessories' },
                { href: '/products?category=jewelry', label: 'Jewelry' }
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transform duration-200 block text-sm md:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-foreground">Get in Touch</h4>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start space-x-3 text-muted-foreground hover:text-primary transition-colors">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-primary mt-0.5" />
                <span className="text-xs md:text-sm">
                  123 Fashion Avenue<br />
                  Style City, SC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-primary" />
                <span className="text-xs md:text-sm">(555) FASHION</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-primary" />
                <span className="text-xs md:text-sm">hello@shoply.com</span>
              </div>
              <div className="flex items-start space-x-3 text-muted-foreground hover:text-primary transition-colors">
                <Clock className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-primary mt-0.5" />
                <span className="text-xs md:text-sm">
                  Mon-Sat: 10AM - 9PM<br />
                  Sunday: 12PM - 6PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-muted/30 mt-8 md:mt-16 pt-6 md:pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 md:space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-2 text-xs md:text-sm text-muted-foreground">
              <span>© 2024 Shoply. All rights reserved.</span>
              <Heart className="h-3 w-3 md:h-4 md:w-4 text-accent" />
              <span className="hidden sm:inline">Made with love for fashion</span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <PaymentBadges variant="default" className="bg-muted/10 border-border/20 backdrop-blur-sm" />
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
