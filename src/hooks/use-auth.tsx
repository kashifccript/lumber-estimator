'use client';
import { useState, useEffect } from 'react';
import { User } from '@/types/auth';
import { getUserData, getAuthToken, setAuthToken, setUserData, logoutUser } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth on mount
    const token = getAuthToken();
    const userData = getUserData();
    
    if (token && userData) {
      setUser(userData);
    }
    
    setIsLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    setAuthToken(token);
    setUserData(userData);
    setUser(userData);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const isAuthenticated = !!user && !!getAuthToken();

  return { 
    user, 
    isAuthenticated, 
    isLoading, 
    login, 
    logout 
  };
}
