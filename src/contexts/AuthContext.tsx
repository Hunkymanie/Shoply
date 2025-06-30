'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  emailVerified: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; requiresVerification?: boolean }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string; requiresVerification?: boolean }>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (token: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  verifyEmail: (token: string) => Promise<{ success: boolean; message: string }>;
  resendVerification: (email: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('shoply_user');
      const loginTime = localStorage.getItem('shoply_login_time');
      
      if (savedUser && loginTime) {
        try {
          const userData = JSON.parse(savedUser);
          const loginTimestamp = parseInt(loginTime);
          const now = Date.now();
          const sessionDuration = 7 * 24 * 60 * 60 * 1000; // 7 days
          
          // Check if session is still valid
          if (now - loginTimestamp < sessionDuration) {
            setUser(userData);
          } else {
            // Session expired, clear data
            localStorage.removeItem('shoply_user');
            localStorage.removeItem('shoply_login_time');
          }
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('shoply_user');
          localStorage.removeItem('shoply_login_time');
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string; requiresVerification?: boolean }> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Check if user exists in "database" (localStorage simulation)
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return { success: false, message: 'Authentication not available on server.' };
      }
      
      const users = JSON.parse(localStorage.getItem('shoply_users') || '[]');
      const existingUser = users.find((u: any) => u.email === email);
      
      if (!existingUser) {
        setIsLoading(false);
        return { success: false, message: 'No account found with this email address.' };
      }
      
      // Simple password check (in real app, this would be hashed)
      if (existingUser.password !== password) {
        setIsLoading(false);
        return { success: false, message: 'Invalid password. Please try again.' };
      }
      
      // Check if email is verified
      if (!existingUser.emailVerified) {
        setIsLoading(false);
        return { 
          success: false, 
          message: 'Please verify your email address before signing in.',
          requiresVerification: true 
        };
      }
      
      const userData: User = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        emailVerified: existingUser.emailVerified,
        createdAt: existingUser.createdAt
      };
      
      setUser(userData);
      localStorage.setItem('shoply_user', JSON.stringify(userData));
      localStorage.setItem('shoply_login_time', Date.now().toString());
      setIsLoading(false);
      return { success: true };
      
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: 'An error occurred. Please try again.' };
    }
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; message?: string; requiresVerification?: boolean }> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return { success: false, message: 'Registration not available on server.' };
      }
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('shoply_users') || '[]');
      const existingUser = users.find((u: any) => u.email === email);
      
      if (existingUser) {
        setIsLoading(false);
        return { success: false, message: 'An account with this email already exists.' };
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password, // In real app, this would be hashed
        phone: '',
        emailVerified: false,
        createdAt: new Date().toISOString(),
        verificationToken: Math.random().toString(36).substring(2, 15)
      };
      
      users.push(newUser);
      localStorage.setItem('shoply_users', JSON.stringify(users));
      
      // Store verification token for demo
      localStorage.setItem(`verification_${email}`, newUser.verificationToken);
      
      setIsLoading(false);
      return { 
        success: true, 
        message: 'Account created successfully! Please check your email to verify your account.',
        requiresVerification: true 
      };
      
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: 'An error occurred. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('shoply_user');
      localStorage.removeItem('shoply_login_time');
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('shoply_user', JSON.stringify(updatedUser));
      
      // Update in users array too
      const users = JSON.parse(localStorage.getItem('shoply_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userData };
        localStorage.setItem('shoply_users', JSON.stringify(users));
      }
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const users = JSON.parse(localStorage.getItem('shoply_users') || '[]');
      const existingUser = users.find((u: any) => u.email === email);
      
      if (!existingUser) {
        return { success: false, message: 'No account found with this email address.' };
      }
      
      // Generate reset token
      const resetToken = Math.random().toString(36).substring(2, 15);
      localStorage.setItem(`reset_${email}`, resetToken);
      
      // In a real app, this would send an email
      console.log(`
🔗 PASSWORD RESET LINK (Click to reset):
${window.location.origin}/reset-password?token=${resetToken}&email=${email}

📧 This would normally be sent to: ${email}
`);
      
      return { 
        success: true, 
        message: 'Password reset instructions have been sent to your email address.' 
      };
      
    } catch (error) {
      return { success: false, message: 'An error occurred. Please try again.' };
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Find user by reset token
      const resetEntries = Object.keys(localStorage).filter(key => key.startsWith('reset_'));
      let userEmail = '';
      
      for (const entry of resetEntries) {
        if (localStorage.getItem(entry) === token) {
          userEmail = entry.replace('reset_', '');
          break;
        }
      }
      
      if (!userEmail) {
        return { success: false, message: 'Invalid or expired reset token.' };
      }
      
      // Update password
      const users = JSON.parse(localStorage.getItem('shoply_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.email === userEmail);
      
      if (userIndex === -1) {
        return { success: false, message: 'User not found.' };
      }
      
      users[userIndex].password = newPassword;
      localStorage.setItem('shoply_users', JSON.stringify(users));
      localStorage.removeItem(`reset_${userEmail}`);
      
      return { success: true, message: 'Password updated successfully! You can now sign in.' };
      
    } catch (error) {
      return { success: false, message: 'An error occurred. Please try again.' };
    }
  };

  const verifyEmail = async (token: string): Promise<{ success: boolean; message: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Find user by verification token
      const verificationEntries = Object.keys(localStorage).filter(key => key.startsWith('verification_'));
      let userEmail = '';
      
      for (const entry of verificationEntries) {
        if (localStorage.getItem(entry) === token) {
          userEmail = entry.replace('verification_', '');
          break;
        }
      }
      
      if (!userEmail) {
        return { success: false, message: 'Invalid or expired verification token.' };
      }
      
      // Update user verification status
      const users = JSON.parse(localStorage.getItem('shoply_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.email === userEmail);
      
      if (userIndex === -1) {
        return { success: false, message: 'User not found.' };
      }
      
      users[userIndex].emailVerified = true;
      localStorage.setItem('shoply_users', JSON.stringify(users));
      localStorage.removeItem(`verification_${userEmail}`);
      
      return { success: true, message: 'Email verified successfully! You can now sign in.' };
      
    } catch (error) {
      return { success: false, message: 'An error occurred. Please try again.' };
    }
  };

  const resendVerification = async (email: string): Promise<{ success: boolean; message: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const users = JSON.parse(localStorage.getItem('shoply_users') || '[]');
      const existingUser = users.find((u: any) => u.email === email);
      
      if (!existingUser) {
        return { success: false, message: 'No account found with this email address.' };
      }
      
      if (existingUser.emailVerified) {
        return { success: false, message: 'This email is already verified.' };
      }
      
      // Generate new verification token
      const verificationToken = Math.random().toString(36).substring(2, 15);
      localStorage.setItem(`verification_${email}`, verificationToken);
      
      // In a real app, this would send an email
      console.log(`
🔗 NEW VERIFICATION LINK (Click to verify):
${window.location.origin}/verify-email?token=${verificationToken}&email=${email}

📧 This would normally be sent to: ${email}
`);
      
      return { 
        success: true, 
        message: 'Verification email sent! Please check your inbox.' 
      };
      
    } catch (error) {
      return { success: false, message: 'An error occurred. Please try again.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        forgotPassword,
        resetPassword,
        verifyEmail,
        resendVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
