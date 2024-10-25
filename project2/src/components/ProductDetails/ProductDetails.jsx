import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../API/instance";
import Navbar from "../Navbar/Navbar";
import { Minus, Plus, ArrowLeft } from "lucide-react";
import "./ProductDetails.css";

const ProductDetails = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [lists, setLists] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance.get(`/items/${productId}/`);
        console.log("Product details:", response.data);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error.response?.data);
        setError(
          "Error fetching product details: " +
            (error.response?.data?.message || error.message)
        );
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddProductToList = async (listID) => {
    try {
      const response = await axiosInstance.post(`/lists/${listID}/addEntry/`, {
        list: listID,
        item: productId
      });

      console.log(response.data)
  
      if (response.status === 201) {
        setShowCreateModal(false);
        alert("Added to List Successfully");
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error Adding Product to the list:', error);
    }
  }

  const fetchLists = async (userId) => {
    try {
      const response = await axiosInstance.get(`/user/${userId}/lists/`);
      console.log(response.data);
      setLists(response.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.id) {
      setUserInfo(userData);
      fetchLists(userData.id);
    }
  }, []);

  const handleAddToCart = () => {
    setShowCreateModal(true);
    fetchLists(userInfo.id);
  };

  const handleGoBack = () => {
    if (onClose) {
      onClose();
    }
    navigate("/products", { replace: true });
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
              <img
                className="product-image"
                src={product.image_url}
                alt={product.item_name}
              />
            </div>
            <div className="product-info">
              <h2 className="product-title">{product.item_name}</h2>
              <p className="product-price">${product.price}</p>
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
                <button
                  className="add-to-cart-button"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
        {showCreateModal && (
          <div className="modal-overlay">
            <div className="addToCart-modal">
              <div className="modal-header">
                <h2>Add to List</h2>
                <button
                  className="close-button"
                  onClick={() => setShowCreateModal(false)}
                >
                  ×
                </button>
              </div>

              <div className="addToCart-lists-grid">
                {lists.map((list) => (
                  <div key={list.id} className="addToCart-list-card">
                    <div className="list-card-header">
                      <h3>{list.name}</h3>
                      {list.is_public && (
                        <span className="public-badge">Public</span>
                      )}
                    </div>
                    <div className="list-card-content">
                      <p className="items-count">
                        {list.items?.length || 0} items
                      </p>
                      <button
                        className="view-button"
                        onClick={() => handleAddProductToList(list.id)}
                      >
                        Add to List
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
