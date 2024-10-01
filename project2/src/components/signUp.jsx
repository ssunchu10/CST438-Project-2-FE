import React from "react";
import "./login.css";
import login from "../assests/image.png";
import google from "../assests/google.png"

const SignUp = () => {
  return (
    <div className="container">
      <img className="loginImage" src={login}></img>
      <div className="mainContent">
        <div className="header-container">
          <p className="header">Sign Up to the Website</p>
        </div>  
        <div className="google">
          <img src={google} className="googleIcon" alt="Google" />
          <p>Continue with Google</p>
        </div>

        <p>or Sign up with Email</p>

        <div className="form    ">
          <label>Email</label>
          <input type="text" placeholder="mail@abc.com" />

          <label>Password</label>
          <input type="password" placeholder="***********" />

          <label>Confirm Password</label>
          <input type="password" placeholder="***********" />

          <button>Login</button>
        </div>

        <div className="footer">
          <p>Have an Account Already? <a href="/">Skip to Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;