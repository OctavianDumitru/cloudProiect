import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS files/AddCarModal.css'; // CSS for styling the modal

const AddCarModal = ({ isOpen, onClose, onSubmit, car }) => {
  const [brandId, setBrandId] = useState(car ? car.brandId : ''); // Pre-populate if editing
  const [modelId, setModelId] = useState(car ? car.modelId : ''); // Pre-populate if editing
  const [brands, setBrands] = useState([]); // List of available car brands
  const [models, setModels] = useState([]); // List of available car models

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          'https://mygarag.azurewebsites.net/api/WeatherForecast/GetBrands'
        );
        if (response.status === 200) {
          setBrands(response.data);
        }
      } catch (error) {
        console.error('Error fetching car brands:', error);
      }
    };

    if (isOpen) {
      fetchBrands();
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchModels = async () => {
      if (brandId) {
        try {
          const response = await axios.get(
            'https://mygarag.azurewebsites.net/api/WeatherForecast/GetModels',
            { params: { brandId } }
          );
          if (response.status === 200) {
            setModels(response.data);
          }
        } catch (error) {
          console.error('Error fetching car models:', error);
        }
      }
    };

    fetchModels();
  }, [brandId]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (brandId && modelId) {
      onSubmit({ brandId, modelId }); // Submit the new or updated car
    }
  };

  if (!isOpen) {
    return null; // Don't render if the modal is not open
  }

  return (
    <div className="modal-overlay"> {/* Background overlay for modal */}
      <div className="modal"> {/* Modal content */}
        <h2>{car ? 'Edit Car' : 'Add a New Car'}</h2> {/* Conditional heading */}
        <form onSubmit={handleSubmit}> {/* Form for adding/editing car */}
          <label>
            Brand:
            <select
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)} // Update brand ID
              required
            >
              <option value="">Select a brand</option> {/* Default option */}
              {brands.map((brand) => (
                <option key={brand.brandId} value={brand.brandId}>
                  {brand.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Model:
            <select
              value={modelId}
              onChange={(e) => setModelId(e.target.value)} // Update model ID
              required
              disabled={!brandId} // Disable if no brand is selected
            >
              <option value="">Select a model</option>
              {models.map((model) => (
                <option key={model.modelId} value={model.modelId}>
                  {model.name}
                </option>
              ))}
            </select>
          </label>

          <div className="modal-buttons"> {/* Submit and Cancel buttons */}
            <button type="submit">{car ? 'Save Changes' : 'Add Car'}</button>
            <button type="button" onClick={onClose}>Cancel</button> {/* Close modal */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarModal;
