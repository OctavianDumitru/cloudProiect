import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS files/Navbar.css'

const Navbar = ({ onAddCar }) => {
    const navigate = useNavigate(); // Navigation hook
  
    const handleLogout = () => {
      navigate('/'); // Navigate to the login component
    };
  
    return (
      <nav className="navbar">
        <div className="navbar-title">My Garage Dashboard</div>
        <div className="navbar-buttons"> {/* Container for navbar buttons */}
          <button className="add-car-button" onClick={onAddCar}>
            Add Car
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
