'use client';

import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

interface AuthFormProps {
  onSuccess?: () => void;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'verification'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  
  const { login, register, isLoading, forgotPassword, resendVerification } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    // Basic validation
    const newErrors: Record<string, string> = {};
    
    if (mode === 'forgot') {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    } else {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      
      if (mode !== 'verification' && !formData.password) {
        newErrors.password = 'Password is required';
      } else if (mode !== 'verification' && formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (mode !== 'verification' && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
      
      if (mode === 'register') {
        if (!formData.name) {
          newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        }
        
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (mode === 'login') {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          onSuccess?.();
        } else if (result.requiresVerification) {
          setMode('verification');
          setSuccessMessage(result.message || '');
        } else {
          setErrors({ submit: result.message || 'Login failed' });
        }
      } else if (mode === 'register') {
        const result = await register(formData.name, formData.email, formData.password);
        if (result.success) {
          setMode('verification');
          setSuccessMessage(result.message || 'Registration successful!');
        } else {
          setErrors({ submit: result.message || 'Registration failed' });
        }
      } else if (mode === 'forgot') {
        const result = await forgotPassword(formData.email);
        if (result.success) {
          setSuccessMessage(result.message);
        } else {
          setErrors({ submit: result.message });
        }
      }
    } catch (error) {
      setErrors({
        submit: 'An error occurred. Please try again.'
      });
    }
  };

  const handleResendVerification = async () => {
    if (!formData.email) return;
    
    try {
      const result = await resendVerification(formData.email);
      if (result.success) {
        setSuccessMessage(result.message);
      } else {
        setErrors({ submit: result.message });
      }
    } catch (error) {
      setErrors({ submit: 'Failed to resend verification email.' });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setSuccessMessage('');
  };

  const switchMode = (newMode: 'login' | 'register' | 'forgot') => {
    setMode(newMode);
    resetForm();
  };

  if (mode === 'verification') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center p-4 md:p-6">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Mail className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold">Check Your Email</CardTitle>
          <CardDescription className="text-sm md:text-base">
            We've sent a verification link to {formData.email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6">
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <p className="text-sm text-green-600">{successMessage}</p>
              </div>
            </div>
          )}
          
          <div className="text-center space-y-3 md:space-y-4">
            <p className="text-xs md:text-sm text-muted-foreground">
              Please check your email and click the verification link to activate your account.
            </p>
            
            <div className="text-xs md:text-sm text-muted-foreground/70">
              <p>Didn't receive the email?</p>
              <p>Check your spam folder or</p>
            </div>
            
            <Button
              variant="outline"
              onClick={handleResendVerification}
              disabled={isLoading}
              className="w-full text-sm md:text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Resending...
                </>
              ) : (
                'Resend Verification Email'
              )}
            </Button>
            
            <Button
              variant="link"
              onClick={() => switchMode('login')}
              className="w-full text-primary hover:text-primary/80 text-sm md:text-base"
            >
              Back to Sign In
            </Button>
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center p-4 md:p-6">
        <CardTitle className="text-xl md:text-2xl font-bold">
          {mode === 'login' && 'Welcome Back'}
          {mode === 'register' && 'Create Account'}
          {mode === 'forgot' && 'Reset Password'}
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          {mode === 'login' && 'Sign in to your Shoply account'}
          {mode === 'register' && 'Join Shoply and start shopping'}
          {mode === 'forgot' && 'Enter your email to reset your password'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          {mode === 'register' && (
            <div>
              <Label htmlFor="name" className="text-sm md:text-base">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-10 text-sm md:text-base"
                />
              </div>
              {errors.name && (
                <p className="text-xs md:text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-sm md:text-base">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10 text-sm md:text-base"
              />
            </div>
            {errors.email && (
              <p className="text-xs md:text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {mode !== 'forgot' && (
            <div>
              <Label htmlFor="password" className="text-sm md:text-base">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 pr-10 text-sm md:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs md:text-sm text-red-500 mt-1">{errors.password}</p>
              )}
              {mode === 'register' && (
                <p className="text-xs text-gray-500 mt-1">
                  Must contain at least 8 characters with uppercase, lowercase, and number
                </p>
              )}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <Label htmlFor="confirmPassword" className="text-sm md:text-base">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-10 text-sm md:text-base"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs md:text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <p className="text-xs md:text-sm text-green-600">{successMessage}</p>
              </div>
            </div>
          )}

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                <p className="text-xs md:text-sm text-red-600">{errors.submit}</p>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-sm md:text-base"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {mode === 'login' && 'Signing In...'}
                {mode === 'register' && 'Creating Account...'}
                {mode === 'forgot' && 'Sending Reset Link...'}
              </>
            ) : (
              <>
                {mode === 'login' && 'Sign In'}
                {mode === 'register' && 'Create Account'}
                {mode === 'forgot' && 'Send Reset Link'}
              </>
            )}
          </Button>
        </form>

        <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
          {mode === 'login' && (
            <>
              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => switchMode('forgot')}
                  className="text-xs md:text-sm text-primary hover:text-primary/80"
                >
                  Forgot your password?
                </Button>
              </div>
              <div className="text-center">
                <p className="text-xs md:text-sm text-gray-600">
                  Don't have an account?
                </p>
                <Button
                  variant="link"
                  onClick={() => switchMode('register')}
                  className="text-primary hover:text-primary/80 text-sm md:text-base"
                >
                  Create Account
                </Button>
              </div>
            </>
          )}

          {mode === 'register' && (
            <div className="text-center">
              <p className="text-xs md:text-sm text-gray-600">
                Already have an account?
              </p>
              <Button
                variant="link"
                onClick={() => switchMode('login')}
                className="text-primary hover:text-primary/80 text-sm md:text-base"
              >
                Sign In
              </Button>
            </div>
          )}

          {mode === 'forgot' && (
            <div className="text-center">
              <Button
                variant="link"
                onClick={() => switchMode('login')}
                className="text-primary hover:text-primary/80 text-sm md:text-base"
              >
                Back to Sign In
              </Button>
            </div>
          )}
        </div>

        {mode === 'register' && (
          <div className="mt-4 md:mt-6 text-xs text-muted-foreground text-center">
            By creating an account, you agree to our{' '}
            <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
