import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./products.css";
import axiosInstance from "../../API/instance";
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
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/getAllItems/');
        console.log(response.data);
        setProducts(response.data);
        setFilteredProducts(response.data);
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
    const hash = location.hash.slice(1);
    if (hash) {
      setSelectedProductId(Number(hash));
    }
  }, [location.hash]);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    navigate(`/products/#${productId}`);
  };

  const handleCloseProductDetails = () => {
    setSelectedProductId(null);
    navigate('/products', { replace: true });
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
                <img src={product.image_url} alt={product.title} className="product-image" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;