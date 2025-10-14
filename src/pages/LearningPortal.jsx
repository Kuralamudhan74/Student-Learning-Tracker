import React, { useState } from 'react';
import { Card, Button } from '../components/UI';
import { learningModules, categories, difficulties } from '../data/learningModules';
import './LearningPortal.css';

const LearningPortal = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter modules based on selected filters
  const filteredModules = learningModules.filter(module => {
    const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || module.difficulty === selectedDifficulty;
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return '#10b981';
    if (progress >= 50) return '#f59e0b';
    return '#6b7280';
  };

  return (
    <div className="learning-portal">
      <div className="portal-header">
        <h1>📚 Learning Portal</h1>
        <p>Explore our comprehensive collection of learning modules and videos</p>
      </div>

      {/* Filters */}
      <Card className="filters-card">
        <div className="filters-container">
          <div className="filter-group">
            <label>Search:</label>
            <input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Difficulty:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="filter-select"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Modules Grid */}
      <div className="modules-grid">
        {filteredModules.map(module => (
          <Card key={module.id} className="module-card">
            <div className="module-header">
              <div className="module-title-section">
                <h3 className="module-title">{module.title}</h3>
                <div className="module-meta">
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(module.difficulty) }}
                  >
                    {module.difficulty}
                  </span>
                  <span className="duration">{module.duration}</span>
                </div>
              </div>
              <div className="module-category">{module.category}</div>
            </div>

            <p className="module-description">{module.description}</p>

            <div className="module-progress">
              <div className="progress-header">
                <span>Progress</span>
                <span 
                  className="progress-percentage"
                  style={{ color: getProgressColor(module.progress) }}
                >
                  {module.progress}%
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${module.progress}%`,
                    backgroundColor: getProgressColor(module.progress)
                  }}
                />
              </div>
            </div>

            <div className="module-lessons">
              <h4>Lessons ({module.lessons.length})</h4>
              <div className="lessons-list">
                {module.lessons.slice(0, 3).map(lesson => (
                  <div key={lesson.id} className="lesson-item">
                    <div className="lesson-info">
                      <span className={`lesson-type ${lesson.type}`}>
                        {lesson.type === 'video' ? '🎥' : '📖'}
                      </span>
                      <span className="lesson-title">{lesson.title}</span>
                    </div>
                    <div className="lesson-meta">
                      <span className="lesson-duration">{lesson.duration}</span>
                      {lesson.isCompleted && <span className="completed">✓</span>}
                    </div>
                  </div>
                ))}
                {module.lessons.length > 3 && (
                  <div className="more-lessons">
                    +{module.lessons.length - 3} more lessons
                  </div>
                )}
              </div>
            </div>

            <div className="module-actions">
              <Button
                variant="primary"
                size="medium"
                onClick={() => {
                  // In a real app, this would navigate to the module detail page
                  alert(`Opening ${module.title} module...`);
                }}
              >
                {module.isCompleted ? 'Review Module' : 'Start Learning'}
              </Button>
              <Button
                variant="secondary"
                size="medium"
                onClick={() => {
                  // In a real app, this would show module details
                  alert(`Showing details for ${module.title}...`);
                }}
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredModules.length === 0 && (
        <Card className="no-modules">
          <div className="no-modules-content">
            <h3>🔍 No modules found</h3>
            <p>Try adjusting your filters or search terms to find what you're looking for.</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LearningPortal;



