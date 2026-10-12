'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface HistoryItem {
  id: string;
  description: string;
  points: number;
  date: string;
  type: 'earn' | 'redeem';
}

export interface User {
  name: string;
  childName: string;
  healthCenter: string;
  email: string;
  points: number;
  attendedControls: number;
  history: HistoryItem[];
}

interface RecompensasContextType {
  user: User | null;
  isLoggedIn: boolean;
  activeTab: string;
  showAuthModal: boolean;
  authMode: 'login' | 'register';
  setActiveTab: (tab: string) => void;
  setShowAuthModal: (show: boolean) => void;
  setAuthMode: (mode: 'login' | 'register') => void;
  login: (email: string, password: string) => boolean;
  register: (name: string, childName: string, healthCenter: string, email: string) => void;
  logout: () => void;
  redeemReward: (rewardName: string, points: number) => { success: boolean; code?: string; message: string };
  registerAttendance: () => void;
}

const defaultUser: User = {
  name: 'María Mendoza',
  childName: 'Carlitos (8 meses)',
  healthCenter: 'CS Aparicio Pomares',
  email: 'maria.huanuco@gmail.com',
  points: 2500,
  attendedControls: 3,
  history: [
    { id: '1', description: 'Bono de Bienvenida MiPequeCrece', points: 2500, date: 'Hoy', type: 'earn' },
  ],
};

const RecompensasContext = createContext<RecompensasContextType | null>(null);

export function RecompensasProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const login = (email: string, _password: string): boolean => {
    if (email === 'maria.huanuco@gmail.com') {
      setUser(defaultUser);
      setIsLoggedIn(true);
      setShowAuthModal(false);
      return true;
    }
    return false;
  };

  const register = (name: string, childName: string, healthCenter: string, _email: string) => {
    const newUser: User = {
      name,
      childName,
      healthCenter,
      email: _email,
      points: 2500,
      attendedControls: 0,
      history: [
        { id: Date.now().toString(), description: 'Bono de Bienvenida MiPequeCrece', points: 2500, date: 'Hoy', type: 'earn' },
      ],
    };
    setUser(newUser);
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab('dashboard');
  };

  const redeemReward = (rewardName: string, points: number): { success: boolean; code?: string; message: string } => {
    if (!user) return { success: false, message: 'Debes iniciar sesión.' };
    if (user.points < points) {
      return { success: false, message: `Te faltan ${(points - user.points).toLocaleString()} puntos para canjear este premio.` };
    }
    const code = `MPC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newHistory: HistoryItem = {
      id: Date.now().toString(),
      description: rewardName,
      points: -points,
      date: 'Hoy',
      type: 'redeem',
    };
    setUser(prev => prev ? { ...prev, points: prev.points - points, history: [newHistory, ...prev.history] } : prev);
    return { success: true, code, message: `¡Premio canjeado! Código de recojo: ${code}` };
  };

  const registerAttendance = () => {
    if (!user) return;
    const newHistory: HistoryItem = {
      id: Date.now().toString(),
      description: 'Control CRED Asistido',
      points: 500,
      date: 'Hoy',
      type: 'earn',
    };
    setUser(prev => prev ? {
      ...prev,
      points: prev.points + 500,
      attendedControls: prev.attendedControls + 1,
      history: [newHistory, ...prev.history],
    } : prev);
  };

  return (
    <RecompensasContext.Provider value={{
      user, isLoggedIn, activeTab, showAuthModal, authMode,
      setActiveTab, setShowAuthModal, setAuthMode,
      login, register, logout, redeemReward, registerAttendance,
    }}>
      {children}
    </RecompensasContext.Provider>
  );
}

export function useRecompensas() {
  const ctx = useContext(RecompensasContext);
  if (!ctx) throw new Error('useRecompensas must be used within RecompensasProvider');
  return ctx;
}
