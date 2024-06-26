import React, { useState, useEffect } from 'react';
import './AddForms.css';
import { useLocation } from 'react-router-dom';

function ChampionsEditForm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get('itemId');

  const [championName, setChampionName] = useState('');
  const [championYear, setChampionYear] = useState('');

  useEffect(() => {
    const fetchChampion = async () => {
      try {
        const response = await fetch(`/api/champions/${itemId}`);
        const result = await response.json();
        if (result) {
          setChampionName(result.name);
          setChampionYear(result.year);
        }
      } catch (error) {
        console.error('Error fetching champion:', error);
      }
    };

    fetchChampion();
  }, [itemId]);

  const handleEdit = async () => {
    const formData = { name: championName, year: championYear };
    try {
      const response = await fetch(`/api/champions/edit/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result) {
        console.log(result);
      } else {
        console.error('Failed to update champion');
      }
    } catch (error) {
      console.error('Error updating champion:', error);
    }
  };

  return (
    <div className="add-form-container">

      <div className="header-info">
        <h2 id="main-header">Champions Page Edit Form</h2>
        <p>This is the page where you, the admin, can edit existing champions in the "Champions" page.</p>
      </div>

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
            type="date" 
            value={championYear} 
            onChange={(e) => setChampionYear(e.target.value)} 
            required 
          />
        </form>
      </div>

      <div className="submit-button-container">
        <button onClick={handleEdit} type="submit">Submit</button>
      </div>

    </div>
  );
}

export default ChampionsEditForm;
