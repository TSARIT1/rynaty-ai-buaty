import React, { useState } from "react";
import logo from './assets/logo.jpg';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbarr">
      <div className="navbar-container">
        <div className="logo-c">
            <img src={logo} alt="" className="logo-ai" />
        </div>
        <a className="navbar-logo" href="/">
          Rynaty Ai
        </a>

        {/* Hamburger Menu */}
        <div
          className={`menu-toggle ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav Links */}
        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          <a href="/" className="nav-link">Home</a>
          <a href="/aboutpage" className="nav-link">About</a>
          <a href="/pricepage" className="nav-link">Pricing</a>
          <a href="/featurepage" className="nav-link">Features</a>
          <a href="/contact" className="nav-link">Contact</a>
          <a href="/getstart" className="neon-button">Get Started</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
