import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../API/instance";
import Navbar from '../Navbar/Navbar';
import { Minus, Plus, ChevronDown, ArrowLeft } from 'lucide-react';
import './ProductDetails.css';

const ProductDetails = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance.get(`/items/${productId}/`);
        console.log('Product details:', response.data);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error.response?.data);
        setError('Error fetching product details: ' + (error.response?.data?.message || error.message));
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleGoBack = () => {
    // First call the onClose prop to update parent state
    if (onClose) {
      onClose();
    }
    // Then navigate
    navigate('/products', { replace: true });
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="no-product">No product found</div>;

  return (
    <div className="product-details-container">
      <Navbar />
      <div className="product-details-content">
        <button onClick={handleGoBack} className="go-back-button">
          <ArrowLeft size={20} />
          Back to Products
        </button>
        <div className="product-card">
          <div className="product-layout">
            <div className="product-image-container">
              <img className="product-image" src={product.image_url} alt={product.item_name} />
            </div>
            <div className="product-info">
              <h2 className="product-title">{product.item_name}</h2>
              <p className="product-price">${product.price}</p>
              <div className="product-category">
                <span>{product.item_name}</span>
              </div>
              <div className="product-category">
                <span>category</span>
                <ChevronDown className="dropdown-icon" />
              </div>
              <p className="product-description">{product.description}</p>
              <div className="product-availability">
                <span>availability: {product.quantity} in stock</span>
              </div>
              <div className="quantity-selector">
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)} 
                  className="quantity-button"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)} 
                  className="quantity-button"
                  disabled={quantity >= product.quantity}
                >
                  <Plus size={16} />
                </button>
                <button className="add-to-cart-button">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;