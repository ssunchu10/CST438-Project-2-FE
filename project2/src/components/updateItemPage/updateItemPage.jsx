import React, { useState, useEffect } from 'react';
import './updateItemPage.css';
import Navbar from '../Navbar/Navbar';
import axiosInstance from '../../API/instance';

const UpdateItemPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    item_name: '',
    price: '',
    quantity: '',
    description: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/getAllItems/');
        console.log(response.data);
        setProducts(response.data);
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

  const handleUpdateClick = (item) => {
    setSelectedItem(item);
    setUpdateFormData({
      item_name: item.item_name,
      price: item.price,
      quantity: item.quantity,
      description: item.description
    });
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(`/items/${selectedItem.id}/update/`, updateFormData);
      
      const updatedProducts = products.map(product => 
        product.id === selectedItem.id 
          ? { ...product, ...updateFormData }
          : product
      );
      setProducts(updatedProducts);
      
      setShowUpdateModal(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Error updating item: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="delete-item-container">
      <Navbar />
      <div className="scrollable-content">
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search items to update'
            value={searchTerm}  
            onChange={(e) => setSearchTerm(e.target.value)}  
          />
        </div>
        
        <div className="delete-item-mainContent">
          <div className='header-container'>
            <p className='title'>Update Items</p>
          </div>

          <div className="items-grid">
            {filteredProducts.map(item => (
              <div key={item.id} className="delete-item-card">
                <img src={item.image_url} alt={item.item_name} className="item-image" />
                <div className="item-info">
                  <h3>{item.item_name}</h3>
                  <p className="item-price">${item.price}</p>
                  <p className="item-quantity">Quantity: {item.quantity}</p>
                </div>
                <button 
                  className="quick-update-button"
                  onClick={() => handleUpdateClick(item)}
                >
                  Update
                </button>
              </div>
            ))}
          </div>
        </div>

        {showUpdateModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className="modal-title">Update Item</h2>
              <form onSubmit={handleUpdateSubmit}>
                <div className="form-group">
                  <label>Item Name</label>
                  <input
                    type="text"
                    name="item_name"
                    className="cancel-button"
                    value={updateFormData.item_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    className="cancel-button"
                    value={updateFormData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    className="cancel-button"
                    value={updateFormData.quantity}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="cancel-button"
                    value={updateFormData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-buttons">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="update-button">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateItemPage;