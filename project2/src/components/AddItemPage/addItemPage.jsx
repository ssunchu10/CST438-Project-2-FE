import React from 'react';
import "./addItemPage.css";
import Navbar from "../Navbar/Navbar";

const AddItemPage = () => {
  return (
    <div className="add-item-container">
      <Navbar />
      <div className="scrollable-content">
        <div className="add-item-mainContent">
          <div className='header-container'>
            <p className='title'>Add New Item</p>
          </div>
          
          <div className="form-container">
            <div className="image-upload-section">
              <div className="image-preview">
                <div className="upload-placeholder">
                  <i className="upload-icon">📁</i>
                  <p>Click to upload image</p>
                  <span className="file-info">PNG, JPG up to 10MB</span>
                </div>
                <input type="file" className="file-input" accept="image/*" />
              </div>
            </div>

            <div className="item-details-section">
              <div className="input-group">
                <label>Item Name</label>
                <input type="text" placeholder="Enter item name" />
              </div>

              <div className="input-group">
                <label>Category</label>
                <select>
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="input-group">
                <label>Description</label>
                <textarea 
                  placeholder="Enter item description"
                  rows="4"
                ></textarea>
              </div>

              <div className="input-group">
                <label>Price</label>
                <input type="number" placeholder="Enter price" step="0.01" />
              </div>

              <div className="button-group">
                <button className="cancel-button">Cancel</button>
                <button className="submit-button">Add Item</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;