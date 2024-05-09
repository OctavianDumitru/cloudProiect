import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import AddCarModal from './AddCarModal';
import '../CSS files/GarageDashboard.css';

const GarageDashboard = () => {
  const location = useLocation();
  const userId = location?.state?.userId;
  const userName = location?.state?.userName;

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null); // For editing or adding car details

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          'https://mygarag.azurewebsites.net/api/WeatherForecast/GetCarsByUserID',
          { params: { userId } }
        );

        if (response.status === 200) {
          setCars(response.data);
        } else {
          setError('Failed to fetch the list of cars.');
        }
      } catch (error) {
        setError('An error occurred while fetching the cars.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [userId]);

  const fetchCars = async () => {
    try {
      const response = await axios.get(
        'https://mygarag.azurewebsites.net/api/WeatherForecast/GetCarsByUserID',
        { params: { userId } }
      );
      if (response.status === 200) {
        setCars(response.data);
      }
    } catch (error) {
      setError('An error occurred while fetching cars.');
    }
  };

  const openModal = (car = null) => {
    setSelectedCar(car); // Set the selected car for editing
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setSelectedCar(null); // Clear the selected car
    setIsModalOpen(false); // Close the modal
  };

  const handleAddCar = async ({ brandId, modelId }) => {
    try {
      const response = await axios.post(
        `https://mygarag.azurewebsites.net/api/WeatherForecast/AddCarToUser?UserID=${userId}&ModelID=${modelId}&BrandID=${brandId}`
      );

      if (response.status === 200) {
        fetchCars();
        closeModal();
      } else {
        setError('Failed to add the car.');
      }
    } catch (error) {
      setError('An error occurred while adding the car.');
    }
  };

  const handleEditCar = async ({ brandId, modelId }) => {
    if (!selectedCar) {
      setError('No car selected for editing.');
      return;
    }

    try {
      const response = await axios.put(
        `https://mygarag.azurewebsites.net/api/WeatherForecast/UpdateCar?RecordID=${selectedCar.recordId}&BrandID=${brandId}&ModelID=${modelId}`
      );

      if (response.status === 200) {
        fetchCars();
        closeModal();
      } else {
        setError('Failed to edit the car.');
      }
    } catch (error) {
      setError('An error occurred while editing the car.');
    }
  };

  const handleDeleteCar = async (recordId) => {
    try {
      const response = await axios.delete(
        `https://mygarag.azurewebsites.net/api/WeatherForecast/DeleteCar?RecordID=${recordId}`
      );

      if (response.status === 200) {
        fetchCars(); // Re-fetch the list of cars after deletion
      } else {
        setError('Failed to delete the car.');
      }
    } catch (error) {
      setError('An error occurred while deleting the car.');
    }
  };

  if (loading) {
    return <div className="loading">Loading cars...</div>; // Loading message
  }

  if (error) {
    return <div className="error">Error: {error}</div>; // Error message if something goes wrong
  }

  return (
    <div className="garage-dashboard">
      <Navbar onAddCar={() => openModal()} /> {/* Trigger the modal for adding */}
      <div className="content"> {/* Main content area */}
        <h1>Welcome back, {userName}</h1>
        <h2>Your Cars:</h2>
        {cars.length > 0 && typeof cars !== 'string' ? (
          <ul>
            {cars.map((car) => (
              <li key={car.recordId}>
                {car.brandName} {car.carName}
                <button onClick={() => openModal(car)}>Edit</button> {/* Edit car */}
                <button onClick={() => handleDeleteCar(car.recordId)}>Delete</button> {/* Delete car */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No cars found.</p> 
        )}
      </div>

      <AddCarModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={selectedCar ? handleEditCar : handleAddCar} // Use the same modal for add and edit
        car={selectedCar} // Pass selected car for editing
      />
    </div>
  );
};

export default GarageDashboard;
