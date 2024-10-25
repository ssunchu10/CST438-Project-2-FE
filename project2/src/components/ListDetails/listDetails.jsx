import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../API/instance";
import Navbar from "../Navbar/Navbar";
import { ArrowLeft } from "lucide-react";
import "./listDetails.css";

const ListDetails = ({ listId, onClose }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(`/lists/${listId}/items/`);
        console.log(response.data);
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.response?.data);
        setError(
          "Error fetching products: " +
            (error.response?.data?.message || error.message)
        );
        setLoading(false);
      }
    };

    fetchProducts();
  }, [listId]);

  const handleGoBack = () => {
    if (onClose) {
      onClose();
    }
    navigate("/listPage", { replace: true });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!products.length)
    return <div className="no-products">No products found</div>;

  return (
    <div className="list-details-container">
      <Navbar />
      <div className="scrollable-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search items"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="items-mainContent">
          <button onClick={handleGoBack} className="go-back-button">
            <ArrowLeft size={20} />
            Back to List
          </button>
          <div className="items-container">
            {filteredProducts
              .filter((product) =>
                product.item_name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <div key={product.id} className="item-card">
                  <img
                    src={product.image_url}
                    alt={product.item_name}
                    className="item-image"
                  />
                  <div className="item-info">
                    <p className="item-title">{product.item_name}</p>
                    <p className="item-price">${product.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListDetails;
