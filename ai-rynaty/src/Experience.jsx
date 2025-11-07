import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pdf from './assets/ai-pitchdeck.pdf'

function Experience() {
    const navigate = useNavigate()
    const [showPdf, setShowPdf] = useState(false)

    return (
        <div className='container-Experience'>
            <div className='row-Experience'>
                <h1 className='Experience-h1'>Ready to Experience the Future of AI Chat?</h1>
                <p className='Experience-p'>Join thousands of users who have already discovered the power of Rynaty AI. Start your journey today with our free tier, no credit card required.</p>
                <div className='button-container'>
                    <button type="button" className="button-ex" onClick={() => navigate('/getstart')}>Start chat now <i className="fa-solid fa-arrow-right"></i></button>
                    <button type="button" className="button-ex" onClick={() => setShowPdf(true)}>View Documentation <i className="fa-solid fa-message"></i></button>
                </div>
            </div>

            {showPdf && (
                <div className="pdf-modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000}}>
                    <div className="pdf-modal" style={{width: '90%', height: '90%', background: '#fff', borderRadius: 8, overflow: 'hidden', position: 'relative'}}>
                        <button onClick={() => setShowPdf(false)} style={{position: 'absolute', top: 8, right: 8, zIndex: 2001, padding: '6px 10px'}}>Close</button>
                        <iframe src={pdf} title="Documentation" style={{width: '100%', height: '100%', border: 'none'}} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Experience
