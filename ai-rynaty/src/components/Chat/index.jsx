import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import ErrorBoundary from './ErrorBoundary';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import Message from './Message';
import MessageForm from './MessageForm';
import EmptyState from './EmptyState';
import '../chat-style.css'
import Header from '../../Header';

const Chat = () => {
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
      const response = await axios.post('http://localhost:8000/chat', {
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

  const deleteConversation = (conversationId) => {
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
          const response = await axios.post('http://localhost:8000/chat', {
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

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const currentConversationData = conversations.find(c => c.id === currentConversation);

  return (
    <ErrorBoundary>
      <div className={`chat-app ${darkMode ? 'dark-mode' : ''}`}>
        <div className="mobile-header">
          <button className="menu-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1>Hi, I'm Rynaty</h1>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
        
        <Sidebar
          isOpen={sidebarOpen}
          darkMode={darkMode}
          conversations={conversations}
          currentConversation={currentConversation}
          onToggleDarkMode={toggleDarkMode}
          onNewConversation={startNewConversation}
          onSelectConversation={loadConversation}
          onDeleteConversation={deleteConversation}
        />
        
        <div className="main-content">
          {currentConversation ? (
            <>
              <ChatHeader title={currentConversationData?.title} />
              
              <div className="chat-container">
                <div className="messages">
                  {messages.length === 0 && !isLoading && (
                    <EmptyState onSuggestionClick={handleSuggestionClick} />
                  )}
                  
                  {messages.map((message) => (
                    <Message
                      key={message.id}
                      message={message}
                      isEditing={editingMessageId === message.id}
                      editContent={editMessageContent}
                      onEditChange={setEditMessageContent}
                      onSaveEdit={saveEditedMessage}
                      onCancelEdit={cancelEditing}
                      onStartEdit={startEditingMessage}
                    />
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
                
                <MessageForm
                  inputMessage={inputMessage}
                  isLoading={isLoading}
                  onInputChange={setInputMessage}
                  onSubmit={handleSendMessage}
                />
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
};

export default Chat;