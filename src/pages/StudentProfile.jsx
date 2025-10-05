import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { Card, ProgressBar, Button } from '../components/UI';
import './StudentProfile.css';

const StudentProfile = () => {
  const { user, updateUser } = useAuth();
  const { getSubmissionsByStudentId, calculateProgress } = useApp();
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState(user.monthlyGoal || '');

  const submissions = getSubmissionsByStudentId(user.id);
  const progress = calculateProgress(user.id);
  const reviewedSubmissions = submissions.filter(sub => sub.reviewed);
  const pendingSubmissions = submissions.filter(sub => !sub.reviewed);

  const handleGoalUpdate = () => {
    if (newGoal.trim()) {
      updateUser({ ...user, monthlyGoal: newGoal.trim() });
      setIsEditingGoal(false);
    }
  };

  return (
    <div className="student-profile">
      <div className="profile-header">
        <h1>👤 Student Profile</h1>
        <p>View your learning journey and progress</p>
      </div>

      <div className="profile-grid">
        {/* Profile Info */}
        <Card className="profile-info-card">
          <h2 className="card-title">📋 Profile Information</h2>
          <div className="profile-details">
            <div className="detail-item">
              <strong>Name:</strong> {user.name}
            </div>
            <div className="detail-item">
              <strong>Email:</strong> {user.email}
            </div>
            <div className="detail-item">
              <strong>Role:</strong> Student
            </div>
            <div className="detail-item">
              <strong>Total Submissions:</strong> {submissions.length}
            </div>
          </div>
        </Card>

        {/* Monthly Goal */}
        <Card className="goal-card">
          <div className="goal-header">
            <h2 className="card-title">🎯 Monthly Goal</h2>
            <Button
              variant="secondary"
              size="small"
              onClick={() => setIsEditingGoal(!isEditingGoal)}
            >
              {isEditingGoal ? 'Cancel' : 'Edit'}
            </Button>
          </div>
          
          {isEditingGoal ? (
            <div className="goal-edit">
              <textarea
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="goal-textarea"
                rows={3}
                placeholder="Enter your monthly learning goal..."
              />
              <div className="goal-actions">
                <Button
                  variant="primary"
                  size="small"
                  onClick={handleGoalUpdate}
                >
                  Save Goal
                </Button>
              </div>
            </div>
          ) : (
            <div className="goal-display">
              <p className="goal-text">{user.monthlyGoal || 'No goal set yet'}</p>
              <ProgressBar 
                progress={progress} 
                label="Progress this month"
              />
            </div>
          )}
        </Card>

        {/* Progress Stats */}
        <Card className="stats-card">
          <h2 className="card-title">📊 Progress Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{submissions.length}</div>
              <div className="stat-label">Total Submissions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{reviewedSubmissions.length}</div>
              <div className="stat-label">Reviewed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{pendingSubmissions.length}</div>
              <div className="stat-label">Pending Review</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{Math.round(progress)}%</div>
              <div className="stat-label">Goal Progress</div>
            </div>
          </div>
        </Card>

        {/* Submission History */}
        <Card className="submissions-card">
          <h2 className="card-title">📝 Submission History</h2>
          {submissions.length > 0 ? (
            <div className="submissions-list">
              {submissions
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(submission => (
                <div key={submission.id} className="submission-item">
                  <div className="submission-header">
                    <span className="submission-date">
                      {new Date(submission.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className={`submission-status ${submission.reviewed ? 'reviewed' : 'pending'}`}>
                      {submission.reviewed ? '✓ Reviewed' : '⏳ Pending'}
                    </span>
                  </div>
                  
                  <div className="submission-content">
                    <p className="submission-text">{submission.text}</p>
                    
                    {submission.feedback && (
                      <div className="feedback-section">
                        <div className="feedback-header">
                          <strong>💬 Admin Feedback:</strong>
                        </div>
                        <p className="feedback-text">{submission.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-submissions">
              <p>No submissions yet. Start your learning journey!</p>
              <Button
                variant="primary"
                onClick={() => window.location.href = '/student/form'}
              >
                Submit First Learning
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;
