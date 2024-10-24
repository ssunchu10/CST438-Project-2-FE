import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../API/instance";
import "./addItemPage.css";
import Navbar from "../Navbar/Navbar";

const AddItemPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item_name: '',
    description: '',
    image_url: '',
    price: '',
    quantity: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post('/addItem/', formData, {
      });
      if (response.data) {
        navigate('/products');
      }
    } catch (error) {
      alert('Error adding item: ' + (error.response?.data?.message || 'Please try again'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="add-item-container">
      <Navbar />
      <div className="scrollable-content">
        <div className="add-item-mainContent">
          <div className="header-container">
            <p className="title">Add New Item</p>
          </div>
          
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="item-details-section">
              <div className="input-group">
                <label htmlFor="item_name">Item Name *</label>
                <input
                  type="text"
                  id="item_name"
                  name="item_name"
                  value={formData.item_name}
                  onChange={handleInputChange}
                  placeholder="Enter item name"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter item description"
                  rows="4"
                />
              </div>

              <div className="input-group">
                <label htmlFor="image_url">Image URL</label>
                <input
                  type="url"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </div>

              <div className="input-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  step="1.00"
                  min="0"
                />
              </div>

              <div className="input-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter quantity"
                  min="0"
                  step="1"
                />
              </div>

              <div className="button-group">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding...' : 'Add Item'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;