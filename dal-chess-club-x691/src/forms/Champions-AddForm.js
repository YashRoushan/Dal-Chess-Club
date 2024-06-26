import React, { useState } from 'react';
import './AddForms.css';

function ChampionsAddForm() {
  const [championName, setChampionName] = useState('');
  const [championYear, setChampionYear] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        name: championName,
        year: championYear
      };

      const response = await fetch('/api/champions/add', {
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
        console.error('Failed to add champion');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="add-form-container">
      <div className="header-info">
        <h2 id="main-header">Champions Page Add Form</h2>
        <p>This is the page where you, the admin, can add new champions to the "Champions" page.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-combined">
        <div className="form-A">
          <form className="form-element">
            <label>Champion Name</label>
            <input 
              className="text-form" 
              type="text" 
              value={championName} 
              onChange={(e) => setChampionName(e.target.value)} 
              required 
            />
          </form>
        </div>

        <div className="form-B">
          <form className="form-element">
            <label>Year</label>
            <input 
              className="date-form" 
              type="text" 
              placeholder="YYYY-MM-DD"
              value={championYear} 
              onChange={(e) => setChampionYear(e.target.value)} 
              required 
            />
            <input 
              className="date-form" 
              type="date" 
              value={championYear} 
              onChange={(e) => setChampionYear(e.target.value)} 
              required 
            />
          </form>
        </div>

        <div className="submit-button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ChampionsAddForm;
