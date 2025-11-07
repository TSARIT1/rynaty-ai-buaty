import React, { useState } from 'react';
import { FiEdit2, FiCheck, FiTrash2 } from 'react-icons/fi';
import CodeBlock from './CodeBlock';
import BulletPoints from './BulletPoints';
import TypingAnimation from './TypingAnimation';

const Message = ({ 
  message, 
  isEditing, 
  editContent, 
  onEditChange, 
  onSaveEdit, 
  onCancelEdit, 
  onStartEdit 
}) => {
  const formatMessageContent = (text) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]+?)\n```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index)
        });
      }

      parts.push({
        type: 'code',
        language: match[1] || 'javascript',
        content: match[2]
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex)
      });
    }

    return parts;
  };

  const renderMessageContent = (msg) => {
    const parts = formatMessageContent(msg.text);
    
    return parts.map((part, i) => {
      if (part.type === 'code') {
        return (
          <CodeBlock 
            key={i} 
            code={part.content} 
            language={part.language} 
          />
        );
      } else {
        return <BulletPoints key={i} text={part.content} />;
      }
    });
  };

  return (
    <div className={`message ${message.sender} ${message.isError ? 'error' : ''}`}>
      <div className="message-header">
        <span className="sender-name">
          {message.sender === 'user' ? 'Rynaty' : 'AI Assistant'}
        </span>
        <span className="message-time">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        {message.sender === 'user' && !isEditing && (
          <button 
            className="edit-message-button"
            onClick={() => onStartEdit(message)}
            title="Edit message"
          >
            <FiEdit2 size={14} />
          </button>
        )}
      </div>
      
      <div className="message-content">
        {isEditing ? (
          <div className="edit-message-container">
            <textarea
              value={editContent}
              onChange={(e) => onEditChange(e.target.value)}
              className="edit-message-textarea"
              autoFocus
            />
            <div className="edit-message-buttons">
              <button 
                onClick={() => onSaveEdit(message.id)}
                className="save-edit-button"
              >
                <FiCheck size={16} /> Save & Submit
              </button>
              <button 
                onClick={onCancelEdit}
                className="cancel-edit-button"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : message.sender === 'user' ? (
          renderMessageContent(message)
        ) : (
          <TypingAnimation 
            content={message.text} 
            onComplete={() => {}}
          />
        )}
      </div>
    </div>
  );
};

export default Message;