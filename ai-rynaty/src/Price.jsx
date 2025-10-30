import React from 'react'

function Price() {
  return (
    <div>
      <div className="pricing-section" id="price">
        <h2 className="pricing-heading">Choose Your Plan</h2>
        <p className="pricing-subtitle">
          From individual creators to enterprise teams, we have the perfect plan for your needs.
        </p>
        {/* <price1 */}
        <div className="pricing-container">

          <div className="pricing-card">
            <h3 className="plan-title">Starter</h3>
            <p className="plan-price">Free</p>
            <ul className="plan-features">
              <li>✔ Advanced reasoning with GPT-5</li>
              <li>✔ Limited messages and uploads</li>
              <li>✔ Limited and slower image generation</li>
              <li>✔ Limited deep research</li>
              <li>✔ Limited memory and context</li>
            </ul>
            <button className="plan-btn">Get Started</button>
          </div>

          {/* <price2 */}
          <div className="pricing-card featured">
            <h3 className="plan-title">Pro</h3>
            <p className="plan-price">₹399<span>/month</span></p>
            <ul className="plan-features">
              <li>✔ Extended access to our flagship model GPT‑5</li>
              <li>✔ Extended access to image generation</li>
              <li>✔ Extended access to file uploads</li>
              <li>✔ Extended access to advanced data analysis</li>
            </ul>
            <button className="plan-btn">Choose Plan</button>
          </div>

          {/* <price3 */}
          <div className="pricing-card">
            <h3 className="plan-title">Enterprise</h3>
            <p className="plan-price">₹1,999<span>/month</span></p>
            <ul className="plan-features">
              <li>✔ Advanced reasoning with GPT-5</li>
              <li>✔ Expanded messaging and uploads</li>
              <li>✔ Expanded and faster image creation</li>
              <li>✔ Expanded deep research and agent mode</li>
              <li>✔ Expanded memory and context</li>
              <li>✔  Projects, tasks and custom GPTs</li>
              <li>✔  Limited access to Sora 1 video generation </li>
              <li>✔ Codex agent </li>
            </ul>
            <button className="plan-btn">Go Premium</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Price
