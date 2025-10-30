import React from 'react'

function Pricepage() {
  return (

    <section className="pricepage-section">
      <div className="container-fluid">
        <div className="row">
          <div className="text-center">

            {/* Heading */}
            <div className="row mb-5">
              <div className="col">
                <h1 className="pricepage-title">Choose Your Plan</h1>
                <p className="pricepage-subtitle">
                  Simple, transparent pricing — built to scale with your AI journey.
                  Start for free and unlock advanced tools as you grow.
                </p>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="row gy-4">
              {/* Starter Plan */}
              <div className="col-md-4">
                <div className="pricepage-card">
                  <h3 className="pricepage-plan-title">Starter</h3>
                  <p className="pricepage-plan-price">Free</p>
                  <ul className="pricepage-features">
                    <li>✔ Advanced reasoning with GPT-5</li>
                    <li>✔ Limited messages and uploads</li>
                    <li>✔ Limited and slower image generation</li>
                    <li>✔ Limited deep research</li>
                    <li>✔ Limited memory and context</li>
                  </ul>
                  <button className="pricepage-btn">Get Started</button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="col-md-4">
                <div className="pricepage-card featured">
                  <h3 className="pricepage-plan-title">Pro</h3>
                  <p className="pricepage-plan-price">₹399<span>/month</span></p>
                  <ul className="pricepage-features">
                    <li>✔ Extended access to our flagship model GPT‑5</li>
                    <li>✔ Extended access to image generation</li>
                    <li>✔ Extended access to file uploads</li>
                    <li>✔ Extended access to advanced data analysis</li>
                  </ul>
                  <button className="pricepage-btn">Choose Plan</button>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="col-md-4">
                <div className="pricepage-card">
                  <h3 className="pricepage-plan-title">Enterprise</h3>
                  <p className="pricepage-plan-price">₹1,999<span>/month</span></p>
                  <ul className="pricepage-features">
                    <li>✔ Advanced reasoning with GPT-5</li>
                    <li>✔ Expanded messaging and uploads</li>
                    <li>✔ Expanded and faster image creation</li>
                    <li>✔ Expanded deep research and agent mode</li>
                    <li>✔ Expanded memory and context</li>
                    <li>✔  Projects, tasks and custom GPTs</li>
                    <li>✔  Limited access to Sora 1 video generation </li>
                    <li>✔ Codex agent </li>
                  </ul>
                  <button className="pricepage-btn">Go Premium</button>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="row mt-5">
              <div className="col">
                <h2 className="pricepage-compare-title">Compare All Plans</h2>
                <div className="table-responsive">
                  <table className="pricepage-table table table-dark table-bordered align-middle">
                    <thead>
                      <tr>
                        <th>Feature</th>
                        <th>Starter</th>
                        <th>Pro</th>
                        <th>Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Messages</td>
                        <td>100/month</td>
                        <td>Unlimited</td>
                        <td>Unlimited</td>
                      </tr>
                      <tr>
                        <td>Support Type</td>
                        <td>Standard</td>
                        <td>Priority</td>
                        <td>24/7 Dedicated</td>
                      </tr>
                      <tr>
                        <td>Custom API Access</td>
                        <td>❌</td>
                        <td>✔</td>
                        <td>✔</td>
                      </tr>
                      <tr>
                        <td>Private Deployment</td>
                        <td>❌</td>
                        <td>❌</td>
                        <td>✔</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="row mt-5">
              <div className="col">
                <h2 className="pricepage-cta-title">Ready to Power Your Conversations?</h2>
                <p className="pricepage-cta-desc">
                  Join thousands of users using <span>Rynaty AI</span> for smarter, faster, and secure AI-driven communication.
                </p>
                <button className="pricepage-cta-btn">Start Free Trial</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>


  )
}

export default Pricepage
