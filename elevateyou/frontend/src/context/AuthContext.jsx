import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUserId = localStorage.getItem('userId');
    const savedUserName = localStorage.getItem('userName');
    if (savedToken && savedUserId) {
      setToken(savedToken);
      setUser({ id: savedUserId, name: savedUserName });
    }
    setLoading(false);
  }, []);

  const login = (newToken, userId, userName) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', userId);
    if(userName) localStorage.setItem('userName', userName);
    setToken(newToken);
    setUser({ id: userId, name: userName });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
