import React from "react";
import "./about.css";
import Navbar from "../Navbar/Navbar";

// images
import diegoZavala from "../../assests/diego zavala.png";
import kylaUsi from "../../assests/kyla usi.png";
import mikaLagumbay from "../../assests/mika lagumbay.png";
import sumitSunchu from "../../assests/sumit sunchu.png";

function About() {
  const teamMembers = [
    {
      name: "Diego Zavala",
      role: "Backend Dev",
      image: diegoZavala
    },
    {
      name: "Kyla Usi",
      role: "Backend Dev",
      image: kylaUsi
    },
    {
      name: "Mika Lagumbay",
      role: "Frontend Dev",
      image: mikaLagumbay
    },
    {
      name: "Sumit Sunchu",
      role: "Frontend Dev",
      image: sumitSunchu
    },
  ];

  return (
    <div className="about-container">
      <Navbar />
      <div className="about-content">
        <div className="about-header">
          <h1 className="main-title">Get to Know Us</h1>
          <div className="header-underline"></div>
        </div>
        
        <div className="team-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-image">
                  <img 
                    src={member.image}
                    alt={member.name}
                  />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <h4>{member.role}</h4>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;