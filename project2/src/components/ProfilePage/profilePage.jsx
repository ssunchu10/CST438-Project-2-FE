import React, { useState, useEffect } from "react";
import "./profilePage.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  // State hooks must be declared at the top level
  const [email, setEmail] = useState(userData ? userData.email : "");
  const [password, setPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

  useEffect(() => {
    if (!userData) {
      alert("User not Logged in");
      navigate("/");
    }
  }, [navigate, userData]);

  if (!userData) return null; // Prevents rendering if userData is null

  const username = userData.email.split("@")[0];
  const capitalizedUsername =
    username.charAt(0).toUpperCase() + username.slice(1);

  const handleLogout = () => {
    alert("Successfully Logged Out!");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const handleUpdate = () => {
    if (email !== userData.email) {
      localStorage.setItem("userData", JSON.stringify({ ...userData, email }));
    }
    if (password) {
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, password })
      );
    }
    alert("Profile updated successfully");
  };

  const handleDelete = () => {
    if (deletePassword === userData.password) {
      alert("Account Deleted Successfully");
      localStorage.removeItem("userData");
      navigate("/");
    } else {
      alert("INVALID PASSWORD");
    }
  };

  return (
    <div className="profile-container">
      <Navbar />
      <div className="scrollable-content">
        <div className="profile-mainContent">
          <div className="profile-header">
            <div className="profile-info">
              <h1>{capitalizedUsername}</h1>
            </div>
            <button className="delete-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="profile-sections">
            <div className="profile-section">
              <h2>Account Details</h2>
              <div className="details-group">
                <div className="detail-item">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="detail-item">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button className="update-btn" onClick={handleUpdate}>
                Update
              </button>
            </div>
            <div className="profile-section">
              <h2>Delete Account</h2>
              <div className="detail-item">
                <input
                  type="password"
                  placeholder="Enter your password to delete account"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                />
                <button className="delete-btn" onClick={handleDelete}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
