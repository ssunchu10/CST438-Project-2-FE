import React, { useState } from "react";
import "./login.css";
import login from "../assests/image.png";
import google from "../assests/google.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords must match" }));
      valid = false;
    }

    if (valid) {
      console.log(formData);
    }
  };

  return (
    <div className="container">
      <img className="loginImage" src={login} alt="Login"></img>
      <div className="mainContent">
        <div className="header-container">
          <p className="header">Sign Up to the Website</p>
        </div>
        <div className="google">
          <img src={google} className="googleIcon" alt="Google" />
          <p>Continue with Google</p>
        </div>

        <p>or Sign up with Email</p>

        <div className="form">
          <label>Email</label>
          <input
            type="text"
            name="username"
            placeholder="mail@abc.com"
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="***********"
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="***********"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          <button onClick={handleSubmit}>Sign Up</button>
        </div>

        <div className="footer">
          <p>
            Have an Account Already? <a href="/">Skip to Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
