import React, { useState, useEffect } from "react";
import "./profilePage.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../API/instance";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [email, setEmail] = useState(userData ? userData.email : "");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (userData) {
      setUserId(userData.id);
    }else {
      alert("User not Logged in");
      navigate("/");
    }
  }, [navigate, userData]);

  if (!userData) return null;

  const username = userData.email.split("@")[0];
  const capitalizedUsername =
    username.charAt(0).toUpperCase() + username.slice(1);

  const handleLogout = () => {
    alert("Successfully Logged Out!");
    localStorage.removeItem("userData");
    navigate("/");
  };


  const handleUpdate = async () => {
    const updateData = { user_id: userId }; 

    if (email !== userData.email && email.trim() !== "") {
      updateData.email = email;
    }
    if (password) {
      updateData.password = password;
    }
    if (Object.keys(updateData).length === 1) {
      alert("No changes to update.");
      return;
    }
    try {
      const response = await axiosInstance.patch("/updateAccount/", updateData);
      if (response.status === 200) {
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...userData, ...updateData })
        );
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) {
      return; 
    }
    try {
      const response = await axiosInstance.delete(`/deleteAccount/${userId}/`);
      if (response.status === 200) {
        localStorage.removeItem("userData");
        alert("Account Deleted Successfully");
        navigate("/")
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account");
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
