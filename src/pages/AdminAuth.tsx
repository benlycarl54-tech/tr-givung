import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, Lock } from 'lucide-react';
import { toast } from 'sonner';

const ADMIN_KEY = 'cbladmin@dollarkpofunz';
const AUTH_STORAGE_KEY = 'admin_authenticated';

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

export function setAdminAuthenticated(): void {
  sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
}

interface Props {
  children: React.ReactNode;
}

export default function AdminAuth({ children }: Props) {
  const [authenticated, setAuthenticated] = useState(isAdminAuthenticated());
  const [key, setKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === ADMIN_KEY) {
      setAdminAuthenticated();
      setAuthenticated(true);
      toast.success('Access granted');
    } else {
      toast.error('Invalid admin key');
    }
  };

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Admin Access</h1>
          <p className="text-gray-500 text-sm mt-1">Enter admin key to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="password"
              value={key}
              onChange={e => setKey(e.target.value)}
              placeholder="Enter admin key..."
              className="pl-10"
              autoFocus
            />
          </div>
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5">
            Unlock Admin Panel
          </Button>
        </form>
      </div>
    </div>
  );
}
