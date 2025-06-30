'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

export default function QuickTestPage() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('TestPassword123');
  const [name, setName] = useState('Test User');
  const [message, setMessage] = useState('');
  
  const { user, isAuthenticated, login, register, logout } = useAuth();

  const handleQuickRegister = async () => {
    setMessage('Registering...');
    try {
      const result = await register(name, email, password);
      if (result.success) {
        setMessage('Registration successful! Now auto-verifying email...');
        
        // Auto-verify the email for testing
        if (typeof window !== 'undefined') {
          const users = JSON.parse(localStorage.getItem('shoply_users') || '[]');
          const userIndex = users.findIndex((u: any) => u.email === email);
          if (userIndex !== -1) {
            users[userIndex].emailVerified = true;
            localStorage.setItem('shoply_users', JSON.stringify(users));
            setMessage('Email auto-verified! Now logging in...');
            
            // Auto-login
            setTimeout(async () => {
              const loginResult = await login(email, password);
              if (loginResult.success) {
                setMessage('Successfully logged in!');
              } else {
                setMessage(`Login failed: ${loginResult.message}`);
              }
            }, 1000);
          }
        }
      } else {
        setMessage(`Registration failed: ${result.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  const handleQuickLogin = async () => {
    setMessage('Logging in...');
    try {
      const result = await login(email, password);
      if (result.success) {
        setMessage('Successfully logged in!');
      } else {
        setMessage(`Login failed: ${result.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  const handleLogout = () => {
    logout();
    setMessage('Logged out');
  };

  const clearStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('shoply_users');
      localStorage.removeItem('shoply_user');
      localStorage.removeItem('shoply_login_time');
      localStorage.removeItem(`verification_${email}`);
      setMessage('Storage cleared');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Quick Auth Test</CardTitle>
              <CardDescription>
                Test authentication without email verification step
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Button onClick={handleQuickRegister} className="w-full">
                  Register & Auto-Verify & Login
                </Button>
                <Button onClick={handleQuickLogin} variant="outline" className="w-full">
                  Login Only
                </Button>
                {isAuthenticated && (
                  <Button onClick={handleLogout} variant="destructive" className="w-full">
                    Logout
                  </Button>
                )}
                <Button onClick={clearStorage} variant="outline" className="w-full">
                  Clear Storage
                </Button>
              </div>

              {message && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-700">{message}</p>
                </div>
              )}

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Current Status:</h3>
                <p className="text-sm">Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
                <p className="text-sm">User: {user ? user.name : 'None'}</p>
                <p className="text-sm">Email: {user ? user.email : 'None'}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
