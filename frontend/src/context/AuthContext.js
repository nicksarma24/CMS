import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); // Load token from local storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // You might want to decode the token here to get user info if needed
      // For simplicity, we'll just set the user role based on what's in local storage
      const storedRole = localStorage.getItem('userRole');
      setUser({ role: storedRole });
    }
    setLoading(false);
  }, [token]);

  const login = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    setToken(token);
    setUser({ role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setToken(null);
    setUser(null);
  };

  const contextValue = {
    user,
    token,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
