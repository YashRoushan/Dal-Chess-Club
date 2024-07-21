import React, { useState, useEffect } from 'react';
import '../styles/tournamentRegistration.css'; 
import { BASE_URL } from '../config';

function RegistrationForm() {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cfcId: '',
    cfcRating: '',
    hasCfcId: 'no' // Additional state to track CFC ID radio button
  });

  const [tournamentsID, setTournamentsID] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('tournamentsID');
    setTournamentsID(id);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data to be sent to the server
    const dataToSend = {
      fullname: formData.name,
      email: formData.email,
      entry_date: new Date().toISOString().slice(0, 19).replace('T', ' '), // Format the date as YYYY-MM-DD HH:MM:SS
      tournamentsID: tournamentsID
    };

    // Conditionally add CFC details if "yes" is selected
    if (formData.hasCfcId === 'yes') {
      dataToSend.cfcID = formData.cfcId;
      dataToSend.cfcRating = formData.cfcRating;
    }

    console.log('Data to be sent:', dataToSend); // Add this line for debugging

    try {
      const response = await fetch(BASE_URL + '/api/registration/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        alert('Registration submitted successfully!');
      } else {
        alert('Failed to submit registration');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit registration');
    }
  };

  return (
    <div className="forgotPassword-container">
      <div className="forgotPassword-header">
        <h1>Register for the Tournament</h1>
        <p>Please fill out this form if you are interested in participating in the upcoming tournament.</p>
        <p>The survey will take approximately 5 minutes or less to complete.</p>
      </div>
      <div className="emailFormDiv">
        <form className="form-element" onSubmit={handleSubmit}>
          <input 
            name="name" 
            className="emailText-form" 
            placeholder="What is your name?" 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
          />
    
          <input 
            name="email" 
            className="emailText-form" 
            placeholder="What is your email address?" 
            value={formData.email} 
            onChange={handleInputChange} 
            required 
          />

          <div className="emailText-form">
            <label>Do you have a CFC ID?</label>
            <input 
              type="radio" 
              name="hasCfcId" 
              value="yes" 
              checked={formData.hasCfcId === 'yes'} 
              onChange={handleInputChange} 
            /> Yes
            <input 
              type="radio" 
              name="hasCfcId" 
              value="no" 
              checked={formData.hasCfcId === 'no'} 
              onChange={handleInputChange} 
            /> No
          </div>

          {formData.hasCfcId === 'yes' && (
            <>
              <input 
                name="cfcId" 
                className="emailText-form" 
                placeholder="Please state your CFC ID" 
                value={formData.cfcId} 
                onChange={handleInputChange} 
              />
              <input 
                name="cfcRating" 
                className="emailText-form" 
                placeholder="Please state your CFC regular rating" 
                value={formData.cfcRating} 
                onChange={handleInputChange} 
              />
            </>
          )}
          
          <div className="reset-submit-container">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
