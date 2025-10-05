// Mock data for the Student Learning Tracker
export const mockStudents = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@student.com',
    password: 'password123',
    role: 'student',
    monthlyGoal: 'Complete 20 coding exercises and learn React hooks',
    submissions: [
      {
        id: '1',
        date: '2024-01-15',
        text: 'Learned about React useState and useEffect hooks. Built a simple counter component.',
        feedback: 'Great work! Keep practicing with more complex state management.',
        reviewed: true
      },
      {
        id: '2',
        date: '2024-01-16',
        text: 'Studied React Context API and created a theme provider.',
        feedback: '',
        reviewed: false
      }
    ]
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@student.com',
    password: 'password123',
    role: 'student',
    monthlyGoal: 'Master JavaScript ES6 features and complete 15 projects',
    submissions: [
      {
        id: '3',
        date: '2024-01-15',
        text: 'Practiced destructuring, arrow functions, and template literals.',
        feedback: 'Excellent understanding of ES6 basics!',
        reviewed: true
      },
      {
        id: '4',
        date: '2024-01-16',
        text: 'Built a todo app using modern JavaScript features.',
        feedback: '',
        reviewed: false
      }
    ]
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@student.com',
    password: 'password123',
    role: 'student',
    monthlyGoal: 'Learn CSS Grid and Flexbox, create 10 responsive layouts',
    submissions: [
      {
        id: '5',
        date: '2024-01-15',
        text: 'Mastered CSS Grid basics and created a simple grid layout.',
        feedback: 'Good progress! Try more complex grid patterns next.',
        reviewed: true
      }
    ]
  }
];

export const mockAdmin = {
  id: 'admin1',
  name: 'Admin User',
  email: 'admin@school.com',
  password: 'admin123',
  role: 'admin'
};

export const mockSubmissions = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Alice Johnson',
    date: '2024-01-15',
    text: 'Learned about React useState and useEffect hooks. Built a simple counter component.',
    feedback: 'Great work! Keep practicing with more complex state management.',
    reviewed: true
  },
  {
    id: '2',
    studentId: '1',
    studentName: 'Alice Johnson',
    date: '2024-01-16',
    text: 'Studied React Context API and created a theme provider.',
    feedback: '',
    reviewed: false
  },
  {
    id: '3',
    studentId: '2',
    studentName: 'Bob Smith',
    date: '2024-01-15',
    text: 'Practiced destructuring, arrow functions, and template literals.',
    feedback: 'Excellent understanding of ES6 basics!',
    reviewed: true
  },
  {
    id: '4',
    studentId: '2',
    studentName: 'Bob Smith',
    date: '2024-01-16',
    text: 'Built a todo app using modern JavaScript features.',
    feedback: '',
    reviewed: false
  },
  {
    id: '5',
    studentId: '3',
    studentName: 'Carol Davis',
    date: '2024-01-15',
    text: 'Mastered CSS Grid basics and created a simple grid layout.',
    feedback: 'Good progress! Try more complex grid patterns next.',
    reviewed: true
  }
];
