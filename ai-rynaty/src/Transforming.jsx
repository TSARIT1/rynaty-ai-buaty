import React from 'react'

function Transforming() {
  return (
    <div className='trans'>
      <h1 className='title'>Transforming Africa Through AI Innovation</h1>
      <p className='subtitle'>Leading the charge in smart city development and digital transformation across emerging markets</p>
      <div className='button-container'>
        <button type="button" className="button-trans">Explore to work</button>
        <button type="button" className="button-trans2">Meet oliver</button>
        <button type="button" className="button-trans3">Pitch deck</button>
      </div>

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
