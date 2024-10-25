import React, { useState } from "react";
import "./profilePage.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../API/instance";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const username = userData.email.split("@")[0];
  const capitalizedUsername =
    username.charAt(0).toUpperCase() + username.slice(1);

  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUpdateAccount = async () => {
    try {
      await axiosInstance.patch("/updateAccount/", {
        email: email,
        password: password,
      });
      setMessage("Account updated successfully!");
    } catch (error) {
      setMessage("Error updating account");
      console.error("Error updating account:", error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      try {
        await axiosInstance.delete("/deleteAccount/", {
          data: { password: password },
        });
        setMessage("Account deleted successfully");
        localStorage.removeItem("userData");
        navigate("/");
      } catch (error) {
        setMessage(
          "Error deleting account. Please ensure your password is correct."
        );
        console.error("Error deleting account:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout/");
      localStorage.removeItem("userData");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      setMessage("Error during logout. Please try again.");
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
                    onChange={handleEmailChange}
                  />
                  <button className="edit-btn" onClick={handleUpdateAccount}>
                    Edit
                  </button>
                </div>
                <div className="detail-item">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button className="edit-btn" onClick={handleUpdateAccount}>
                    Change
                  </button>
                </div>
              </div>
            </div>
            <div className="profile-section">
              <h2>Delete Account</h2>
              <div className="detail-item">
                <input
                  type="password"
                  placeholder="Enter your password to delete account"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button className="delete-btn" onClick={handleDeleteAccount}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
