'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Key, Users, Shield, UserCheck } from 'lucide-react';

export default function AuthTestPage() {

  const authFeatures = [
    {
      id: 'registration',
      title: 'User Registration',
      description: 'Users can create new accounts with email verification',
      icon: Users,
      steps: [
        'Go to /auth or click "Sign In" in header',
        'Click "Create Account"',
        'Fill in name, email, and password',
        'Submit form',
        'Check console for verification link',
        'Click the verification link to verify email'
      ]
    },
    {
      id: 'email-verification',
      title: 'Email Verification',
      description: 'New users must verify their email before signing in',
      icon: Mail,
      steps: [
        'After registration, check the demo helper popup (bottom right)',
        'Copy or click the verification link',
        'Should redirect to verification success page',
        'Can then sign in with verified account'
      ]
    },
    {
      id: 'login',
      title: 'User Login',
      description: 'Verified users can sign in to their accounts',
      icon: UserCheck,
      steps: [
        'Go to /auth page',
        'Enter verified email and password',
        'Submit form',
        'Should redirect to account dashboard',
        'Header should show user name instead of "Sign In"'
      ]
    },
    {
      id: 'password-reset',
      title: 'Password Reset',
      description: 'Users can reset forgotten passwords',
      icon: Key,
      steps: [
        'Go to /auth page',
        'Click "Forgot your password?"',
        'Enter email address',
        'Check console/demo helper for reset link',
        'Click reset link to set new password',
        'Sign in with new password'
      ]
    },
    {
      id: 'session-persistence',
      title: 'Session Persistence',
      description: 'User sessions persist across browser refreshes',
      icon: Shield,
      steps: [
        'Sign in to your account',
        'Refresh the page',
        'Should remain signed in',
        'Close and reopen browser tab',
        'Should still be signed in (for 7 days)'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication System Test</h1>
            <p className="text-gray-600">
              Test all authentication features of the Shoply e-commerce platform
            </p>
            <Badge className="mt-4 bg-blue-100 text-blue-800">
              Demo Mode - Check Console & Demo Helper for Email Links
            </Badge>
          </div>

          <div className="grid gap-6 mb-8">
            {authFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.id} className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                      {feature.title}
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-gray-700">Testing Steps:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                        {feature.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Mail className="w-5 h-5" />
                Demo Email System
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-700 space-y-2">
              <p>
                <strong>Since this is a demo:</strong> Instead of sending real emails, the system will:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Log verification and reset links to the browser console</li>
                <li>Show clickable links in the Demo Helper popup (bottom right)</li>
                <li>Store demo data in localStorage (not a real database)</li>
              </ul>
              <p className="mt-3">
                <strong>In production:</strong> These would be replaced with real email sending via services like 
                SendGrid, Mailgun, or AWS SES, and user data would be stored in a secure database.
              </p>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Button asChild className="bg-purple-600 hover:bg-purple-700 mr-4">
              <Link href="/auth">Start Testing Authentication</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
