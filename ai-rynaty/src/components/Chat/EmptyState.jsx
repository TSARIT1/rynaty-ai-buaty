import React from 'react';

const EmptyState = ({ onSuggestionClick }) => {
  const suggestions = [
    "Show me a React component example",
    "How to center a div in CSS?",
    "Explain closures in JavaScript"
  ];

  return (
    <div className="empty-state">
      <h2>How can I help you today?</h2>
      <p>Ask me anything or request code examples in any programming language.</p>
      <div className="suggestions">
        {suggestions.map((suggestion, index) => (
          <button key={index} onClick={() => onSuggestionClick(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;