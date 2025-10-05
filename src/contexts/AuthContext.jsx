import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockStudents, mockAdmin } from '../data/mockData.jsx';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    // Check admin first
    if (email === mockAdmin.email && password === mockAdmin.password) {
      const adminUser = { ...mockAdmin };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      setLoading(false);
      return { success: true, user: adminUser };
    }

    // Check students
    const student = mockStudents.find(s => s.email === email && s.password === password);
    if (student) {
      const studentUser = { ...student };
      setUser(studentUser);
      localStorage.setItem('user', JSON.stringify(studentUser));
      setLoading(false);
      return { success: true, user: studentUser };
    }

    setLoading(false);
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
