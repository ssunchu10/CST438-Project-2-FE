import React from "react";
import { Link, useNavigate } from "react-router-dom";
import listIcon from '../../assests/listIcon.png';
import FaUserCircle from '../../assests/FaUserCircle.png';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('userData'));
  const username = userData.email.split('@')[0];
  const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
  const isAdmin = userData.is_admin;

  const handleProfileClick = () => {
    if (isAdmin === true) {
      navigate('/adminProfilePage');
    } else {
      navigate('/profilePage');
    }
  };

  return (
    <nav className="navbar">
      <div className="left">
        <span className="username">Welcome {capitalizedUsername}</span>
      </div>
      
      <div className="center">
        <Link className="link" to="/landing">
          Home
        </Link>
        <Link className="link" to="/about">
          About
        </Link>
        <Link className="link" to="/contact">
          Contact
        </Link>
        <Link className="link" to="/deleteItemPage">
          Delete
        </Link>
        <Link className="link" to="/addItemPage">
          Add
        </Link>
        <Link className="link" to="/updateItemPage">
          Update
        </Link>
      </div>
      
      <div className="right">
        <Link to="/listPage">
          <img src={listIcon} alt="listIcon" className="icon" />
        </Link>
        <div onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          <img src={FaUserCircle} alt="Profile" className="icon" />
        </div>
        {isAdmin === true && (
          <span className="admin-badge">Admin</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;