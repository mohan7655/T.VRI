"use client";


import LoginDialog from './LoginDialog';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // If not logged in, show the login dialog
    return <LoginDialog />;
  }

  // If logged in, show the page content
  return <>{children}</>;
}