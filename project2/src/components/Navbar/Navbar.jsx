import React from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  return (
      <nav className="navbar">
        <div className="left">
          <span className="username">Username</span>
        </div>
        <div className="center">
          <a className="link" href="#home">
            Home
          </a>
          <a className="link" href="#about">
            About
          </a>
          <a className="link" href="#contact">
            Contact
          </a>
        </div>
        <div className="right">
          <FaShoppingCart className="icon" />
          <FaUserCircle className="icon" />
        </div>
      </nav>
  );
};

export default Navbar;
