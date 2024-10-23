import React from 'react';
import "./profilePage.css";
import Navbar from "../Navbar/Navbar";

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <Navbar />
      <div className="scrollable-content">
        <div className="profile-mainContent">
          <div className="profile-header">
            <div className="profile-info">
              <h1>Username</h1>
            </div>
          </div>

          <div className="profile-sections">
            <div className="profile-section">
              <h2>Account Details</h2>
              <div className="details-group">
                <div className="detail-item">
                  <label>Username</label>
                  <input type="text" value="erm" readOnly />
                  <button className="edit-btn">Edit</button>
                </div>
                <div className="detail-item">
                  <label>Email</label>
                  <input type="email" value="erm@example.com" readOnly />
                  <button className="edit-btn">Edit</button>
                </div>
                <div className="detail-item">
                  <label>Password</label>
                  <input type="password" value="********" readOnly />
                  <button className="edit-btn">Change</button>
                </div>
              </div>
            </div>
                </div>
              </div>
            </div>
          </div>
  );
};

export default ProfilePage;