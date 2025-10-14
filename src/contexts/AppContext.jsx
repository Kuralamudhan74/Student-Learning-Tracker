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
  // Initialize students from localStorage or use mock data
  const getInitialStudents = () => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : mockStudents;
  };

  // Initialize submissions from localStorage or use mock data
  const getInitialSubmissions = () => {
    const savedSubmissions = localStorage.getItem('submissions');
    return savedSubmissions ? JSON.parse(savedSubmissions) : mockSubmissions;
  };

  const [students, setStudents] = useState(getInitialStudents);
  const [submissions, setSubmissions] = useState(getInitialSubmissions);

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
    
    // Update submissions state
    setSubmissions(prev => {
      const updatedSubmissions = [...prev, newSubmission];
      // Save to localStorage
      localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
      return updatedSubmissions;
    });
    
    // Update student's submissions array and save to localStorage
    setStudents(prev => {
      const updatedStudents = prev.map(student => 
        student.id === studentId 
          ? { ...student, submissions: [...student.submissions, newSubmission] }
          : student
      );
      // Save to localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      return updatedStudents;
    });
    
    return newSubmission;
  };

  // Update submission feedback
  const updateSubmissionFeedback = (submissionId, feedback) => {
    setSubmissions(prev => {
      const updatedSubmissions = prev.map(submission => 
        submission.id === submissionId 
          ? { ...submission, feedback, reviewed: true }
          : submission
      );
      // Save to localStorage
      localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
      return updatedSubmissions;
    });

    // Update in students array as well and save to localStorage
    setStudents(prev => {
      const updatedStudents = prev.map(student => ({
        ...student,
        submissions: student.submissions.map(submission =>
          submission.id === submissionId
            ? { ...submission, feedback, reviewed: true }
            : submission
        )
      }));
      // Save to localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      return updatedStudents;
    });
  };

  // Update student monthly goal
  const updateStudentGoal = (studentId, goal) => {
    setStudents(prev => {
      const updatedStudents = prev.map(student => 
        student.id === studentId 
          ? { ...student, monthlyGoal: goal }
          : student
      );
      // Save to localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      return updatedStudents;
    });
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

  // Refresh students and submissions from localStorage
  const refreshStudents = () => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
    
    const savedSubmissions = localStorage.getItem('submissions');
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  };

  // Add new student (called from AuthContext)
  const addNewStudent = (studentData) => {
    const newStudent = {
      id: Date.now().toString(),
      name: studentData.name,
      email: studentData.email,
      password: studentData.password,
      role: 'student',
      monthlyGoal: '',
      submissions: []
    };

    setStudents(prev => {
      const updatedStudents = [...prev, newStudent];
      // Save to localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      return updatedStudents;
    });
    
    return newStudent;
  };

  // Refresh submissions from localStorage
  const refreshSubmissions = () => {
    const savedSubmissions = localStorage.getItem('submissions');
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
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
    calculateProgress,
    refreshStudents,
    refreshSubmissions,
    addNewStudent
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
