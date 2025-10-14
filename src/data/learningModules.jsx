// Learning modules data for the Learning Portal
export const learningModules = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Learn the basics of React including components, props, and state management.',
    category: 'Frontend Development',
    difficulty: 'Beginner',
    duration: '2 hours',
    progress: 75,
    isCompleted: false,
    lessons: [
      {
        id: '1-1',
        title: 'Introduction to React',
        type: 'video',
        duration: '15 min',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        isCompleted: true
      },
      {
        id: '1-2',
        title: 'Components and JSX',
        type: 'video',
        duration: '20 min',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        isCompleted: true
      },
      {
        id: '1-3',
        title: 'Props and State',
        type: 'reading',
        duration: '25 min',
        content: 'Props are inputs to React components. They are passed down from parent components and are immutable...',
        isCompleted: false
      },
      {
        id: '1-4',
        title: 'Event Handling',
        type: 'video',
        duration: '18 min',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        isCompleted: false
      }
    ]
  },
  {
    id: '2',
    title: 'JavaScript ES6+ Features',
    description: 'Master modern JavaScript features including arrow functions, destructuring, and async/await.',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    duration: '3 hours',
    progress: 40,
    isCompleted: false,
    lessons: [
      {
        id: '2-1',
        title: 'Arrow Functions',
        type: 'video',
        duration: '12 min',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        isCompleted: true
      },
      {
        id: '2-2',
        title: 'Destructuring Assignment',
        type: 'reading',
        duration: '20 min',
        content: 'Destructuring allows you to unpack values from arrays or properties from objects into distinct variables...',
        isCompleted: true
      },
      {
        id: '2-3',
        title: 'Template Literals',
        type: 'video',
        duration: '10 min',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        isCompleted: false
      },
      {
        id: '2-4',
        title: 'Async/Await',
        type: 'video',
        duration: '25 min',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        isCompleted: false
      }
    ]
  },
  {
    id: '3',
    title: 'CSS Grid and Flexbox',
    description: 'Learn modern CSS layout techniques with Grid and Flexbox for responsive designs.',
    category: 'CSS',
    difficulty: 'Beginner',
    duration: '2.5 hours',
    progress: 100,
    isCompleted: true,
    lessons: [
      {
        id: '3-1',
        title: 'CSS Grid Basics',
        type: 'video',
        duration: '30 min',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        isCompleted: true
      },
      {
        id: '3-2',
        title: 'Flexbox Layout',
        type: 'video',
        duration: '25 min',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        isCompleted: true
      },
      {
        id: '3-3',
        title: 'Responsive Design Patterns',
        type: 'reading',
        duration: '35 min',
        content: 'Responsive design ensures your website looks great on all devices. Use media queries and flexible layouts...',
        isCompleted: true
      }
    ]
  },
  {
    id: '4',
    title: 'Node.js Backend Development',
    description: 'Build server-side applications with Node.js, Express, and MongoDB.',
    category: 'Backend Development',
    difficulty: 'Advanced',
    duration: '4 hours',
    progress: 20,
    isCompleted: false,
    lessons: [
      {
        id: '4-1',
        title: 'Node.js Introduction',
        type: 'video',
        duration: '20 min',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        isCompleted: true
      },
      {
        id: '4-2',
        title: 'Express.js Framework',
        type: 'video',
        duration: '35 min',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        isCompleted: false
      },
      {
        id: '4-3',
        title: 'Database Integration',
        type: 'reading',
        duration: '40 min',
        content: 'Learn how to connect Node.js applications to databases like MongoDB and MySQL...',
        isCompleted: false
      }
    ]
  }
];

export const categories = [
  'All',
  'Frontend Development',
  'JavaScript',
  'CSS',
  'Backend Development',
  'Data Structures',
  'Algorithms'
];

export const difficulties = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced'
];



