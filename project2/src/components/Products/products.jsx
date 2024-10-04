import React, { useState, useEffect } from 'react';
import "./products.css";
import Navbar from "../Navbar/Navbar";
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setProducts(data);
        setFilteredProducts(data); 
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching products: ' + error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="products-container">
      <Navbar />
      <div className="scrollable-content">
        <div className='search-container'>
          <input
            type='text'
            placeholder='Enter Product to Search'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="products-mainContent">
          <div className='header-container'>
            <p className='title'>Items</p>
            <button className='sort'>Sort By</button>
          </div>
          <div className='items-container'>
            {filteredProducts.map(product => (
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
