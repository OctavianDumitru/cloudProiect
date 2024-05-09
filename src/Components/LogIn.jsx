import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importing axios
import '../CSS files/LogIn.css';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username === '' || password === '') {
            setError('Username and password must not be empty.');
            return;
        }

        setError(''); // Reset error message if validation passes

        try {
            // Make an API call to check user credentials
            const response = await axios.get(
                `https://mygarag.azurewebsites.net/api/WeatherForecast/GetUser`,
                {
                    params: {
                        username: username,
                        password: password,
                    },
                }
            );

            if (response.status === 200) {
                const userData = response.data; // The user data from the response
        
                // Navigate to the dashboard, passing userId and userName in state
                navigate('/dashboard', { state: { userId: userData.userId, userName: userData.userName } });
              } else {
                // If the response isn't 200, set an error message
                setError('Username or password is incorrect.');
            }
        } catch (error) {
            // Handle other errors (network issues, server errors, etc.)
            if (error.response && error.response.status === 404) {
                setError('Username does not exist.');
            } else {
                console.error('Error during login:', error);
                setError('An error occurred during login. Please try again later.');
            }
        }
    };

    const handleRegister = () => {
        navigate('/register'); // Navigates to the registration component
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>} {/* Display error message */}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder='Enter your password'
                    />
                </div>
                <div className='button-group'>
                    <button type='submit'>Log In</button>
                    <button type='button' onClick={handleRegister}>
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LogIn;
