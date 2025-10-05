import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { Card, ProgressBar } from '../components/UI';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { calculateProgress, getSubmissionsByStudentId } = useApp();

  const progress = calculateProgress(user.id);
  const submissions = getSubmissionsByStudentId(user.id);
  const recentSubmissions = submissions.slice(-3).reverse();
  const pendingFeedback = submissions.filter(sub => !sub.reviewed);

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}! 👋</h1>
        <p>Track your learning progress and stay motivated</p>
      </div>

      <div className="dashboard-grid">
        {/* Monthly Goal Card */}
        <Card className="goal-card">
          <h2 className="card-title">📋 Monthly Goal</h2>
          <p className="goal-text">{user.monthlyGoal}</p>
          <ProgressBar 
            progress={progress} 
            label="Progress this month"
          />
        </Card>

        {/* Progress Stats */}
        <Card className="stats-card">
          <h2 className="card-title">📊 Your Stats</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{submissions.length}</div>
              <div className="stat-label">Total Submissions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{pendingFeedback.length}</div>
              <div className="stat-label">Pending Reviews</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{Math.round(progress)}%</div>
              <div className="stat-label">Goal Progress</div>
            </div>
          </div>
        </Card>

        {/* Recent Submissions */}
        <Card className="submissions-card">
          <h2 className="card-title">📝 Recent Submissions</h2>
          {recentSubmissions.length > 0 ? (
            <div className="submissions-list">
              {recentSubmissions.map(submission => (
                <div key={submission.id} className="submission-item">
                  <div className="submission-header">
                    <span className="submission-date">
                      {new Date(submission.date).toLocaleDateString()}
                    </span>
                    <span className={`submission-status ${submission.reviewed ? 'reviewed' : 'pending'}`}>
                      {submission.reviewed ? '✓ Reviewed' : '⏳ Pending'}
                    </span>
                  </div>
                  <p className="submission-text">
                    {submission.text.length > 100 
                      ? `${submission.text.substring(0, 100)}...` 
                      : submission.text
                    }
                  </p>
                  {submission.feedback && (
                    <div className="feedback-section">
                      <strong>Admin Feedback:</strong>
                      <p className="feedback-text">{submission.feedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-submissions">No submissions yet. Start your learning journey!</p>
          )}
        </Card>

        {/* Quick Actions */}
        <Card className="actions-card">
          <h2 className="card-title">🚀 Quick Actions</h2>
          <div className="action-buttons">
            <a href="/student/form" className="action-button primary">
              📝 Submit Daily Learning
            </a>
            <a href="/student/profile" className="action-button secondary">
              👤 View Profile
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
