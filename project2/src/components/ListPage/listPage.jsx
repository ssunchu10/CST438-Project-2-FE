import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import axiosInstance from "../../API/instance";
import "./listPage.css";

const ListPage = () => {
  const [lists, setLists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
  
    if (userData && userData.id) {
      console.log(userData.id);
      fetchLists(userData.id);
    }
  }, []);

  const fetchLists = async (userId) => {
    try {
      const response = await axiosInstance.get(`/user/${userId}/lists/`);
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  const handleCreateList = async () => {
    try {
      const response = await axiosInstance.post('/createList/', {
        name: newListName,
        is_public: isPublic,
      });
  
      if (response.status === 201) {
        setNewListName('');
        setIsPublic(false);
        setShowCreateModal(false);
        fetchLists();
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  const filteredLists = lists.filter(list => 
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="list-page">
      <Navbar />
      <div className="list-content">
        <div className="list-header">
          <input
            type="text"
            placeholder="Search lists..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            className="create-button"
            onClick={() => setShowCreateModal(true)}
          >
            + Create New List
          </button>
        </div>

        <div className="lists-grid">
          {filteredLists.map(list => (
            <div key={list.id} className="list-card">
              <div className="list-card-header">
                <h3>{list.name}</h3>
                {list.is_public && (
                  <span className="public-badge">Public</span>
                )}
              </div>
              <div className="list-card-content">
                <p className="items-count">{list.items?.length || 0} items</p>
                <button 
                  className="view-button"
                  onClick={() => window.location.href = `/list/${list.id}`}
                >
                  View List
                </button>
              </div>
            </div>
          ))}
        </div>

        {showCreateModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Create New List</h2>
                <button 
                  className="close-button"
                  onClick={() => setShowCreateModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-content">
                <input
                  type="text"
                  placeholder="List name"
                  className="modal-input"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                  <label htmlFor="isPublic">Make list public</label>
                </div>
                <button 
                  className="create-list-button"
                  onClick={handleCreateList}
                >
                  Create List
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPage;