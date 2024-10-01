import React from "react";
import "./login.css";
import login from "../assests/image.png";
import google from "../assests/google.png"

const Login = () => {
  return (
    <div className="container">
      <img className="loginImage" src={login}></img>
      <div className="mainContent">
        <div className="header-container">
          <p className="header">Login to your Account</p>
        </div>  
        <div className="google">
          <img src={google} className="googleIcon" alt="Google" />
          <p>Continue with Google</p>
        </div>

        <p>or Sign in with Email</p>

        <div>
          <label>Email</label>
          <input type="text" placeholder="mail@abc.com" />

          <label>Password</label>
          <input type="password" placeholder="***********" />

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <a href="#">Forgot Password?</a>
          </div>

          <button className="button">Login</button>
        </div>

        <div className="footer">
          <p>Not Registered Yet? <a href="/signUp">Create an account</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;