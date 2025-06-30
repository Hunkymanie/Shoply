'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthDebugPage() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('TestPassword123');
  const [name, setName] = useState('Test User');
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  
  const { user, isAuthenticated, isLoading, login, register, verifyEmail } = useAuth();

  const addDebugInfo = (info: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${info}`]);
  };

  const handleRegister = async () => {
    addDebugInfo('Starting registration...');
    try {
      const result = await register(name, email, password);
      addDebugInfo(`Registration result: ${JSON.stringify(result)}`);
      
      if (result.success) {
        addDebugInfo('Registration successful, checking localStorage...');
        const users = JSON.parse(localStorage.getItem('shoply_users') || '[]');
        addDebugInfo(`Users in localStorage: ${users.length}`);
        const user = users.find((u: { email: string }) => u.email === email);
        addDebugInfo(`Created user: ${JSON.stringify(user)}`);
      }
    } catch (error) {
      addDebugInfo(`Registration error: ${error}`);
    }
  };

  const handleVerifyEmail = async () => {
    addDebugInfo('Starting email verification...');
    try {
      // Get the verification token from localStorage
      const token = localStorage.getItem(`verification_${email}`);
      addDebugInfo(`Verification token: ${token}`);
      
      if (token) {
        const result = await verifyEmail(token);
        addDebugInfo(`Verification result: ${JSON.stringify(result)}`);
        
        if (result.success) {
          addDebugInfo('Email verified successfully!');
          const users = JSON.parse(localStorage.getItem('shoply_users') || '[]');
          const user = users.find((u: { email: string }) => u.email === email);
          addDebugInfo(`User after verification: ${JSON.stringify(user)}`);
        }
      } else {
        addDebugInfo('No verification token found');
      }
    } catch (error) {
      addDebugInfo(`Verification error: ${error}`);
    }
  };

  const handleLogin = async () => {
    addDebugInfo('Starting login...');
    try {
      const result = await login(email, password);
      addDebugInfo(`Login result: ${JSON.stringify(result)}`);
      
      if (result.success) {
        addDebugInfo('Login successful!');
        addDebugInfo(`Current user state: ${JSON.stringify(user)}`);
        addDebugInfo(`Is authenticated: ${isAuthenticated}`);
      }
    } catch (error) {
      addDebugInfo(`Login error: ${error}`);
    }
  };

  const clearDebug = () => {
    setDebugInfo([]);
  };

  const clearStorage = () => {
    localStorage.removeItem('shoply_users');
    localStorage.removeItem('shoply_user');
    localStorage.removeItem('shoply_login_time');
    localStorage.removeItem(`verification_${email}`);
    addDebugInfo('Cleared all localStorage data');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication Debug</h1>
            <p className="text-gray-600">Debug authentication flow step by step</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test Data</CardTitle>
                  <CardDescription>Modify test user data</CardDescription>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current State</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Is Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
                  <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
                  <p><strong>Current User:</strong> {user ? user.name : 'None'}</p>
                  <p><strong>User Email:</strong> {user ? user.email : 'None'}</p>
                  <p><strong>Email Verified:</strong> {user ? (user.emailVerified ? 'Yes' : 'No') : 'N/A'}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Test Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={handleRegister} className="w-full">
                    1. Register User
                  </Button>
                  <Button onClick={handleVerifyEmail} className="w-full" variant="outline">
                    2. Verify Email
                  </Button>
                  <Button onClick={handleLogin} className="w-full">
                    3. Login User
                  </Button>
                  <div className="flex gap-2">
                    <Button onClick={clearDebug} variant="outline" className="flex-1">
                      Clear Debug
                    </Button>
                    <Button onClick={clearStorage} variant="destructive" className="flex-1">
                      Clear Storage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Debug Output */}
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Debug Output</CardTitle>
                  <CardDescription>Real-time debugging information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-black text-green-400 p-4 rounded-lg h-96 overflow-y-auto font-mono text-sm">
                    {debugInfo.length === 0 ? (
                      <p className="text-gray-400">No debug information yet. Start by registering a user.</p>
                    ) : (
                      debugInfo.map((info, index) => (
                        <div key={index} className="mb-1">
                          {info}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
