import React from 'react'

function Getstart() {
    return (
        <div>
            <div className="chat-app">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="sidebar-header">
                        <button className="new-chat-btn">+ New Chat</button>
                    </div>


                </aside>


                <main className="chat-main">
                    <div className="chat-header">
                        <h2>Rynaty AI</h2>
                        <p>Available 24/7 to assist with your ideas and questions.</p>
                    </div>

                    <div className="chat-body">
                        <p className="chat-placeholder">
                            How can I help you today?
                        </p>
                        <div className="chat-buttons">
                            <button>Show me a React component example</button>
                            <button>How to center a div in CSS?</button>
                            <button>Explain closures in JavaScript</button>
                        </div>
                    </div>

                    {/* Input Section */}
                    <div className="chat-input-box">
                        <input
                            type="text"
                            placeholder="Type your message here..."
                            className="chat-input"
                        />
                        <button className="send-btn">➤</button>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Getstart
