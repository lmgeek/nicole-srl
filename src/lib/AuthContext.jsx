import React, { createContext, useState, useContext, useCallback } from 'react';

const AuthContext = createContext();

const clearStoredTokens = () => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  ['access_token', 'token'].forEach((k) =>
    window.localStorage.removeItem(k)
  );
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null);

  const checkAppState = useCallback(async () => {
    setAuthError(null);
  }, []);

  const checkUserAuth = useCallback(async () => {
    if (typeof window !== 'undefined') {
      const mockUser = localStorage.getItem('mock_admin_user');
      if (mockUser) {
        try {
          const userData = JSON.parse(mockUser);
          setUser(userData);
          setIsAuthenticated(true);
          return;
        } catch (e) {
          localStorage.removeItem('mock_admin_user');
          localStorage.removeItem('mock_admin_logged_in');
        }
      }
    }
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const login = useCallback((username, password) => {
    if (username === 'admin' && password === 'Nicol3123!Admin') {
      const userData = { id: 1, username: 'admin', role: 'admin' };
      setUser(userData);
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('mock_admin_logged_in', 'true');
        localStorage.setItem('mock_admin_user', JSON.stringify(userData));
      }
      return true;
    }
    return false;
  }, []);

  const logout = useCallback((shouldRedirect = true) => {
    setUser(null);
    setIsAuthenticated(false);
    clearStoredTokens();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mock_admin_logged_in');
      localStorage.removeItem('mock_admin_user');
    }
    if (shouldRedirect && typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }, []);

  const navigateToLogin = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth: false,
      isLoadingPublicSettings: false,
      authError,
      appPublicSettings: null,
      authChecked: true,
      login,
      logout,
      navigateToLogin,
      checkUserAuth,
      checkAppState
    }}>
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
