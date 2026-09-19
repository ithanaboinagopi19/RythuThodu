import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_FARMERS } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    return localStorage.getItem('agri_connect_role') || 'farmer';
  });

  const [user, setUserState] = useState(() => {
    const saved = localStorage.getItem('agri_connect_user');
    return saved ? JSON.parse(saved) : INITIAL_FARMERS[0];
  });

  const switchRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem('agri_connect_role', newRole);
  };

  const updateUserProfile = (profileData) => {
    const updated = { ...user, ...profileData };
    setUserState(updated);
    localStorage.setItem('agri_connect_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ role, switchRole, user, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
