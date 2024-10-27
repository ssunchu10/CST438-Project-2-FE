import React from "react";
import "./contact.css";
import Navbar from "../Navbar/Navbar";

function Contact() {
  return (
    <div className="contact-container">
      <Navbar />
      <div className="contact-content">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="heading-container">
              <h1 className="main-title">
                We'd Love to <br />
                Hear From You
              </h1>
              <p className="subtitle">
                Your feedback and questions are important to us. Choose the
                method that works best for you.
              </p>
            </div>

            <div className="contact-methods">
              <div className="contact-card">
                <h3>Fill Out Our Form</h3>
                <p>
                  Share your thoughts or questions through our detailed contact
                  form
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfwLAy1iTzu2JoCNVLJAlvwjfPCrQKaJuSbJaFDMc08Knsq6Q/viewform?usp=send_form"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fill out this form
                </a>
              </div>

              <div className="contact-card">
                <h3>Email Us Directly</h3>
                <p>
                  Send us an email and we'll get back to you
                </p>
                <a
                  href="mailto:wishlist@list.com"
                  className="contact-button email-button"
                >
                  contact@yourcompany.com
                </a>
              </div>

              <div className="contact-card">
                <h3>Office Hours</h3>
                <p>Tuesday and Thursday</p>
                <p>10:00 AM - 11:50 AM PST</p>
                <p className="response-time">Average response time: 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;