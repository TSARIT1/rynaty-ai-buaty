import React from 'react'

function Features() {
    return (
        <div>
            <div className="features-section" id="feature">
                <h2 className="features-heading">How Our Rynaty AI Integration Works</h2>
                <p className="features-subtitle">
                    Discover the cutting-edge technology that makes Rynaty the most advanced AI chat platform available today.
                </p>

                <div className="features-container">
                    <div className="feature-box">
                        <i className="fa-solid fa-bolt" style={{ fontSize: "3rem", textAlign: 'center', marginTop: '5%', borderRadius: '50%', color: '#21f0ff' }}></i>
                        <h3 className="feature-title">Blazing Fast Responses</h3>
                        <p className="feature-desc">
                            Rynaty's revolutionary LPU (Language Processing Unit) technology
                            delivers responses 10x faster than traditional AI models, ensuring
                            seamless real-time conversations without any lag.
                        </p>
                    </div>

                    <div className="feature-box">
                        <i className="fa-solid fa-brain" style={{ fontSize: "3rem", textAlign: 'center', marginTop: '5%', borderRadius: '50%', color: '#21f0ff' }} ></i>
                        <h3 className="feature-title">Advanced Understanding</h3>
                        <p className="feature-desc">
                            Our model comprehends complex queries with exceptional accuracy,
                            understanding context, nuance, and intent to provide relevant and
                            helpful responses every time.
                        </p>
                    </div>

                    <div className="feature-box">
                        <i className="fa-solid fa-shield" style={{ fontSize: "3rem", textAlign: 'center', marginTop: '5%', borderRadius: '50%', color: '#21f0ff' }}></i>
                        <h3 className="feature-title">Privacy Focused</h3>
                        <p className="feature-desc">
                            Conversations are processed securely with enterprise-grade
                            encryption and privacy protection. Your data remains confidential
                            and is never used for training without consent.
                        </p>
                    </div>

                    <div className="feature-box">
                        <i className="fa-solid fa-arrows-rotate" style={{ fontSize: "3rem", textAlign: 'center', marginTop: '5%', borderRadius: '50%', color: '#21f0ff' }}></i>
                        <h3 className="feature-title">Continuous Learning</h3>
                        <p className="feature-desc">
                            The system continuously improves through advanced machine learning
                            algorithms, adapting to user interactions and staying current with
                            evolving language patterns.
                        </p>
                    </div>

                    <div className="feature-box">
                        <i className="fa-solid fa-gear" style={{ fontSize: "3rem", textAlign: 'center', marginLeft: '0%', marginTop: '5%', borderRadius: '50%', color: '#21f0ff' }}></i>
                        <h3 className="feature-title">Multi-Modal Processing</h3>
                        <p className="feature-desc">
                            Handle text, images, documents, and complex data formats with unified AI processing capabilities.
                        </p>
                    </div>


                    <div className="feature-box">
                        <i className="fa-solid fa-person" style={{ fontSize: "3rem", textAlign: 'center', marginTop: '5%', borderRadius: '50%', color: '#21f0ff' }}></i>
                        <h3 className="feature-title">Team Collaboration</h3>
                        <p className="feature-desc">
                            Share conversations, collaborate on projects, and manage team AI interactions with advanced workspace features.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Features
