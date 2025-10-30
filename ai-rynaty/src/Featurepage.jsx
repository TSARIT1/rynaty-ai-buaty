import React from 'react'

function Featurepage() {
  return (
    <div>
      <section className="featurepage-section">
        <div className="container">
          <h2 className="section-title">
            Why Choose <span>Rynaty AI</span>?
          </h2>
          <p className="section-subtitle">
            Unlock next-generation intelligence designed for speed, accuracy, and unmatched privacy.
          </p>

          <div className="featurepage-container">
            <div className="featurepage-box">
              <i className="fa-solid fa-bolt featurepage-icon"></i>
              <h3 className="featurepage-title">Blazing Fast Responses</h3>
              <p className="featurepage-desc">
                Rynaty’s revolutionary LPU (Language Processing Unit) technology delivers lightning-speed responses,
                ensuring real-time, human-like conversations without lag.
              </p>
            </div>

            <div className="featurepage-box">
              <i className="fa-solid fa-brain featurepage-icon"></i>
              <h3 className="featurepage-title">Advanced Understanding</h3>
              <p className="featurepage-desc">
                Our system comprehends complex queries with exceptional accuracy,
                understanding intent, context, and tone for perfectly tailored replies.
              </p>
            </div>

            <div className="featurepage-box">
              <i className="fa-solid fa-shield featurepage-icon"></i>
              <h3 className="featurepage-title">Privacy Focused</h3>
              <p className="featurepage-desc">
                With enterprise-grade encryption and zero data sharing, your private conversations remain secure and confidential.
              </p>
            </div>

            <div className="featurepage-box">
              <i className="fa-solid fa-arrows-rotate featurepage-icon"></i>
              <h3 className="featurepage-title">Continuous Learning</h3>
              <p className="featurepage-desc">
                The Rynaty model evolves constantly through AI-driven updates,
                adapting to trends and improving with every interaction.
              </p>
            </div>

            <div className="featurepage-box">
              <i className="fa-solid fa-robot featurepage-icon"></i>
              <h3 className="featurepage-title">Human-like Conversations</h3>
              <p className="featurepage-desc">
                Engage in natural, fluent conversations powered by contextual awareness
                and emotional understanding for a more human experience.
              </p>
            </div>

            <div className="featurepage-box">
              <i className="fa-solid fa-cloud featurepage-icon"></i>
              <h3 className="featurepage-title">Cloud Intelligence</h3>
              <p className="featurepage-desc">
                Access your AI anytime, anywhere. Powered by secure cloud integration
                for smooth global connectivity and scalability.
              </p>
            </div>
          </div>

          <div className="featurepage-stats">
            <div><h2>10x</h2><p>Faster Processing</p></div>
            <div><h2>99.9%</h2><p>Accuracy Rate</p></div>
            <div><h2>24/7</h2><p>Smart Learning</p></div>
          </div>

          <div className="text-center mt-5">
            <a href="#" className="featurepage-button">Explore More Features</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Featurepage
