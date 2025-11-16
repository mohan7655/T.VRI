"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on load
  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      const { timestamp } = JSON.parse(authData);
      const threeHours = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
      const now = Date.now();

      if (now - timestamp < threeHours) {
        setIsAuthenticated(true);
      } else {
        // Expired, clear it
        localStorage.removeItem("authData");
      }
    }
  }, []);

  const login = (username, password) => {
    if (username === "oldstudent" && password === "behappy") {
      const authData = {
        timestamp: Date.now(),
      };
      localStorage.setItem("authData", JSON.stringify(authData));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("authData");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
