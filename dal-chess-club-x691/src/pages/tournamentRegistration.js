import React, { useState } from 'react';
import '../styles/tournamentRegistration.css'; 

function RegistrationForm() {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cfcId: '',
    cfcRating: '',
    hasCfcId: 'no', // Additional state to track CFC ID radio button
    paymentMethod: '',
    emailList: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the data to be sent to the server, excluding CFC details if "no" is selected
    const dataToSend = {
      fullname: formData.name,
      email: formData.email,
      entryDate: new Date().toISOString().slice(0, 10) // Format the date as YYYY-MM-DD
    };

    // Conditionally add CFC details if "yes" is selected
    if (formData.hasCfcId === 'yes') {
      dataToSend.cfcID = formData.cfcId;
      dataToSend.cfcRating = formData.cfcRating;
    }

    fetch('http://localhost:5001/api/registration/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
      alert('Registration submitted successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to submit registration');
    });
  };

  return (
    <div className="forgotPassword-container">
      <div className="forgotPassword-header">
        <h1>Register for the Tournament</h1>
        <p>Please fill out this form if you are interested in participating in the upcoming tournament.</p>
      </div>
      <div className="emailFormDiv">
        <form className="form-element" onSubmit={handleSubmit}>
          <input
            name="name"
            className="emailText-form"
            placeholder="What is your name?"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            name="email"
            className="emailText-form"
            placeholder="What is your email address?"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
          <div className="emailText-form">
            <label>Do you have a CFC ID?</label>
            <input type="radio" name="hasCfcId" value="yes" onChange={handleInputChange} /> Yes
            <input type="radio" name="hasCfcId" value="no" checked={formData.hasCfcId === 'no'} onChange={handleInputChange} /> No
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
          <div className="emailText-form">
            <label>How will you be paying your entry fee?</label>
            <input
              type="radio"
              name="paymentMethod"
              value="e-transfer"
              onChange={handleInputChange}
            /> E-transfer to chess@dal.ca (Please write the name of the participant when sending the fee).
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              onChange={handleInputChange}
            /> With cash on the day of the tournament. Please note that if you are paying with cash, change will not be provided.
          </div>
          <div className="emailText-form">
            <label>Would you like to be added to our email list, so that we can better inform you of future events?</label>
            <input type="radio" name="emailList" value="already" onChange={handleInputChange} /> Already on the list
            <input type="radio" name="emailList" value="yes" onChange={handleInputChange} /> Yes
            <input type="radio" name="emailList" value="no" onChange={handleInputChange} /> No
          </div>
          <div className="reset-submit-container">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;





