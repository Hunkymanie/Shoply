'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Mail, Key, Copy, ExternalLink } from 'lucide-react';

export default function DemoLinksPage() {
  const [email, setEmail] = useState('test@example.com');
  const [verificationLink, setVerificationLink] = useState('');
  const [resetLink, setResetLink] = useState('');

  const generateVerificationLink = () => {
    const token = Math.random().toString(36).substring(2, 15);
    const link = `${window.location.origin}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
    setVerificationLink(link);
    
    // Store in localStorage for demo
    localStorage.setItem(`verification_${email}`, token);
  };

  const generateResetLink = () => {
    const token = Math.random().toString(36).substring(2, 15);
    const link = `${window.location.origin}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    setResetLink(link);
    
    // Store in localStorage for demo
    localStorage.setItem(`reset_${email}`, token);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const openLink = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Demo Email Links Generator</h1>
            <p className="text-gray-600">
              Generate demo verification and password reset links for testing
            </p>
            <Badge className="mt-4 bg-blue-100 text-blue-800">
              Demo Mode - For Testing Only
            </Badge>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Email Address</CardTitle>
              <CardDescription>Enter the email address to generate links for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-600" />
                  Email Verification Link
                </CardTitle>
                <CardDescription>
                  Generate a link to verify the email address
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={generateVerificationLink}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Generate Verification Link
                </Button>
                
                {verificationLink && (
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-100 rounded-lg break-all text-sm">
                      {verificationLink}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(verificationLink)}
                        className="flex-1"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        onClick={() => openLink(verificationLink)}
                        className="flex-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-blue-600" />
                  Password Reset Link
                </CardTitle>
                <CardDescription>
                  Generate a link to reset the password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={generateResetLink}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Generate Reset Link
                </Button>
                
                {resetLink && (
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-100 rounded-lg break-all text-sm">
                      {resetLink}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(resetLink)}
                        className="flex-1"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        onClick={() => openLink(resetLink)}
                        className="flex-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild variant="outline" className="mr-4">
              <a href="/auth-test">Back to Auth Test</a>
            </Button>
            <Button asChild>
              <a href="/auth" className="bg-purple-600 hover:bg-purple-700">Try Authentication</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
