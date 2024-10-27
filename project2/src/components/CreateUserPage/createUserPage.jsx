import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import axiosInstance from "../../API/instance";
import "./createUserPage.css";
import Navbar from "../Navbar/Navbar";

const CreateUserPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    setUserExists(false);
    
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return false;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError("");
    setUserExists(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setUserExists(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.put("/createUser/", {
        email: formData.email,
        password: formData.password,
        is_admin: formData.isAdmin,
      });

      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          isAdmin: false,
        });
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        if (error.response.data.error === 'User with this email already exists.') {
          setUserExists(true);
        } else {
          setError(error.response.data.error || "Error creating user");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-user-container">
      <Navbar />
      <div className="create-user-card">
        <button
          onClick={() => navigate("/adminProfilePage")}
          className="back-button"
          aria-label="Back to admin profile"
        >
          <ArrowLeft className="icon" />
        </button>
        
        <h2>Create New User</h2>

        {userExists && (
          <div className="alert alert-warning" role="alert">
            <AlertCircle className="icon" />
            <span>A user with this email already exists</span>
          </div>
        )}

        {error && (
          <div className="alert alert-error" role="alert">
            <AlertCircle className="icon" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success" role="alert">
            <span>User successfully created!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="create-user-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-describedby="email-error"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
              aria-describedby="password-requirements"
              placeholder="Enter password"
            />
            <p className="help-text">Password must be at least 6 characters long</p>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              aria-describedby="confirm-password-error"
              placeholder="Confirm password"
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
              aria-describedby="admin-description"
            />
            <label htmlFor="isAdmin">Admin User</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? (
              <>
                <Loader2 className="icon spinning" />
                Creating...
              </>
            ) : (
              "Create User"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserPage;