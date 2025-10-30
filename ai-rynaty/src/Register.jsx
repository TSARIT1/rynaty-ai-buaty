import React from 'react'

function Register() {
  return (
    <div className="register-section" id="register">
      <div className="register-header">
        <h2 className="register-title">Create Your <span>Rynaty AI</span> Account</h2>
        <p className="register-subtitle">
          Join the next generation of intelligent creators. Sign up to explore Rynaty’s powerful AI tools.
        </p>
      </div>

      <div className="register-container">
        <form className="register-form">
          <h3>Sign Up</h3>

          <input type="text" placeholder="Full Name" className="register-input" required />
          <input type="email" placeholder="Email Address" className="register-input" required />
          <input type="password" placeholder="Password" className="register-input" required />
          <input type="password" placeholder="Confirm Password" className="register-input" required />

          <div className="register-options">
            <label>
              <input type="checkbox" required /> I agree to the <a href="#">Terms & Conditions</a>
            </label>
          </div>

          <button type="submit" className="register-btn">Create Account</button>

          <p className="register-login-text">
            Already have an account? <a href="/login">Login Here</a>
          </p>
        </form>
      </div>


    </div>
  )
}

export default Register
