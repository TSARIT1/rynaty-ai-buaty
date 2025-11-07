import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pdf from './assets/ai-pitchdeck.pdf'

function Transforming() {
  const navigate = useNavigate()
  const [showPdf, setShowPdf] = useState(false)

  return (
    <div className='trans'>
      <h1 className='title'>Transforming Africa Through AI Innovation</h1>
      <p className='subtitle'>Leading the charge in smart city development and digital transformation across emerging markets</p>
      <div className='button-container'>
        <button type="button" className="button-trans" onClick={() => navigate('/aboutpage')}>Explore to work</button>
        <button type="button" className="button-trans2" onClick={() => navigate('/contact')}>Meet oliver</button>
        <button type="button" className="button-trans3" onClick={() => setShowPdf(true)}>Pitch deck</button>
      </div>
      {showPdf && (
        <div className="pdf-modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div className="pdf-modal" style={{width: '90%', height: '90%', background: '#fff', borderRadius: 8, overflow: 'hidden', position: 'relative'}}>
            <button onClick={() => setShowPdf(false)} style={{position: 'absolute', top: 8, right: 8, zIndex: 1001, padding: '6px 10px'}}>Close</button>
            <iframe src={pdf} title="Pitch Deck" style={{width: '100%', height: '100%', border: 'none'}} />
          </div>
        </div>
      )}

      <div className='container'>
        <div className='row'>

          <div className='col-md-4 '>
            <div className="card1" style={{ width: " 18rem;" }}>
              <div className="card-body">
                <h5 className="card-title">AI Solutions</h5>
                <p className="card-text">Cutting-edge artificial intelligence for urban development</p>

              </div>
            </div>
          </div>

          <div className='col-md-4 '>
            <div className="card1" style={{ width: "18rem;" }}>
              <div className="card-body">
                <h5 className="card-title">Smart Cities</h5>
                <p className="card-text">Creating sustainable and intelligent urban ecosystems</p>

              </div>
            </div>
          </div>

          <div className='col-md-4 '>
            <div className="card1" style={{ width: "18rem;" }}>
              <div className="card-body">
                <h5 className="card-title fw-bold">African Focus</h5>
                <p className="card-text">Solutions designed for emerging market challenges</p>

              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Transforming
