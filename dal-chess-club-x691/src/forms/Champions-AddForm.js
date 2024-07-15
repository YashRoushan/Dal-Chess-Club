import React, { useState } from 'react';
import './AddForms.css';
import { BASE_URL } from "../config";

function ChampionsAddForm() {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [successMessage, setSuccessMessage] = useState('');
  const [championName, setChampionName] = useState('');
  const [championYear, setChampionYear] = useState(getCurrentDate());

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        name: championName,
        year: championYear
      };

      const response = await fetch(`${BASE_URL}/api/champions/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result) {
        console.log(result);
        setChampionName("Champion added successfully");
      } else {
        console.error('Failed to add champion');
        setSuccessMessage('Failed to add champion');
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

        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="form-combined">
          <div className="form-A">
            <div className="form-element">
              <label>Champion Name</label>
              <input
                  className="text-form"
                  type="text"
                  value={championName}
                  onChange={(e) => setChampionName(e.target.value)}
                  required
              />
            </div>
          </div>

          <div className="form-B">
            <div className="form-element">
              <label>Year</label>
              <input
                  className="date-form"
                  type="date"
                  value={championYear}
                  onChange={(e) => setChampionYear(e.target.value)}
                  required
              />
            </div>
          </div>

          <div className="submit-button-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
  );
}

export default ChampionsAddForm;
