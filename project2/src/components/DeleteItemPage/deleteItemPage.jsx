import React, { useState, useEffect } from "react";
import "./deleteItemPage.css";
import Navbar from "../Navbar/Navbar";
import axiosInstance from "../../API/instance";

const DeleteItemPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/getAllItems/");
        console.log(response.data);
        setProducts(response.data);
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
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      await axiosInstance.delete(`/items/${itemToDelete.id}/delete/`);
      setProducts(products.filter((product) => product.id !== itemToDelete.id));
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error(
        "Error deleting item:",
        error.response?.data || error.message
      );
      setError(
        "Error deleting item: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="delete-item-container">
      <Navbar />
      <div className="scrollable-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search items to delete"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="delete-item-mainContent">
          <div className="header-container">
            <p className="title">Delete Items</p>
          </div>

          <div className="items-grid">
            {filteredProducts.map((item) => (
              <div key={item.id} className="delete-item-card">
                <img
                  src={item.image_url}
                  alt={item.item_name}
                  className="item-image"
                />
                <div className="item-info">
                  <h3>{item.item_name}</h3>
                  <p className="item-price">{item.price}</p>
                </div>
                <button
                  className="quick-delete-button"
                  onClick={() => handleDeleteClick(item)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {isDeleteDialogOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2 className="modal-title">Confirm Deletion</h2>
                <p className="modal-message">
                  Are you sure you want to delete "{itemToDelete?.item_name}"?
                </p>
                <p className="modal-message">This action cannot be undone.</p>
                <div className="modal-buttons">
                  <button
                    className="modal-button cancel-button"
                    onClick={handleCancelDelete}
                  >
                    Cancel
                  </button>
                  <button
                    className="modal-button delete-button"
                    onClick={handleConfirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteItemPage;
