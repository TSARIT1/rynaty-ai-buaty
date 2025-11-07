import React from 'react';

const ChatHeader = ({ title }) => {
  return (
    <div className="chat-header">
      <h1>{title || "New Chat"}</h1>
      <p>Available 24/7 to help with your questions</p>
    </div>
  );
};

export default ChatHeader;