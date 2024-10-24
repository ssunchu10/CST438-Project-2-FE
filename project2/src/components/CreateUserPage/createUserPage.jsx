import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createUserPage.css';

function CreateUserPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating user:', { email, password });
    setEmail('');
    setPassword('');
    alert('User created successfully!');
  };

  const handleBack = () => {
    navigate('/adminProfilePage'); 
  };

  return (
    <div className="create-user-container">
      <div className="create-user-card">
        <button className="back-button" onClick={handleBack}>
          ←
        </button>
        
        <h2>Create New User</h2>
        
        <form onSubmit={handleSubmit} className="create-user-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUserPage;