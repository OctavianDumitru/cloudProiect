import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importing axios
import '../CSS files/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); // New state for confirmation
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === '' || password === '' || confirmPassword === '') {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(''); // Reset error message if validation passes

    try {
      // Check if the username already exists
      const checkResponse = await axios.get(
        'https://mygarag.azurewebsites.net/api/WeatherForecast/GetUsers'
      );

      let usernameExists = false; // Variable to track if the username exists
      if (checkResponse.status === 200) {
        // Loop through the list of users to check if the username exists
        checkResponse.data.forEach((element) => {
          if (element.userName === username) {
            usernameExists = true;
          }
        });
      }

      if (usernameExists) {
        setError('Username already exists.');
        return;
      }

      // If the username doesn't exist, create a new user
      const createUserResponse = await axios.post(
        `https://mygarag.azurewebsites.net/api/WeatherForecast/AddUser?userName=${username}&password=${password}`
      );

      if (createUserResponse.status === 200) {
        // Show the confirmation message
        setShowConfirmation(true);

        // After a short delay, navigate to the login page
        setTimeout(() => {
          navigate('/');
        }, 3000); // 3-second delay
      } else {
        setError('Failed to create user. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred during registration. Please try again later.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {showConfirmation ? (
        <div className="confirmation-message">Registration successful! Redirecting to login...</div>
      ) : (
        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="error-message">{error}</div>} {/* Display error message */}
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter a username"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder='Enter a password'
            />
          </div>
          <div class="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder='Confirm your password'
            />
          </div>
          <div className='button-group'>
            <button type='submit'>Register</button>
            <button type='button' onClick={() => navigate('/')}>
              Log In
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
