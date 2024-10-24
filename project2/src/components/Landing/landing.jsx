import React from "react";
import "./landing.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
const Landing = () => {
    const navigate = useNavigate();
    const handleOrder = () => {
        navigate('/products');
    }
  return (
    <div className="landing-container">
      <Navbar />
      <div className="main-content" >
        <h1>WISH LIST</h1>
        <h1>dreams come true</h1>
        <p>Turn your dreams into a clickable reality</p>
        <button className="button" onClick={handleOrder}>Order</button>
      </div>
    </div>
  );
};

export default Landing;
