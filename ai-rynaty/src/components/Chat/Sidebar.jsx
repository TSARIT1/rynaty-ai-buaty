import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import ConversationItem from './ConversationItem';

const Sidebar = ({ 
  isOpen, 
  darkMode, 
  conversations, 
  currentConversation, 
  onToggleDarkMode, 
  onNewConversation, 
  onSelectConversation, 
  onDeleteConversation 
}) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="new-chat-button" onClick={onNewConversation}>
          + New Chat
        </button>
        <button className="theme-toggle sidebar-theme-toggle" onClick={onToggleDarkMode}>
          {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
      </div>
      
      <div className="conversations-list">
        {conversations.length > 0 ? (
          conversations.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isActive={currentConversation === conv.id}
              onSelect={onSelectConversation}
              onDelete={onDeleteConversation}
            />
          ))
        ) : (
          <p className="no-conversations">No conversations yet</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;