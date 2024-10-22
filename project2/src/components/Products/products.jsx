import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./products.css";
import Navbar from "../Navbar/Navbar";
import ProductDetails from "../ProductDetails/ProductDetails"; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
    // Check if there's a product ID in the URL on component mount
    const hash = location.hash.slice(1);
    if (hash) {
      setSelectedProductId(Number(hash));
    }
  }, [location]);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    navigate(`/products/#${productId}`);
  };

  const handleCloseProductDetails = () => {
    setSelectedProductId(null);
    navigate('/products');
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">{error}</div>;

  if (selectedProductId) {
    return <ProductDetails productId={selectedProductId} onClose={handleCloseProductDetails} />;
  }

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
              <div key={product.id} className="product-item" onClick={() => handleProductClick(product.id)}>
                <img src={product.image} alt={product.title} className="product-image" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;