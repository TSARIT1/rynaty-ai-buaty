import React from 'react';
import { FiSend } from 'react-icons/fi';

const MessageForm = ({ 
  inputMessage, 
  isLoading, 
  onInputChange, 
  onSubmit 
}) => {
  return (
    <form onSubmit={onSubmit} className="message-form">
      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type your message here..."
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading || !inputMessage.trim()}
          className="send-button"
        >
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <FiSend size={20} />
          )}
        </button>
      </div>
      <div className="input-hints">
        <span>Press Enter to send</span>
        <span>Use ``` for code blocks</span>
      </div>
    </form>
  );
};

export default MessageForm;