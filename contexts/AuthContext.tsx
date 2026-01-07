import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role, AuthState } from '../types';
import { db } from '../services/mockDb';

interface AuthContextType extends AuthState {
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (email: string, role: Role) => {
    setIsLoading(true);
    try {
      // In a real app, verify password here
      let foundUser = await db.login(email);
      
      // Auto-register for demo if not found
      if (!foundUser) {
        foundUser = await db.register({ 
            email, 
            role, 
            name: email.split('@')[0], 
            interests: role === 'TESTER' ? [] : undefined 
        });
      }
      
      setUser(foundUser);
      localStorage.setItem('launchlens_user', JSON.stringify(foundUser));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      const newUser = await db.register(userData);
      setUser(newUser);
      localStorage.setItem('launchlens_user', JSON.stringify(newUser));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    setIsLoading(true);
    try {
      const updatedUser = await db.updateUser(user.id, data);
      setUser(updatedUser);
      localStorage.setItem('launchlens_user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('launchlens_user');
  };

  useEffect(() => {
    const stored = localStorage.getItem('launchlens_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem('launchlens_user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};