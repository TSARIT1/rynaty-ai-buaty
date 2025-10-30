import React from 'react'
import robot from "../src/assets/robot.png"

function About() {
    return (
        <div>
            <div className='container-fluid about'>
                <div className='row'>
                    <div className="col-md-8 mt-5 neon-section">
                        <h1 className="neon-title w3-animate-bottom">Powering Conversations with Rynaty AI</h1>
                        <p className="neon-text w3-animate-bottom">
                            Experience the future of artificial intelligence with our revolutionary
                            Rynaty-powered chat application. Lightning-fast responses, human-like
                            understanding, and enterprise-grade security — all in one platform.
                        </p>
                    </div>
                    <div className='col-md-4'>
                        <img src={robot} className='about-img mt-5'></img>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default About
