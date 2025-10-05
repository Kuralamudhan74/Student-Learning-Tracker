import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockStudents, mockSubmissions } from '../data/mockData.jsx';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState(mockStudents);
  const [submissions, setSubmissions] = useState(mockSubmissions);

  // Get student by ID
  const getStudentById = (id) => {
    return students.find(student => student.id === id);
  };

  // Get submissions by student ID
  const getSubmissionsByStudentId = (studentId) => {
    return submissions.filter(submission => submission.studentId === studentId);
  };

  // Get pending submissions (not reviewed)
  const getPendingSubmissions = () => {
    return submissions.filter(submission => !submission.reviewed);
  };

  // Add new submission
  const addSubmission = (studentId, submissionData) => {
    const newSubmission = {
      id: Date.now().toString(),
      studentId,
      studentName: getStudentById(studentId)?.name || 'Unknown',
      date: submissionData.date,
      text: submissionData.text,
      feedback: '',
      reviewed: false
    };
    
    setSubmissions(prev => [...prev, newSubmission]);
    
    // Update student's submissions array
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, submissions: [...student.submissions, newSubmission] }
        : student
    ));
    
    return newSubmission;
  };

  // Update submission feedback
  const updateSubmissionFeedback = (submissionId, feedback) => {
    setSubmissions(prev => prev.map(submission => 
      submission.id === submissionId 
        ? { ...submission, feedback, reviewed: true }
        : submission
    ));

    // Update in students array as well
    setStudents(prev => prev.map(student => ({
      ...student,
      submissions: student.submissions.map(submission =>
        submission.id === submissionId
          ? { ...submission, feedback, reviewed: true }
          : submission
      )
    })));
  };

  // Update student monthly goal
  const updateStudentGoal = (studentId, goal) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, monthlyGoal: goal }
        : student
    ));
  };

  // Calculate progress percentage for a student
  const calculateProgress = (studentId) => {
    const student = getStudentById(studentId);
    if (!student || !student.monthlyGoal) return 0;
    
    // Simple progress calculation based on submissions this month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlySubmissions = student.submissions.filter(submission => {
      const submissionDate = new Date(submission.date);
      return submissionDate.getMonth() === currentMonth && 
             submissionDate.getFullYear() === currentYear;
    });
    
    // Assume 20 submissions = 100% progress (adjustable)
    const targetSubmissions = 20;
    const progress = Math.min((monthlySubmissions.length / targetSubmissions) * 100, 100);
    
    return Math.round(progress);
  };

  const value = {
    students,
    submissions,
    getStudentById,
    getSubmissionsByStudentId,
    getPendingSubmissions,
    addSubmission,
    updateSubmissionFeedback,
    updateStudentGoal,
    calculateProgress
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
