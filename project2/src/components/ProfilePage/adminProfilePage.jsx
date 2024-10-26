import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../API/instance"; 
import "./adminProfilePage.css"; 

const AdminProfilePage = () => {
  const navigate = useNavigate(); 
  const [users, setUsers] = useState([]); 
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); 
  const [selectedUser, setSelectedUser] = useState(null); 
  const [errors, setErrors] = useState({}); 
  const [updateFormData, setUpdateFormData] = useState({ 
    email: "",
    password: "",
    is_admin: false,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/getUsers/"); // from API
      if (response.data) {
        console.log("Fetched Users:", response.data); 
        setUsers(response.data); 
      }
    } catch (error) {
      console.error("Failed to fetch users:", error); // log error
      setErrors({ general: "Failed to fetch users. Check server connection or endpoint." });
    }
  };

  const handleAdminStatusChange = async (userEmail) => {
    const user = users.find((u) => u.email === userEmail); // finding using email
    if (!user) {
      setErrors({ general: "User not found" });
      return;
    }

    try {
      const url = `/updateUser/?email=${userEmail}`; // updating user GET /updateUser/?email=testuser@example.com
      const body = { is_admin: !user.is_admin }; 
      console.log("Updating admin status:", { url, body });
      const response = await axiosInstance.patch(url, body); // PATCH request

      if (response.status === 200) {
        console.log("Admin status updated successfully"); // log success
        await fetchUsers(); // refresh
      } else {
        setErrors({ general: "Unexpected response when updating admin status." });
      }
    } catch (error) {
      console.error("Failed to update admin status:", error); // log error
      const errorMessage = error.response?.data?.detail || JSON.stringify(error.response?.data) || "Failed to update admin status.";
      setErrors({ general: `Error ${error.response?.status}: ${errorMessage}` });
    }
  };

  const handleCreateUser = () => {
    navigate("/createUserPage"); 
  };

  const handleUpdateClick = (user) => {
    setSelectedUser(user); // select user
    setUpdateFormData({
      email: user.email,
      password: "",
      is_admin: user.is_admin,
    });
    setErrors({});
    setUpdateModalOpen(true); // navigate to update modal
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user); // select user for delete
    setDeleteModalOpen(true); // nav to delete modal
  };

  const handleUpdate = async () => {
    const userEmail = selectedUser.email; //email of user to update

    try {
      console.log("Attempting to update user with email:", userEmail);
      const url = `/updateUser/?email=${userEmail}`; // GET /updateUser/?email=testuser@example.com
      const body = {
        new_email: updateFormData.email,
        is_admin: updateFormData.is_admin,
      };

      if (updateFormData.password) {
        body.password = updateFormData.password; // password optional part
      }

      console.log("Sending PATCH request:", { url, body });

      const response = await axiosInstance.patch(url, body); // PATCH request

      if (response.status === 200) {
        console.log("User updated successfully:", response.data); // log success
        await fetchUsers(); // refresh 
        setUpdateModalOpen(false); // close update modal
        setErrors({});
      } else {
        setErrors({ general: "Unexpected response from the server." });
      }
    } catch (error) {
      console.error("Error updating user:", error); // log error
      const errorMessage = error.response?.data?.detail || JSON.stringify(error.response?.data) || "Network error or server is not reachable";
      setErrors({ general: `Error ${error.response?.status}: ${errorMessage}` });
    }
  };

  const handleDelete = async () => {
    const emailToDelete = selectedUser?.email; // email to delete user

    try {
      console.log("Attempting to delete user with email:", emailToDelete);
      const url = `/deleteUser/?email=${emailToDelete}`; // OPTIONS /deleteUser/?email=testuser@example.com
      const response = await axiosInstance.delete(url); // delete req

      if (response.status === 200) {
        console.log("User deleted successfully"); // log success
        await fetchUsers(); // refresh
        setDeleteModalOpen(false); // close delete modal
      } else {
        setErrors({ general: "Unexpected server response during delete." });
      }
    } catch (error) {
      console.error("Failed to delete user:", error); // log error
      const errorMessage = error.response?.data?.detail || JSON.stringify(error.response?.data) || "Network error or server is not reachable";
      setErrors({ general: `Delete error ${error.response?.status}: ${errorMessage}` });
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")); // if user is_admin
    if (!userData?.is_admin) {
      navigate("/landing"); // directs to landing if not
    }
  }, [navigate]);

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

        {errors.general && (
          <div className="error-message" style={{ color: "red", marginBottom: "20px" }}>
            {errors.general}
          </div>
        )}

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
                  <td>********</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={user.is_admin}
                      onChange={() => handleAdminStatusChange(user.email)} // change admin status
                      className="admin-checkbox"
                    />
                  </td>
                  <td className="action-buttons">
                    <button className="update-btn" onClick={() => handleUpdateClick(user)}>
                      Update
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteClick(user)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Update Modal */}
        {updateModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Update User</h2>
              {errors.general && <p className="error-message">{errors.general}</p>}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={updateFormData.email}
                  onChange={(e) =>
                    setUpdateFormData({
                      ...updateFormData,
                      email: e.target.value,
                    })
                  }
                  className="modal-input"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label>New Password (optional)</label>
                <input
                  type="password"
                  value={updateFormData.password}
                  onChange={(e) =>
                    setUpdateFormData({
                      ...updateFormData,
                      password: e.target.value,
                    })
                  }
                  placeholder="Leave blank to keep current password"
                  className="modal-input"
                />
              </div>
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  checked={updateFormData.is_admin}
                  onChange={(e) =>
                    setUpdateFormData({
                      ...updateFormData,
                      is_admin: e.target.checked,
                    })
                  }
                  className="admin-checkbox"
                />
                <label>Admin Status</label>
              </div>
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setUpdateModalOpen(false)}>
                  Cancel
                </button>
                <button className="confirm-btn" onClick={handleUpdate}>
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {deleteModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete user: {selectedUser?.email}?</p>
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setDeleteModalOpen(false)}>
                  Cancel
                </button>
                <button className="delete-btn" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfilePage;
