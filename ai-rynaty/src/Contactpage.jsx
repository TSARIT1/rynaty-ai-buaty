import React from 'react'

function Contactpage() {
  return (
    <div>

      <div className="contact-section" id="contact">
        <div className="contact-header">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">
            Have questions, feedback, or partnership ideas? We’d love to hear from you!
          </p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p><i className="fa-solid fa-location-dot"></i> India</p>
            <p><i className="fa-solid fa-envelope"></i> contact@rynaty.ai</p>
            <p><i className="fa-solid fa-phone"></i> +91 98765 43210</p>
            <p><i className="fa-solid fa-clock"></i> Mon - Sat: 9:00 AM - 6:00 PM</p>
          </div>

          <form className="contact-form">
            <h3>Send a Message</h3>
            <input type="text" placeholder="Full Name" className="contact-input" required />
            <input type="email" placeholder="Email Address" className="contact-input" required />
            <input type="text" placeholder="Subject" className="contact-input" />
            <textarea placeholder="Your Message" className="contact-textarea" required></textarea>
            <button type="submit" className="contact-btn">Send Message</button>
          </form>
        </div>


      </div>

    </div>
  )
}

export default Contactpage
