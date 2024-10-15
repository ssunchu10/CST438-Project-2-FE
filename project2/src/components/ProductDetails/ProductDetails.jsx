import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching product details: ' + error.message);
        setLoading(false);
      });
  }, [productId]);

  const handleGoBack = () => {
    navigate('/products');
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
              <img className="product-image" src={product.image} alt={product.title} />
            </div>
            <div className="product-info">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">${product.price}</p>
              <div className="product-category">
                <span>name of item</span>
              </div>
              <div className="product-category">
                <span>category</span>
                <ChevronDown className="dropdown-icon" />
              </div>
              <p className="product-description">{product.description}</p>
              <div className="product-availability">
                <span>availability: 0 in stock</span>
              </div>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="quantity-button">
                  <Minus size={16} />
                </button>
                <span className="quantity-display">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="quantity-button">
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