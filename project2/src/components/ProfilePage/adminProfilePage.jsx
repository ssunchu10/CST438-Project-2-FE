import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminProfilePage.css";

const AdminProfilePage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { id: 1, email: "user1@example.com", password: "********", is_admin: true },
    {
      id: 2,
      email: "user2@example.com",
      password: "********",
      is_admin: false,
    },
  ]);

  const handleAdminStatusChange = (userId) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return { ...user, is_admin: !user.is_admin };
        }
        return user;
      })
    );
  };

  const handleCreateUser = () => {
    navigate("/createUserPage");
  };

  return (
    <div className="admin-profile-container">
      <div className="admin-profile-content">
        <div className="header-section">
          <button className="back-btn" onClick={() => navigate("/landing")}>
            Back
          </button>
          <h1 className="title">Manage Users</h1>
          <button className="create-user-btn" onClick={handleCreateUser}>
            Create New User
          </button>
        </div>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Password</th>
                <th>Admin Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={user.is_admin}
                      onChange={() => handleAdminStatusChange(user.id)}
                      className="admin-checkbox"
                    />
                  </td>
                  <td className="action-buttons">
                    <button className="update-btn">Update</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
