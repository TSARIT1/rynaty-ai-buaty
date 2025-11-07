import React, { useState } from 'react';
import axios from 'axios';

function Contactpage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: false, error: false, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ success: false, error: false, message: '' });

    try {
      const response = await axios.post('http://127.0.0.1:8000/contact/', formData);
      console.log(response.data);
      
      if (response.status === 200) {
        setStatus({ success: true, message: 'Your message has been sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }

    } catch (error) {
      setStatus({ error: true, message: 'Failed to send message. Please try again later.' });
      console.error(error.response);
      
    } finally {
      setLoading(false);
    }
  };

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
            <p><i className="fa-solid fa-location-dot"></i> Harare, Zimbabwe</p>
            <p><i className="fa-solid fa-envelope"></i> oliver.ceo@rynatyai.com</p>
            <p><i className="fa-solid fa-phone"></i> +263 719 131 308 </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send a Message</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="contact-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="contact-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="contact-input"
              value={formData.subject}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="contact-textarea"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="contact-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {status.success && <p className="success-text">{status.message}</p>}
            {status.error && <p className="error-text">{status.message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contactpage;
