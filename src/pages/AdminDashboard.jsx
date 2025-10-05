import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, ProgressBar } from '../components/UI';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { students, getPendingSubmissions, calculateProgress } = useApp();
  
  const pendingSubmissions = getPendingSubmissions();
  const totalStudents = students.length;
  const totalSubmissions = students.reduce((acc, student) => acc + student.submissions.length, 0);
  const reviewedSubmissions = students.reduce((acc, student) => 
    acc + student.submissions.filter(sub => sub.reviewed).length, 0
  );

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard 📊</h1>
        <p>Monitor student progress and manage learning goals</p>
      </div>

      <div className="dashboard-grid">
        {/* Overview Stats */}
        <Card className="overview-card">
          <h2 className="card-title">📈 Overview</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{totalStudents}</div>
              <div className="stat-label">Total Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{totalSubmissions}</div>
              <div className="stat-label">Total Submissions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{pendingSubmissions.length}</div>
              <div className="stat-label">Pending Reviews</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{reviewedSubmissions}</div>
              <div className="stat-label">Reviewed</div>
            </div>
          </div>
        </Card>

        {/* Students Overview */}
        <Card className="students-card">
          <h2 className="card-title">👥 Students Overview</h2>
          <div className="students-list">
            {students.map(student => {
              const progress = calculateProgress(student.id);
              const recentSubmissions = student.submissions.slice(-2);
              const pendingCount = student.submissions.filter(sub => !sub.reviewed).length;
              
              return (
                <div key={student.id} className="student-item">
                  <div className="student-header">
                    <h3 className="student-name">{student.name}</h3>
                    <span className={`pending-badge ${pendingCount > 0 ? 'has-pending' : ''}`}>
                      {pendingCount} pending
                    </span>
                  </div>
                  
                  <div className="student-progress">
                    <ProgressBar 
                      progress={progress} 
                      label="Monthly Progress"
                    />
                  </div>
                  
                  <div className="student-goal">
                    <strong>Goal:</strong> {student.monthlyGoal}
                  </div>
                  
                  <div className="student-stats">
                    <span>{student.submissions.length} submissions</span>
                    <span>{progress}% complete</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Pending Reviews */}
        <Card className="pending-card">
          <h2 className="card-title">⏳ Pending Reviews</h2>
          {pendingSubmissions.length > 0 ? (
            <div className="pending-list">
              {pendingSubmissions.slice(0, 5).map(submission => (
                <div key={submission.id} className="pending-item">
                  <div className="pending-header">
                    <span className="student-name">{submission.studentName}</span>
                    <span className="submission-date">
                      {new Date(submission.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="submission-preview">
                    {submission.text.length > 80 
                      ? `${submission.text.substring(0, 80)}...` 
                      : submission.text
                    }
                  </p>
                </div>
              ))}
              {pendingSubmissions.length > 5 && (
                <div className="more-pending">
                  +{pendingSubmissions.length - 5} more submissions pending review
                </div>
              )}
            </div>
          ) : (
            <p className="no-pending">🎉 All submissions have been reviewed!</p>
          )}
        </Card>

        {/* Quick Actions */}
        <Card className="actions-card">
          <h2 className="card-title">🚀 Quick Actions</h2>
          <div className="action-buttons">
            <a href="/admin/students" className="action-button primary">
              👥 Manage Students
            </a>
            <a href="/admin/review" className="action-button secondary">
              📝 Review Submissions
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
