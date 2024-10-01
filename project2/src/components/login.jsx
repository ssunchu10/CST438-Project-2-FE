import React, { useState } from "react";
import "./login.css";
import login from "../assests/image.png";
import google from "../assests/google.png";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    // Validation
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
    }
  };

  return (
    <div className="container">
      <img className="loginImage" src={login} alt="Login" />
      <div className="mainContent">
        <div className="header-container">
          <p className="header">Login to your Account</p>
        </div>
        <div className="google">
          <img src={google} className="googleIcon" alt="Google" />
          <p>Continue with Google</p>
        </div>

        <p>or Sign in with Email</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="username"
              placeholder="mail@abc.com"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="***********"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="button">Login</button>
          </div>
        </form>

        <div className="footer">
          <p>
            Not Registered Yet? <a href="/signUp">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
