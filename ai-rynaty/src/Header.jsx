import React from 'react'

function Header() {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg custom-navbar">
                    <div className="container">
                        <a className="navbar-brand fw-bold neon-logo" href="#">
                            Rynaty
                        </a>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav mx-auto">
                                <a className="nav-link neon-link" href="/">Home</a>
                                <a className="nav-link neon-link" href="/aboutpage">About</a>
                                <a className="nav-link neon-link" href="/pricepage">Pricing</a>
                                <a className="nav-link neon-link" href="/featurepage">Features</a>
                                <a className="nav-link neon-link" href="/contact">Contact us</a>
                            </div>

                            <div className="d-flex">
                                <a href="/getstart" className="btn neon-button">Get Started</a>
                                <a href="/login" className="btn neon-button">Login</a>
                                <a href="/register" className="btn neon-button ">Register</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

        </div>
    )
}

export default Header
