import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import login from "../../assests/image.png";
import google from "../../assests/google.png";
import axiosInstance from "../../API/instance";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    setErrors({});

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      valid = false;
    }

    if (formData.email === "") {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      valid = false;
    }

    if (formData.password === "") {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      valid = false;
    }

    if (valid) {
      try {
        const response = await axiosInstance.post("/login/", {
          email: formData.email,
          password: formData.password,
        });

        console.log("Login response:", response.data);

        if (response.data.message === "Successfully logged in!") {
          localStorage.setItem('userData', JSON.stringify(response.data.data));
          setErrors({});
          navigate("/landing");
        }
      } catch (error) {
        console.error("Error during login:", error.response?.data);
        if (error.response?.data.error === "Invalid Password") {
          setErrors((prev) => ({ ...prev, password: "Invalid Password" }));
          valid = false;
        }
        if (error.response?.data.error === "User not found.") {
          setErrors((prev) => ({ ...prev, password: "User not found." }));
          valid = false;
        }
      }
    }
  };

  return (
    <div className="login-container">
      <img className="login-Image" src={login} alt="Login" />
      <div className="login-mainContent">
        <div className="login-header-container">
          <p className="login-header">Login to your Account</p>
        </div>
        <div className="login-google">
          <img src={google} className="login-googleIcon" alt="Google" />
          <p>Continue with Google</p>
        </div>

        <p>or Sign in with Email</p>

        {errors.general && (
          <p className="errors" style={{ color: "red" }}>
            {errors.general}
          </p>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <label>Email</label>
          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="mail@abc.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="errors" style={{ color: "red" }}>
              {errors.email}
            </p>
          )}

          <label>Password</label>
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="***********"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="errors" style={{ color: "red" }}>
              {errors.password}
            </p>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <p>Forgot Password?</p>
          </div>

          <button className="login-button" type="submit">
            Login
          </button>
        </form>

        <div className="login-footer">
          <p>
            Not Registered Yet? <a href="/signup">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
