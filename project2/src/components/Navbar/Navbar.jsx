import React from "react";
// import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import FaShoppingCart from '../../assests/FaShoppingCart.png';
import FaUserCircle from '../../assests/FaUserCircle.png';
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
          <img src={FaShoppingCart} alt="FaShoppingCart" className="icon" />
          <img src={FaUserCircle} alt="FaUserCircle" className="icon" />
        </div>
      </nav>
  );
};

export default Navbar;
