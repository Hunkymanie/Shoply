'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

export function AuthStatus() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span>Auth Status:</span>
          <Badge variant={isAuthenticated ? "default" : "secondary"}>
            {isAuthenticated ? "Logged In" : "Not Logged In"}
          </Badge>
        </div>
        <div>Loading: {isLoading ? "Yes" : "No"}</div>
        <div>User: {user ? user.name : "None"}</div>
        <div>Email: {user ? user.email : "None"}</div>
        <div>Verified: {user ? (user.emailVerified ? "Yes" : "No") : "N/A"}</div>
      </div>
    </div>
  );
}
