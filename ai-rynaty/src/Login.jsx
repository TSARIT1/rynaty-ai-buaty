import React from 'react'

function Login() {
  return (
    <div className="login-section" id="login">
      <div className="login-header">
        <h2 className="login-title">Login to <span>Rynaty AI</span></h2>
        <p className="login-subtitle">
          Welcome back! Sign in to continue your AI experience.
        </p>
      </div>

      <div className="login-container">
        <form className="login-form">
          <h3>Sign In</h3>

          <input type="email" placeholder="Email Address" className="login-input" required />
          <input type="password" placeholder="Password" className="login-input" required />

          <div className="login-options">
            <label><input type="checkbox" /> Remember Me</label>
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn">Login</button>

          <p className="login-register-text">
            Don’t have an account? <a href="/register">Register Here</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
