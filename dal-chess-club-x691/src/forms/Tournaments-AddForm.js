import React, { useState } from 'react';
import './AddForms.css';

function TournamentsAddForm() {
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentImage, setTournamentImage] = useState('');
  const [tournamentDescrip, setTournamentDescrip] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        tournamentImage: 1, 
        title: tournamentName,
        description: tournamentDescrip
      };

      const response = await fetch('/api/tournaments/add', { // change the path if the ports are not same (yet to decide)
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
        <h2 id="main-header">Tournaments Page Add Form</h2>
        <p>This is the page where you, the admin, can manipulate content in the "Tournaments" page.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-combined"></form>

      <div className="form-A">
        <form className="form-element">
          <label>Tournament Name</label>
          <input 
          className="text-form" 
          type="text" 
          value={tournamentName} 
          onChange={(e) => setTournamentName(e.target.value)} 
          required 
        />
        </form>
      </div>

      {/* Second Form */}
      <div className="form-B">
        <form className="form-element">
          <label>Tournament Image</label>
          <input 
          className="file-form" 
          type="file"
          accept='image/*' 
          value={tournamentImage} 
          onChange={(e) => setTournamentImage(e.target.value)} 
          required 
        />
        </form>
      </div>

      {/* Third Form */}
      <div className="form-C">
        <form className="form-element">
          <label>Tournament Description</label>
          <input 
          className="text-form" 
          type="text" 
          value={tournamentDescrip} 
          onChange={(e) => setTournamentDescrip(e.target.value)} 
          required 
        />
        </form>
      </div>

      <div className="submit-button-container">
        <button type="submit">Submit</button>
      </div>

    </div>
  )
}

export default TournamentsAddForm;