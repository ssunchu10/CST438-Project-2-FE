import React from "react";
import "./contact.css";
import Navbar from "../Navbar/Navbar";

function Contact() {
  return (
    <div className="container">
      <Navbar />
      <div className="main-content-container">
        <div className="description-container">
          <div className="heading-container">
            <h1>We'd Love to</h1>
            <h1>Hear From You</h1>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfwLAy1iTzu2JoCNVLJAlvwjfPCrQKaJuSbJaFDMc08Knsq6Q/viewform?usp=send_form"
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            Fill out this form
          </a>
          <p className="email-info">
            Or email us directly at:{" "}
            <a href="mailto:contact@yourcompany.com">contact@yourcompany.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;