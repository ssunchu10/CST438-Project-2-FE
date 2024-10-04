import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";


// You'll need to add CSS for this component to style it according to the second image. Also, make sure to set up the routing in your main App component to use this new ProductDetail component for the /product/:id route.
// Remember to install and import the necessary routing components from react-router-dom if you haven't already done so.

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
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
        console.error('Error fetching product:', error);
        setError('Error fetching product: ' + error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">{error}</div>;
  if (!product) return null;

  return (
    <div className="product-detail-container">
      <Navbar />
      <div className="product-detail">
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-detail-image" />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">${product.price}</p>
          <p className="product-category">{product.category}</p>
          <p className="product-description">{product.description}</p>
          <div className="product-quantity">
            <button>-</button>
            <input type="number" value="1" readOnly />
            <button>+</button>
          </div>
          <button className="add-to-cart">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
