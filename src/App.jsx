import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DailyLearningForm from './pages/DailyLearningForm';
import StudentProfile from './pages/StudentProfile';
import LearningPortal from './pages/LearningPortal';
import AdminStudentsPage from './pages/AdminStudentsPage';
import AdminReviewPage from './pages/AdminReviewPage';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

// Public Route Component (redirects if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  if (user) {
    // Redirect based on user role
    const redirectPath = user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

// Main App Routes Component
const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
           <LoginPage />
          </PublicRoute>
        } 
      />

      {/* Protected Student Routes */}
      <Route 
        path="/student/dashboard" 
        element={
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/student/profile" 
        element={
          <ProtectedRoute requiredRole="student">
            <StudentProfile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/student/form" 
        element={
          <ProtectedRoute requiredRole="student">
            <DailyLearningForm />
          </ProtectedRoute>
        } 
      />

      {/* Learning Portal Route - Available to both students and admin */}
      <Route 
        path="/learning-portal" 
        element={
          <ProtectedRoute>
            <LearningPortal />
          </ProtectedRoute>
        } 
      />

      {/* Protected Admin Routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/students" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminStudentsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/review" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminReviewPage />
          </ProtectedRoute>
        } 
      />

      {/* Default Route */}
      <Route 
        path="/" 
        element={
          user ? (
            <Navigate 
              to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} 
              replace 
            />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;