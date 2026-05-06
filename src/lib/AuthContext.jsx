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
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const logout = useCallback((shouldRedirect = true) => {
    setUser(null);
    setIsAuthenticated(false);
    clearStoredTokens();
    if (shouldRedirect && typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }, []);

  const navigateToLogin = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
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
