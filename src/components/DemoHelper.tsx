'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink, Mail, Key, CheckCircle } from 'lucide-react';

export function DemoHelper() {
  const [demoLinks, setDemoLinks] = useState<{ type: string; email: string; link: string; timestamp: number }[]>([]);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  useEffect(() => {
    // Listen to console logs to capture demo links
    const originalLog = console.log;
    console.log = function(...args) {
      const message = args.join(' ');
      
      // Check if this is one of our demo email messages
      if (message.includes('EMAIL VERIFICATION LINK') || message.includes('PASSWORD RESET LINK') || message.includes('NEW VERIFICATION LINK')) {
        const lines = message.split('\n');
        let link = '';
        let email = '';
        let type = '';
        
        lines.forEach(line => {
          if (line.includes('verify-email?token=')) {
            link = line.trim();
            type = 'verification';
          }
          if (line.includes('reset-password?token=')) {
            link = line.trim();
            type = 'reset';
          }
          if (line.includes('This would normally be sent to:')) {
            email = line.replace('📧 This would normally be sent to:', '').trim();
          }
        });
        
        if (link && email) {
          setDemoLinks(prev => [...prev.slice(-4), { type, email, link, timestamp: Date.now() }]);
        }
      }
      
      originalLog.apply(console, args);
    };

    return () => {
      console.log = originalLog;
    };
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(text);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const openLink = (link: string) => {
    window.open(link, '_blank');
  };

  if (demoLinks.length === 0) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 z-50 shadow-lg border-primary/20 bg-background/95 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" />
          Demo Email Links
        </CardTitle>
        <CardDescription className="text-xs">
          In production, these would be sent via email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 max-h-64 overflow-y-auto">
        {demoLinks.map((item, index) => (
          <div key={index} className="border border-border rounded-lg p-3 bg-muted/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {item.type === 'verification' ? (
                  <CheckCircle className="w-4 h-4 text-primary" />
                ) : (
                  <Key className="w-4 h-4 text-accent" />
                )}
                <Badge variant={item.type === 'verification' ? 'default' : 'secondary'} className="text-xs">
                  {item.type === 'verification' ? 'Verify Email' : 'Reset Password'}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(item.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              To: {item.email}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(item.link)}
                className="flex-1 text-xs h-8"
              >
                {copiedLink === item.link ? (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1" />
                    Copy Link
                  </>
                )}
              </Button>
              <Button
                size="sm"
                onClick={() => openLink(item.link)}
                className="flex-1 text-xs h-8 bg-primary hover:bg-primary/90"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Open
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
