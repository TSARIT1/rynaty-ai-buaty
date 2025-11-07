import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const ConversationItem = ({ 
  conversation, 
  isActive, 
  onSelect, 
  onDelete 
}) => {
  return (
    <div 
      className={`conversation-item ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(conversation.id)}
    >
      <div className="conversation-item-content">
        <h3>{conversation.title}</h3>
        <p>
          {conversation.messages.length > 0 
            ? conversation.messages[conversation.messages.length - 1].text.slice(0, 50) + 
              (conversation.messages[conversation.messages.length - 1].text.length > 50 ? '...' : '')
            : 'Empty conversation'}
        </p>
        <span className="conversation-time">
          {new Date(conversation.updatedAt).toLocaleDateString([], { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
      <button 
        className="delete-conversation-button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(conversation.id);
        }}
        title="Delete conversation"
      >
        <FiTrash2 size={16} />
      </button>
    </div>
  );
};

export default ConversationItem;