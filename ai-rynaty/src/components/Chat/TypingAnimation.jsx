import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ content, speed = 5, onComplete }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!content || currentIndex >= content.length) {
      setIsTyping(false);
      if (onComplete) onComplete();
      return;
    }

    const timeoutId = setTimeout(() => {
      setDisplayedContent(prev => prev + content[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timeoutId);
  }, [currentIndex, content, speed, onComplete]);

  useEffect(() => {
    setDisplayedContent('');
    setCurrentIndex(0);
    setIsTyping(true);
  }, [content]);

  return (
    <>
      {displayedContent}
      {isTyping && <span className="typing-cursor">|</span>}
    </>
  );
};

export default TypingAnimation;