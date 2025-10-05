import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { Card, Button, Textarea, Alert } from '../components/UI';
import './DailyLearningForm.css';

const DailyLearningForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    text: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const { addSubmission } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.text.trim()) {
      setError('Please describe what you learned today');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addSubmission(user.id, formData);
      
      setSuccess('Your daily learning submission has been recorded successfully!');
      setFormData({
        date: new Date().toISOString().split('T')[0],
        text: ''
      });
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/student/dashboard');
      }, 2000);
      
    } catch (err) {
      setError('An error occurred while submitting your form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="daily-form-page">
      <div className="form-container">
        <Card className="form-card">
          <div className="form-header">
            <h1>📝 Daily Learning Form</h1>
            <p>Share what you learned today and track your progress</p>
          </div>

          {error && (
            <Alert type="error" onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert type="success" onClose={() => setSuccess('')}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="learning-form">
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                📅 Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <Textarea
              label="📚 What did you learn today?"
              name="text"
              value={formData.text}
              onChange={handleChange}
              placeholder="Describe what you learned, practiced, or discovered today. Be specific about concepts, skills, or projects you worked on..."
              rows={8}
              required
            />

            <div className="form-actions">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/student/dashboard')}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="large"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Learning'}
              </Button>
            </div>
          </form>

          <div className="form-tips">
            <h3>💡 Tips for better submissions:</h3>
            <ul>
              <li>Be specific about what you learned</li>
              <li>Include any challenges you faced</li>
              <li>Mention resources or tools you used</li>
              <li>Reflect on how this connects to your goals</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DailyLearningForm;
