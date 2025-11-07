import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiSend, FiCopy, FiMenu, FiX, FiSun, FiMoon, FiTrash2, FiEdit2, FiCheck } from 'react-icons/fi';
import { Highlight } from 'prism-react-renderer';
import './style.css'
import BASEURL from '../api';
// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>Please refresh the page or try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Highlight code={code} language={language || 'javascript'}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="code-block-wrapper">
          <div className="code-header">
            <span>{language || 'javascript'}</span>
            <button 
              onClick={handleCopy}
              className="copy-button"
              title="Copy to clipboard"
            >
              <FiCopy size={14} />
              {copied && <span className="copied-text">Copied!</span>}
            </button>
          </div>
          <pre className={className} style={style}>
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  <span className="line-number">{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}
    </Highlight>
  );
};

const BulletPoints = ({ text }) => {
  const bulletRegex = /^\s*[\-•*]\s+/gm;
  const lines = text.split('\n');
  let inList = false;

  const highlightRynaty = (content) => {
    if (!content) return content;
    return content.replace(/\bRynaty\b/g, '<span class="highlight-rynaty">Rynaty</span>');
  };

  return (
    <div className="text-content">
      {lines.map((line, i) => {
        const isBullet = bulletRegex.test(line);
        const content = isBullet ? line.replace(bulletRegex, '') : line;
        const highlightedContent = highlightRynaty(content);

        if (isBullet && !inList) {
          inList = true;
          return (
            <ul key={i} className="bullet-list">
              <li dangerouslySetInnerHTML={{ __html: highlightedContent }} />
            </ul>
          );
        } else if (isBullet && inList) {
          return <li key={i} dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
        } else if (!isBullet && inList) {
          inList = false;
          return <p key={i} dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
        } else {
          return <p key={i} dangerouslySetInnerHTML={{ __html: highlightedContent || '<br />' }} />;
        }
      })}
    </div>
  );
};

const TypingAnimation = ({ content, speed = 20, onComplete }) => {
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

function ChatBot() {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editMessageContent, setEditMessageContent] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
      const parsedConversations = JSON.parse(savedConversations);
      setConversations(parsedConversations);
      if (parsedConversations.length > 0) {
        setCurrentConversation(parsedConversations[0].id);
        setMessages(parsedConversations[0].messages);
      }
    } else {
      const newConversation = createNewConversation();
      setConversations([newConversation]);
      setCurrentConversation(newConversation.id);
      setMessages(newConversation.messages);
      saveConversations([newConversation]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, editingMessageId]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const createNewConversation = () => {
    return {
      id: Date.now(),
      title: "New Chat",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: []
    };
  };

  const saveConversations = (conversations) => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { 
      id: Date.now(),
      text: inputMessage, 
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    let updatedConversations;
    if (currentConversation) {
      updatedConversations = conversations.map(conv => {
        if (conv.id === currentConversation) {
          return { 
            ...conv, 
            messages: updatedMessages,
            updatedAt: new Date().toISOString(),
            title: conv.messages.length === 0 ? inputMessage.slice(0, 30) : conv.title
          };
        }
        return conv;
      });
    } else {
      const newConversation = createNewConversation();
      newConversation.messages = updatedMessages;
      newConversation.title = inputMessage.slice(0, 30);
      updatedConversations = [newConversation, ...conversations];
      setCurrentConversation(newConversation.id);
    }
    
    setConversations(updatedConversations);
    saveConversations(updatedConversations);

    try {
      const response = await axios.post(`${BASEURL}/api/chat`, {
        message: inputMessage,
        conversation_history: messages
      });

      const aiMessage = { 
        id: Date.now(),
        text: response.data.response, 
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      
      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      
      const finalUpdatedConversations = updatedConversations.map(conv => {
        if (conv.id === currentConversation) {
          return { 
            ...conv, 
            messages: finalMessages,
            updatedAt: new Date().toISOString()
          };
        }
        return conv;
      });
      
      setConversations(finalUpdatedConversations);
      saveConversations(finalUpdatedConversations);
      
    } catch (error) {
      console.error('API Error:', error);
      let errorMessage = "Sorry, I'm having trouble responding. Please try again later.";
      
      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = "API authentication failed.";
            break;
          case 429:
            errorMessage = "Too many requests. Please try again later.";
            break;
          case 500:
            errorMessage = "Server error occurred.";
            break;
          default:
            errorMessage = `Error ${error.response.status}`;
        }
      }
      
      const errorMsg = { 
        id: Date.now(),
        text: errorMessage, 
        sender: 'ai', 
        isError: true,
        timestamp: new Date().toISOString()
      };
      
      const errorMessages = [...updatedMessages, errorMsg];
      setMessages(errorMessages);
      
      const errorUpdatedConversations = updatedConversations.map(conv => {
        if (conv.id === currentConversation) {
          return { 
            ...conv, 
            messages: errorMessages,
            updatedAt: new Date().toISOString()
          };
        }
        return conv;
      });
      
      setConversations(errorUpdatedConversations);
      saveConversations(errorUpdatedConversations);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteConversation = (conversationId, e) => {
    e.stopPropagation();
    const updatedConversations = conversations.filter(conv => conv.id !== conversationId);
    setConversations(updatedConversations);
    saveConversations(updatedConversations);
    
    if (currentConversation === conversationId) {
      if (updatedConversations.length > 0) {
        setCurrentConversation(updatedConversations[0].id);
        setMessages(updatedConversations[0].messages);
      } else {
        const newConversation = createNewConversation();
        setConversations([newConversation]);
        setCurrentConversation(newConversation.id);
        setMessages(newConversation.messages);
        saveConversations([newConversation]);
      }
    }
  };

  const startNewConversation = () => {
    const newConversation = createNewConversation();
    const updatedConversations = [newConversation, ...conversations];
    setConversations(updatedConversations);
    setCurrentConversation(newConversation.id);
    setMessages(newConversation.messages);
    saveConversations(updatedConversations);
    setSidebarOpen(false);
  };

  const loadConversation = (conversationId) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversationId);
      setMessages(conversation.messages);
    }
    setSidebarOpen(false);
  };

  const startEditingMessage = (message) => {
    setEditingMessageId(message.id);
    setEditMessageContent(message.text);
  };

  const cancelEditing = () => {
    setEditingMessageId(null);
    setEditMessageContent('');
  };

  const saveEditedMessage = async (messageId) => {
    const updatedMessages = messages.map(msg => {
      if (msg.id === messageId) {
        return { ...msg, text: editMessageContent };
      }
      return msg;
    });
    
    setMessages(updatedMessages);
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === currentConversation) {
        return { ...conv, messages: updatedMessages };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    saveConversations(updatedConversations);
    setEditingMessageId(null);
    setEditMessageContent('');
    
    const editedMessage = updatedMessages.find(msg => msg.id === messageId);
    if (editedMessage && editedMessage.sender === 'user') {
      const messageIndex = updatedMessages.findIndex(msg => msg.id === messageId);
      const subsequentMessages = updatedMessages.slice(messageIndex + 1);
      
      if (subsequentMessages.length > 0) {
        const trimmedMessages = updatedMessages.slice(0, messageIndex + 1);
        setMessages(trimmedMessages);
        
        const trimmedConversations = conversations.map(conv => {
          if (conv.id === currentConversation) {
            return { ...conv, messages: trimmedMessages };
          }
          return conv;
        });
        
        setConversations(trimmedConversations);
        saveConversations(trimmedConversations);
        
        setIsLoading(true);
        try {
          const response = await axios.post(`${BASEURL}/api/chat`, {
            message: editMessageContent,
            conversation_history: trimmedMessages.slice(0, -1)
          });

          const aiMessage = { 
            id: Date.now(),
            text: response.data.response, 
            sender: 'ai',
            timestamp: new Date().toISOString()
          };
          
          const finalMessages = [...trimmedMessages, aiMessage];
          setMessages(finalMessages);
          
          const finalUpdatedConversations = trimmedConversations.map(conv => {
            if (conv.id === currentConversation) {
              return { 
                ...conv, 
                messages: finalMessages,
                updatedAt: new Date().toISOString()
              };
            }
            return conv;
          });
          
          setConversations(finalUpdatedConversations);
          saveConversations(finalUpdatedConversations);
          
        } catch (error) {
          console.error('Error regenerating response:', error);
          const errorMsg = { 
            id: Date.now(),
            text: "Failed to regenerate response. Please try again.", 
            sender: 'ai', 
            isError: true,
            timestamp: new Date().toISOString()
          };
          
          const errorMessages = [...trimmedMessages, errorMsg];
          setMessages(errorMessages);
          
          const errorUpdatedConversations = trimmedConversations.map(conv => {
            if (conv.id === currentConversation) {
              return { 
                ...conv, 
                messages: errorMessages,
                updatedAt: new Date().toISOString()
              };
            }
            return conv;
          });
          
          setConversations(errorUpdatedConversations);
          saveConversations(errorUpdatedConversations);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

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

  const renderMessageContent = (message) => {
    const parts = formatMessageContent(message.text);
    
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
    <ErrorBoundary>
      <div className={`chat-app ${darkMode ? 'dark-mode' : ''}`}>
        <div className="mobile-header">
          <button className="menu-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1>AI Assistant</h1>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
        
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <button className="new-chat-button" onClick={startNewConversation}>
              + New Chat
            </button>
            <button className="theme-toggle sidebar-theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
          </div>
          
          <div className="conversations-list">
            {conversations.length > 0 ? (
              conversations.map((conv) => (
                <div 
                  key={conv.id} 
                  className={`conversation-item ${currentConversation === conv.id ? 'active' : ''}`}
                  onClick={() => loadConversation(conv.id)}
                >
                  <div className="conversation-item-content">
                    <h3>{conv.title}</h3>
                    <p>
                      {conv.messages.length > 0 
                        ? conv.messages[conv.messages.length - 1].text.slice(0, 50) + 
                          (conv.messages[conv.messages.length - 1].text.length > 50 ? '...' : '')
                        : 'Empty conversation'}
                    </p>
                    <span className="conversation-time">
                      {new Date(conv.updatedAt).toLocaleDateString([], { 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  <button 
                    className="delete-conversation-button"
                    onClick={(e) => deleteConversation(conv.id, e)}
                    title="Delete conversation"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <p className="no-conversations">No conversations yet</p>
            )}
          </div>
        </div>
        
        <div className="main-content">
          {currentConversation ? (
            <>
              <div className="chat-header">
                <h1>{conversations.find(c => c.id === currentConversation)?.title || "New Chat"}</h1>
                <p>Available 24/7 to help with your questions</p>
              </div>
              
              <div className="chat-container">
                <div className="messages">
                  {messages.length === 0 && !isLoading && (
                    <div className="empty-state">
                      <h2>How can I help you today?</h2>
                      <p>Ask me anything or request code examples in any programming language.</p>
                      <div className="suggestions">
                        <button onClick={() => setInputMessage("Show me a React component example")}>
                          React component example
                        </button>
                        <button onClick={() => setInputMessage("How to center a div in CSS?")}>
                          CSS centering question
                        </button>
                        <button onClick={() => setInputMessage("Explain closures in JavaScript")}>
                          JavaScript concept
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {messages.map((message) => (
                    <div key={message.id} className={`message ${message.sender} ${message.isError ? 'error' : ''}`}>
                      <div className="message-header">
                        <span className="sender-name">
                          {message.sender === 'user' ? 'You' : 'AI Assistant'}
                        </span>
                        <span className="message-time">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.sender === 'user' && !editingMessageId && (
                          <button 
                            className="edit-message-button"
                            onClick={() => startEditingMessage(message)}
                            title="Edit message"
                          >
                            <FiEdit2 size={14} />
                          </button>
                        )}
                      </div>
                      
                      <div className="message-content">
                        {editingMessageId === message.id ? (
                          <div className="edit-message-container">
                            <textarea
                              value={editMessageContent}
                              onChange={(e) => setEditMessageContent(e.target.value)}
                              className="edit-message-textarea"
                              autoFocus
                            />
                            <div className="edit-message-buttons">
                              <button 
                                onClick={() => saveEditedMessage(message.id)}
                                className="save-edit-button"
                              >
                                <FiCheck size={16} /> Save & Submit
                              </button>
                              <button 
                                onClick={cancelEditing}
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
                  ))}
                  
                  {isLoading && (
                    <div className="message ai">
                      <div className="message-content">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <form onSubmit={handleSendMessage} className="message-form">
                  <div className="input-container">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
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
              </div>
            </>
          ) : (
            <div className="no-conversation-selected">
              <h2>Select a conversation or start a new one</h2>
              <button onClick={startNewConversation} className="start-new-button">
                + New Conversation
              </button>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default ChatBot;