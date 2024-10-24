import React from "react";
import { Link, useNavigate } from "react-router-dom";
import listIcon from '../../assests/listIcon.png';
import FaUserCircle from '../../assests/FaUserCircle.png';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  
  const user = {
    username: "Username",
    is_admin: 0  // defaults to regular user
  };

  const handleProfileClick = () => {
    if (user.is_admin === 1) {
      navigate('/adminProfilePage');
    } else {
      navigate('/profilePage');
    }
  };

  return (
    <nav className="navbar">
      <div className="left">
        <span className="username">{user.username}</span>
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
      </div>
      
      <div className="right">
        <Link to="/listPage">
          <img src={listIcon} alt="listIcon" className="icon" />
        </Link>
        <div onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          <img src={FaUserCircle} alt="Profile" className="icon" />
        </div>
        {user.is_admin === 1 && (
          <span className="admin-badge">Admin</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;