"use client";

import { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the provider component
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 3. Check localStorage on initial load
  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // 4. Login function
  const login = (username, password) => {
    if (
      username === 'oldstudent' &&
      password === 'behappy'
    ) {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      return true; // Login successful
    }
    return false; // Login failed
  };

  // 5. Logout function
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 6. Create a custom hook for easy access
export const useAuth = () => {
  return useContext(AuthContext);
};