'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const { verifyEmail, resendVerification, isLoading } = useAuth();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (token) {
      handleVerification();
    } else {
      setStatus('error');
      setMessage('Invalid verification link. Please check your email and try again.');
    }
  }, [token]);

  const handleVerification = async () => {
    if (!token) return;
    
    try {
      const result = await verifyEmail(token);
      if (result.success) {
        setStatus('success');
        setMessage(result.message);
      } else {
        setStatus('error');
        setMessage(result.message);
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred while verifying your email. Please try again.');
    }
  };

  const handleResendVerification = async () => {
    if (!email) return;
    
    try {
      const result = await resendVerification(email);
      if (result.success) {
        setMessage(result.message);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Failed to resend verification email. Please try again.');
    }
  };

  const handleSignIn = () => {
    router.push('/account');
  };

  const handleBackHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            {status === 'loading' && (
              <div className="bg-blue-100">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            )}
            {status === 'success' && (
              <div className="bg-green-100">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            )}
            {status === 'error' && (
              <div className="bg-red-100">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {status === 'loading' && 'Verifying Email...'}
            {status === 'success' && 'Email Verified!'}
            {status === 'error' && 'Verification Failed'}
          </CardTitle>
          <CardDescription>
            {status === 'loading' && 'Please wait while we verify your email address.'}
            {status === 'success' && 'Your email has been successfully verified.'}
            {status === 'error' && 'We couldn\'t verify your email address.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {message && (
            <div className={`border rounded-md p-3 ${
              status === 'success' 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : status === 'error'
                ? 'bg-red-50 border-red-200 text-red-700'
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              <p className="text-sm">{message}</p>
            </div>
          )}

          <div className="space-y-3">
            {status === 'success' && (
              <>
                <Button
                  onClick={handleSignIn}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Sign In to Your Account
                </Button>
                <Button
                  variant="outline"
                  onClick={handleBackHome}
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </>
            )}

            {status === 'error' && (
              <>
                {email && (
                  <Button
                    onClick={handleResendVerification}
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Resending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Resend Verification Email
                      </>
                    )}
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={handleSignIn}
                  className="w-full"
                >
                  Try Signing In
                </Button>
                <Button
                  variant="link"
                  onClick={handleBackHome}
                  className="w-full text-muted-foreground"
                >
                  Back to Home
                </Button>
              </>
            )}

            {status === 'loading' && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground/70">
                  This may take a few seconds...
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
