import React, { useState } from 'react';
import './AddForms.css';

function AddFormAboutUs() {
  const [executiveName, setExecutiveName] = useState('');
  const [memberImage, setMemberImage] = useState('');
  const [memberDescription, setMemberDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        positionID: 1, 
        status: 0, 
        bio: memberDescription,
        people_imageID: memberImage,
        name: executiveName
      };

      const response = await fetch('/api/members/add', { // change the path if the ports are not same (yet to decide)
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result) {
        console.log(result);
      } else {
        console.error('Failed to add member');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="add-form-container">

      <div className="header-info">
        <h2 id="main-header">About Us Page Add Form</h2>
        <p>This is the page where you, the admin, can manipulate content in the "About Us" page.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-combined"></form>

      <label>Executive's Name</label>
        <input 
          className="text-form" 
          type="text" 
          value={executiveName} 
          onChange={(e) => setExecutiveName(e.target.value)} 
          required 
        />

      {/* Second Form */}
      <label>Member Image</label>
        <input 
          className="text-form" 
          type="text" 
          value={memberImage} 
          onChange={(e) => setMemberImage(e.target.value)} 
          required 
        />

      {/* Third Form */}
      <label>Member Description</label>
        <input 
          className="text-form-c" 
          type="text" 
          value={memberDescription} 
          onChange={(e) => setMemberDescription(e.target.value)} 
          required 
        />

        <div className="submit-button-container">
          <button type="submit">Submit</button>
        </div>
    </div>
  )
}

export default AddFormAboutUs;