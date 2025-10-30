import React from 'react'
import oliver from "../src/assets/oliver.jpeg"

function Aboutpage() {
  return (
    <div>
      <div className="aboutpage-container">
        <div className="aboutpage-card">

          {/* Left Section */}
          <div className="aboutpage-left">
            <img
              src={oliver} alt="Oliver Tapuwa Mapunga" className="aboutpage-image"
            />
            <h2 className="aboutpage-name">Oliver Tapuwa Mapunga</h2>
            <p className="aboutpage-role">Founder & CEO of Rynaty AI</p>

            <div className="aboutpage-badges">
              <div className="aboutpage-badge yellow">🏆 Techpreneur Award Winner</div>
              <div className="aboutpage-badge green">🧠 AI Advisor - Global Impact</div>
              <div className="aboutpage-badge purple">💡 Visionary Innovator</div>
            </div>

            <button className="aboutpage-button">View Pitch Deck</button>
          </div>

          {/* Right Section */}
          <div className="aboutpage-right">
            <h2 className="aboutpage-heading">
              About <span>Oliver</span>
            </h2>

            <p>
              Oliver Tapuwa Mapunga is a visionary Zimbabwean entrepreneur, dynamic leader, and global AI advisor.
              As the Founder and CEO of Rynaty AI, he is driving innovation at the intersection of artificial intelligence
              and smart city development across Africa and beyond.
            </p>

            <ul>
              <li>
                🥇 <strong>1st Runner-Up Techpreneur of the Year Under 30</strong> — Southern Africa, 2025
              </li>
              <li>
                🏅 <strong>Zimbabwe's 40 Under 40 Most Influential Young Business Leaders</strong> — 2024, youngest honoree in history
              </li>
            </ul>

            <p>
              Oliver’s forward-thinking leadership continues to shape the future of intelligent infrastructure and digital
              transformation across emerging markets. His work at Rynaty AI focuses on implementing cutting-edge AI solutions
              that address challenges in developing economies while creating sustainable technology ecosystems.
            </p>

            <p>
              With a passion for innovation and community development, Oliver mentors the next generation of African tech
              entrepreneurs. His mission extends beyond business — he is dedicated to empowering young leaders, supporting
              digital education initiatives, and driving inclusive growth across the continent.
            </p>

            <p>
              Recently, Oliver launched the <strong>AI for Africa Fellowship</strong>, a mentorship and research-driven program
              helping young innovators use AI to solve challenges in agriculture, healthcare, and education. His vision is to
              see Africa emerge as a global hub for responsible AI innovation.
            </p>
          </div>

          <div className="company-overview">
            <h2 className="company-title">About <span>Rynaty AI</span></h2>

            <p className="company-description">
              Founded in 2023, <strong>Rynaty AI</strong> is a next-generation technology company based in Africa,
              focused on building AI-powered solutions for smart cities, clean energy, and sustainable infrastructure.
              Our mission is to make artificial intelligence accessible and impactful across all sectors of society.
            </p>

            <div className="company-grid">
              <div className="company-card">
                <h3>🚀 Our Mission</h3>
                <p>
                  To harness the power of AI to create intelligent, inclusive, and sustainable ecosystems
                  that drive Africa’s digital transformation.
                </p>
              </div>

              <div className="company-card">
                <h3>🌍 Our Vision</h3>
                <p>
                  To position Africa as a global leader in responsible artificial intelligence by empowering innovators,
                  researchers, and startups.
                </p>
              </div>

              <div className="company-card">
                <h3>💡 Core Values</h3>
                <ul>
                  <li>Innovation & Integrity</li>
                  <li>Social Impact & Inclusion</li>
                  <li>Collaboration & Excellence</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Aboutpage
