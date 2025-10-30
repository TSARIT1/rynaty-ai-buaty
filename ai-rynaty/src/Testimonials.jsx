import React from 'react'

function Testimonials() {
  return (
    <div>
      <div className="testimonials">
        <h2>What Our Users Say</h2>

        <div className="testimonial-container">
          <div className="testimonial-box">
            <i className="fa-solid fa-star" style={{ color: " #74C0FC;" }}></i><i className="fa-solid fa-star" style={{ color: " #74C0FC;" }}></i>
            <i className="fa-solid fa-star" style={{ color: " #74C0FC;" }}></i><i className="fa-solid fa-star" style={{ color: " #74C0FC;" }}></i>
            <i className="fa-solid fa-star" style={{ color: " #74C0FC;" }}></i><i className="fa-solid fa-star" style={{ color: " #74C0FC;" }}></i>
            <p>
              "Rynaty has completely transformed how our team collaborates. The speed and accuracy are incredible!"
            </p>
            <h4>Sarah Chen</h4>
            <p className="role">Product Manager, TechCorp</p>
          </div>

          <div className="testimonial-box">
            <i className="fa-solid fa-star" style={{ color: " #74C0FC;" }}></i><i className="fa-solid fa-star" style={{ color: " #74C0FC;" }}></i>
            <i className="fa-solid fa-star" style={{ color: " #74C0FC;" }}></i><i className="fa-solid fa-star" style={{ color: " #74C0FC;" }}></i>
            <i className="fa-solid fa-star" style={{ color: " #74C0FC;" }}></i><i className="fa-solid fa-star" style={{ color: " #74C0FC;" }}></i>
            <p>
              "The most responsive AI I've ever used. It's like having a conversation with a genius friend."
            </p>
            <h4>Marcus Rodriguez</h4>
            <p className="role">Software Engineer</p>
          </div>

          <div className="testimonial-box">
            <i className="fa-solid fa-star" style={{ color: " #ffffffff;" }}></i><i className="fa-solid fa-star" style={{ color: " #ffffffff;" }}></i>
            <i className="fa-solid fa-star" style={{ color: " #ffffffff;" }}></i><i className="fa-solid fa-star" style={{ color: " #ffffffff;" }}></i>
            <i className="fa-solid fa-star" style={{ color: " #ffffffff;" }}></i><i className="fa-solid fa-star" style={{ color: " #ffffffff;" }}></i>
            <p>
              "Game-changing technology. The privacy features give us confidence to use it for sensitive projects."
            </p>
            <h4>Dr. Amelia Foster</h4>
            <p className="role">Research Director
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
