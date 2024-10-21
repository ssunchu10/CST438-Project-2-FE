import React from "react";
import "./about.css";
import Navbar from "../Navbar/Navbar";

function About() {
  return (
    <div className="container">
      <Navbar />
      <div className="main-content-container">
        <div className="description-container">
          <div className="heading-container">
            <h1>Get to Know Us</h1>
            <h2>Meet our team!</h2>
            <h2>each member brings unique skills and passion to their role</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;