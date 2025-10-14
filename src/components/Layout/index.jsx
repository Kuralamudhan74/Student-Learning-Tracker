import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            📚 Skill Portal
          </Link>
          
          {user && (
            <nav className="nav">
              {user.role === 'admin' ? (
                <>
                  <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
                  <Link to="/admin/students" className="nav-link">Students</Link>
                  <Link to="/admin/review" className="nav-link">Review</Link>
                  <Link to="/learning-portal" className="nav-link">Learning Portal</Link>
                </>
              ) : (
                <>
                  <Link to="/student/dashboard" className="nav-link">Dashboard</Link>
                  <Link to="/student/profile" className="nav-link">Profile</Link>
                  <Link to="/student/form" className="nav-link">Daily Form</Link>
                  <Link to="/learning-portal" className="nav-link">Learning Portal</Link>
                </>
              )}
              
              <div className="user-info">
                <span className="user-name">Welcome, {user.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <p>&copy; 2025 Skill Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
