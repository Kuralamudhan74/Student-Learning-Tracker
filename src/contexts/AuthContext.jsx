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

    // Check students from localStorage (includes both mock and newly added students)
    const allStudents = getAllStudents();
    const student = allStudents.find(s => s.email === email && s.password === password);
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

  const addStudent = (studentData) => {
    // Get existing students from localStorage or use mock data
    const existingStudents = JSON.parse(localStorage.getItem('students') || JSON.stringify(mockStudents));
    
    // Create new student with unique ID
    const newStudent = {
      id: Date.now().toString(),
      name: studentData.name,
      email: studentData.email,
      password: studentData.password,
      role: 'student',
      monthlyGoal: '',
      submissions: []
    };

    // Add to existing students
    const updatedStudents = [...existingStudents, newStudent];
    
    // Save to localStorage
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    
    return { success: true, student: newStudent };
  };

  const getAllStudents = () => {
    return JSON.parse(localStorage.getItem('students') || JSON.stringify(mockStudents));
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    addStudent,
    getAllStudents,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
