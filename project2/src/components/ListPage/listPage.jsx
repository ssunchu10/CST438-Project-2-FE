import React from 'react';
import "./listPage.css";
import Navbar from "../Navbar/Navbar";

const ListPage = () => {
  const sampleItems = [
    {
      id: 1,
      item_name: "Sample Item 1",
      image_url: "https://via.placeholder.com/100"
    },
    {
      id: 2,
      item_name: "Sample Item 2",
      image_url: "https://via.placeholder.com/100"
    },
    {
      id: 3,
      item_name: "Sample Item 3",
      image_url: "https://via.placeholder.com/100"
    },
  ];

  return (
    <div className="list-container">
      <Navbar />
      <div className="scrollable-content">
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search List Items'
          />
        </div>
        <div className="list-mainContent">
          <div className='header-container'>
            <p className='title'>My List</p>
            <div className="list-stats">
              <span>{sampleItems.length} items</span>
            </div>
          </div>
          <div className='items-container'>
            {sampleItems.map(item => (
              <div key={item.id} className="list-item">
                <img src={item.image_url} alt={item.item_name} className="item-image" />
                <div className="item-details">
                  <h3>{item.item_name}</h3>
                  <button className="remove-button">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;