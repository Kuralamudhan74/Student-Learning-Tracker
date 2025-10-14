import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, Button, Modal, Textarea } from '../components/UI';
import AddStudentModal from '../components/AddStudentModal';
import './AdminStudentsPage.css';

const AdminStudentsPage = () => {
  const { students, updateStudentGoal, calculateProgress, refreshStudents } = useApp();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState('');

  // Refresh students when component mounts to get latest data
  useEffect(() => {
    refreshStudents();
  }, [refreshStudents]);

  const handleSetGoal = (student) => {
    setSelectedStudent(student);
    setNewGoal(student.monthlyGoal || '');
    setIsGoalModalOpen(true);
  };

  const handleSaveGoal = () => {
    if (selectedStudent && newGoal.trim()) {
      updateStudentGoal(selectedStudent.id, newGoal.trim());
      setIsGoalModalOpen(false);
      setSelectedStudent(null);
      setNewGoal('');
    }
  };

  return (
    <div className="admin-students">
      <div className="page-header">
        <div className="header-content">
          <div className="header-text">
            <h1>👥 Manage Students</h1>
            <p>View student progress and set monthly goals</p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsAddStudentModalOpen(true)}
            className="add-student-btn"
          >
            ➕ Add New Student
          </Button>
        </div>
      </div>

      <div className="students-grid">
        {students.map(student => {
          const progress = calculateProgress(student.id);
          const pendingSubmissions = student.submissions.filter(sub => !sub.reviewed);
          
          return (
            <Card key={student.id} className="student-card">
              <div className="student-header">
                <h3 className="student-name">{student.name}</h3>
                <span className={`pending-badge ${pendingSubmissions.length > 0 ? 'has-pending' : ''}`}>
                  {pendingSubmissions.length} pending
                </span>
              </div>
              
              <div className="student-info">
                <div className="info-item">
                  <strong>Email:</strong> {student.email}
                </div>
                <div className="info-item">
                  <strong>Total Submissions:</strong> {student.submissions.length}
                </div>
                <div className="info-item">
                  <strong>Reviewed:</strong> {student.submissions.filter(sub => sub.reviewed).length}
                </div>
              </div>
              
              <div className="student-goal-section">
                <h4>Monthly Goal:</h4>
                <p className="goal-text">
                  {student.monthlyGoal || 'No goal set yet'}
                </p>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => handleSetGoal(student)}
                >
                  {student.monthlyGoal ? 'Update Goal' : 'Set Goal'}
                </Button>
              </div>
              
              <div className="progress-section">
                <div className="progress-label">Progress: {Math.round(progress)}%</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
              
              <div className="student-actions">
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => window.location.href = `/admin/review?student=${student.id}`}
                >
                  Review Submissions
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Goal Setting Modal */}
      <Modal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        title={`Set Monthly Goal for ${selectedStudent?.name}`}
      >
        <div className="goal-modal-content">
          <Textarea
            label="Monthly Learning Goal"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Enter a specific, measurable learning goal for this student..."
            rows={4}
          />
          
          <div className="modal-actions">
            <Button
              variant="secondary"
              onClick={() => setIsGoalModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveGoal}
            >
              Save Goal
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={isAddStudentModalOpen}
        onClose={() => setIsAddStudentModalOpen(false)}
      />
    </div>
  );
};

export default AdminStudentsPage;
