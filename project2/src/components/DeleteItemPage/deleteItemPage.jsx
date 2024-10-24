import React from 'react';
import "./deleteItemPage.css";
import Navbar from "../Navbar/Navbar";

const DeleteItemPage = () => {
  // Sample data for demonstration
  const sampleItems = [
    {
      id: 1,
      item_name: "Sample Item 1",
      image_url: "https://via.placeholder.com/200",
      category: "Electronics",
      price: "$999.99"
    },
    {
      id: 2,
      item_name: "Sample Item 2",
      image_url: "https://via.placeholder.com/200",
      category: "Clothing",
      price: "$59.99"
    },
    // Add more sample items as needed
  ];

  return (
    <div className="delete-item-container">
      <Navbar />
      <div className="scrollable-content">
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search items to delete'
          />
        </div>
        
        <div className="delete-item-mainContent">
          <div className='header-container'>
            <p className='title'>Delete Items</p>
            <div className="selection-controls">
              <button className="select-all-button">Select All</button>
              <button className="delete-selected-button">Delete Selected (0)</button>
            </div>
          </div>

          <div className="items-grid">
            {sampleItems.map(item => (
              <div key={item.id} className="delete-item-card">
                <div className="item-checkbox">
                  <input type="checkbox" />
                </div>
                <img src={item.image_url} alt={item.item_name} className="item-image" />
                <div className="item-info">
                  <h3>{item.item_name}</h3>
                  <p className="item-category">{item.category}</p>
                  <p className="item-price">{item.price}</p>
                </div>
                <button className="quick-delete-button">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemPage;