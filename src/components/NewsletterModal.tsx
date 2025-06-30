'use client';

import { useState, useEffect } from 'react';
import { Mail, X, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !acceptMarketing) return;

    setIsSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsSubscribing(false);
    
    // Auto close after success
    setTimeout(() => {
      onClose();
      setIsSubscribed(false);
      setEmail('');
      setAcceptMarketing(false);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 max-w-[90vw]">
        {!isSubscribed ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Gift className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                Get 10% Off Your First Order!
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-3 md:space-y-4">
              <p className="text-sm md:text-base text-muted-foreground">
                Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and fashion tips.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newsletter-email" className="text-sm">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="newsletter-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 text-sm md:text-base"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="marketing-consent"
                    checked={acceptMarketing}
                    onCheckedChange={(checked) => setAcceptMarketing(!!checked)}
                    required
                    className="mt-0.5"
                  />
                  <Label htmlFor="marketing-consent" className="text-xs text-muted-foreground leading-4">
                    I agree to receive marketing emails and understand I can unsubscribe at any time.
                  </Label>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    className="flex-1 text-sm md:text-base"
                    disabled={isSubscribing || !email || !acceptMarketing}
                  >
                    {isSubscribing ? 'Subscribing...' : 'Get 10% Off'}
                  </Button>
                  <Button type="button" variant="outline" onClick={onClose} className="px-3">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </form>
              
              <p className="text-xs text-muted-foreground text-center">
                *Discount code will be sent to your email
              </p>
            </div>
          </>
        ) : (
          <div className="text-center space-y-3 md:space-y-4 py-3 md:py-4">
            <div className="h-12 w-12 md:h-16 md:w-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-green-600">Welcome to Shoply!</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Check your email for your 10% discount code
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Hook to manage newsletter modal state
export function useNewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // Check if user has already seen the modal
    const hasSeenNewsletter = localStorage.getItem('hasSeenNewsletter');
    
    if (!hasSeenNewsletter) {
      // Show modal after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  const closeModal = () => {
    setIsOpen(false);
    if (isMounted) {
      localStorage.setItem('hasSeenNewsletter', 'true');
    }
  };

  return { isOpen, closeModal };
}

// Provider component to handle the modal in the layout
export function NewsletterModalProvider() {
  const { isOpen, closeModal } = useNewsletterModal();

  return <NewsletterModal isOpen={isOpen} onClose={closeModal} />;
}
