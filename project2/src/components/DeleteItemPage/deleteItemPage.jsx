import React, { useState, useEffect } from 'react';
import './deleteItemPage.css';
import Navbar from '../Navbar/Navbar';
import axiosInstance from '../../API/instance';

const DeleteItemPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/getAllItems/');
        console.log(response.data);
        setProducts(response.data);  // Ensure response.data is an array of products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error.response?.data);
        setError('Error fetching products: ' + (error.response?.data?.message || error.message));
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="delete-item-container">
      <Navbar />
      <div className="scrollable-content">
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search items to delete'
            value={searchTerm}  
            onChange={(e) => setSearchTerm(e.target.value)}  
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
            {filteredProducts.map(item => (
              <div key={item.id} className="delete-item-card">
                <div className="item-checkbox">
                  <input type="checkbox" />
                </div>
                <img src={item.image_url} alt={item.item_name} className="item-image" />
                <div className="item-info">
                  <h3>{item.item_name}</h3>
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
