import React, { useState } from "react";
import "./editItem.css";

function editItem() {
  return (
    <div className="container">
      <Navbar/> 
      <div className="main-content-container">
        <div className="image-container"></div>
        <div className="description-container">
          <h1>Item name</h1>
          <h2>$25</h2>
          <h3>name of item</h3>
          <h4>description</h4>
          <h5>availability: 0 in stock</h5>
        </div>
      </div>
    </div>
  );
}

export default editItem;
