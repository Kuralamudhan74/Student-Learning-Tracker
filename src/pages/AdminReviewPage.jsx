import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Card, Button, Textarea, Alert } from '../components/UI';
import './AdminReviewPage.css';

const AdminReviewPage = () => {
  const [searchParams] = useSearchParams();
  const { getPendingSubmissions, updateSubmissionFeedback, getStudentById, refreshSubmissions } = useApp();
  const [selectedStudentId, setSelectedStudentId] = useState(searchParams.get('student') || '');
  const [feedback, setFeedback] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Refresh submissions when component mounts to get latest data
  useEffect(() => {
    refreshSubmissions();
  }, [refreshSubmissions]);

  const pendingSubmissions = getPendingSubmissions();
  const filteredSubmissions = selectedStudentId 
    ? pendingSubmissions.filter(sub => sub.studentId === selectedStudentId)
    : pendingSubmissions;

  const handleSubmitFeedback = async (submissionId) => {
    if (!feedback.trim()) {
      setError('Please provide feedback before submitting');
      return;
    }

    try {
      updateSubmissionFeedback(submissionId, feedback.trim());
      setSuccess('Feedback submitted successfully!');
      setFeedback('');
      setError('');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to submit feedback');
    }
  };

  const handleStudentFilter = (studentId) => {
    setSelectedStudentId(studentId);
    setFeedback('');
    setError('');
    setSuccess('');
  };

  return (
    <div className="admin-review">
      <div className="page-header">
        <h1>📝 Review Submissions</h1>
        <p>Provide feedback on student learning submissions</p>
      </div>

      {success && (
        <Alert type="success" onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert type="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Filter Options */}
      <Card className="filter-card">
        <h3 className="filter-title">Filter by Student</h3>
        <div className="filter-options">
          <Button
            variant={selectedStudentId === '' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => handleStudentFilter('')}
          >
            All Students ({pendingSubmissions.length})
          </Button>
          {Array.from(new Set(pendingSubmissions.map(sub => sub.studentId))).map(studentId => {
            const student = getStudentById(studentId);
            const studentSubmissions = pendingSubmissions.filter(sub => sub.studentId === studentId);
            return (
              <Button
                key={studentId}
                variant={selectedStudentId === studentId ? 'primary' : 'secondary'}
                size="small"
                onClick={() => handleStudentFilter(studentId)}
              >
                {student?.name} ({studentSubmissions.length})
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Submissions List */}
      <div className="submissions-container">
        {filteredSubmissions.length > 0 ? (
          filteredSubmissions.map(submission => (
            <Card key={submission.id} className="submission-card">
              <div className="submission-header">
                <div className="student-info">
                  <h3 className="student-name">{submission.studentName}</h3>
                  <span className="submission-date">
                    {new Date(submission.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <span className="submission-status pending">
                  ⏳ Pending Review
                </span>
              </div>

              <div className="submission-content">
                <h4>What they learned:</h4>
                <div className="submission-text">
                  {submission.text}
                </div>
              </div>

              <div className="feedback-section">
                <h4>Your Feedback:</h4>
                <Textarea
                  placeholder="Provide constructive feedback on their learning..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                />
                
                <div className="feedback-actions">
                  <Button
                    variant="success"
                    onClick={() => handleSubmitFeedback(submission.id)}
                    disabled={!feedback.trim()}
                  >
                    Submit Feedback
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="no-submissions">
            <div className="no-submissions-content">
              <h3>🎉 No pending submissions!</h3>
              <p>
                {selectedStudentId 
                  ? `${getStudentById(selectedStudentId)?.name} has no pending submissions.`
                  : 'All submissions have been reviewed.'
                }
              </p>
              <Button
                variant="primary"
                onClick={() => window.location.href = '/admin/dashboard'}
              >
                Back to Dashboard
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminReviewPage;
