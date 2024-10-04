import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import login from "../../assests/image.png";
import google from "../../assests/google.png";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    // Validation
    const temp = formData.username;
    let flag = 0;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] === "@") {
        flag = 1;
      }

      if (i === temp.length - 1) {
        if (flag === 0) {
          setErrors((prev) => ({
            ...prev,
            username: "Enter a valid Email Address",
          }));
          valid = false;
        }
      }
    }

    if (formData.username === "") {
      setErrors((prev) => ({ ...prev, username: "Username is required" }));
      valid = false;
    }

    if (formData.password === "") {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      valid = false;
    }

    if (valid) {
      console.log(formData);
      navigate("/landing");
    }
  };

  return (
    <div className="login-container">
      <img className="loginImage" src={login} alt="Login" />
      <div className="login-mainContent">
        <div className="login-header-container">
          <p className="login-header">Login to your Account</p>
        </div>
        <div className="login-google">
          <img src={google} className="login-googleIcon" alt="Google" />
          <p>Continue with Google</p>
        </div>

        <p>or Sign in with Email</p>

        <form onSubmit={handleSubmit} className="login-form">
            <label>Email</label>
            <input
              className="login-input"
              type="text"
              name="username"
              placeholder="mail@abc.com"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="error" style={{ color: "red" }}>
                {errors.username}
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
              <p className="error" style={{ color: "red" }}>
                {errors.password}
              </p>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <p>Forgot Password?</p>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
        </form>

        <div className="login-footer">
          <p>
            Not Registered Yet? <a href="/signUp">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
