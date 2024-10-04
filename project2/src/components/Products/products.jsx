import React, { useState, useEffect } from 'react';
import "./products.css";
import Navbar from "../Navbar/Navbar";
import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched Products:', data); 
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Error fetching products: ' + error.message);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="products-container">
      <Navbar />
      <div className="scrollable-content">
        <div className='search-container'>
          <input type='text' placeholder='Enter Product to Search'/>
        </div>
        <div className="products-mainContent">
          <div className='header-container'>
            <p className='title'>Items</p>
            <button className='sort'>Sort By</button>
          </div>
          <div className='items-container'>
            {products.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="product-item">
                <img src={product.image} alt={product.title} className="product-image" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
