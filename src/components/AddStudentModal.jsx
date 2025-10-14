import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { Modal, Button, Input, Alert } from './UI';
import './AddStudentModal.css';

const AddStudentModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { addStudent } = useAuth();
  const { refreshStudents } = useApp();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess(false);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return 'Name is required';
    }
    if (!formData.email.trim()) {
      return 'Email is required';
    }
    if (!formData.email.includes('@')) {
      return 'Please enter a valid email address';
    }
    if (!formData.password) {
      return 'Password is required';
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        setLoading(false);
        return;
      }

      // Check if email already exists
      const existingStudents = JSON.parse(localStorage.getItem('students') || '[]');
      const emailExists = existingStudents.some(student => student.email === formData.email);
      
      if (emailExists) {
        setError('A student with this email already exists');
        setLoading(false);
        return;
      }

      // Add the student
      const result = addStudent({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password
      });

      if (result.success) {
        setSuccess(true);
        refreshStudents();
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });

        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 2000);
      }
    } catch (err) {
      setError('An error occurred while adding the student');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setError('');
      setSuccess(false);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Student"
      className="add-student-modal"
    >
      <div className="add-student-content">
        {success && (
          <Alert type="success" className="success-alert">
            ✅ Student added successfully! They can now login with their credentials.
          </Alert>
        )}

        {error && (
          <Alert type="error" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="add-student-form">
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student's full name"
            required
            disabled={loading}
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter student's email"
            required
            disabled={loading}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Set a password for the student"
            required
            disabled={loading}
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm the password"
            required
            disabled={loading}
          />

          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Adding Student...' : 'Add Student'}
            </Button>
          </div>
        </form>

        <div className="add-student-info">
          <h4>📝 Important Notes:</h4>
          <ul>
            <li>The student will be able to login immediately with these credentials</li>
            <li>You can set their monthly learning goal after adding them</li>
            <li>The password should be at least 6 characters long</li>
            <li>Make sure the email address is unique and valid</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default AddStudentModal;
