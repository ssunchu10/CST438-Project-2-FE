import React, { useState } from "react";
import "./signUp.css";
import login from "../../assests/image.png";
import google from "../../assests/google.png";
import axiosInstance from "../../API/instance";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords must match",
      }));
      valid = false;
    }

    if (valid) {
      try {
        const response = await axiosInstance.post('/signup/', {
          email: formData.email,
          password: formData.password,
        });
        console.log(response.data);
        if(response.data.message === "User successfully created.") {
          navigate('/');
        }
      } catch (error) {
        console.error('Error during registration:', error.response?.data);
        if(error.response?.data.error === "User with this email already exists.") {
          setErrors((prev) => ({ ...prev, email: "User with this email already exists." }));
          valid = false;
        }
      }
    }
  };

  return (
    <div className="signUp-container">
      <img className="signUp-Image" src={login} alt="Sign Up" />
      <div className="signUp-mainContent">
        <div className="signUp-header-container">
          <p className="signUp-header">Sign Up to the Website</p>
        </div>
        <div className="signUp-google">
          <img src={google} className="signUp-googleIcon" alt="Google" />
          <p>Continue with Google</p>
        </div>

        <p>or Sign up with Email</p>

        {errors.general && (
          <p className="errors" style={{ color: "red" }}>
            {errors.general}
          </p>
        )}

        <form onSubmit={handleSubmit} className="signUp-form">
          <label>Email</label>
          <input
            className="signUp-input"
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
            className="signUp-input"
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

          <label>Confirm Password</label>
          <input
            className="signUp-input"
            type="password"
            name="confirmPassword"
            placeholder="***********"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="errors" style={{ color: "red" }}>
              {errors.confirmPassword}
            </p>
          )}

          <button className="signUp-button" type="submit">
            Sign Up
          </button>
        </form>

        <div className="signUp-footer">
          <p>
            Have an Account Already? <a href="/">Skip to Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;