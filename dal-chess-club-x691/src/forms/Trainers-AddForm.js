import React, { useState } from 'react';
import './AddForms.css';

function TrainersAddForm() {
  const [trainersText, setTrainersText] = useState('');
  const [trainersImage, setTrainersImage] = useState('');
  const [trainersContent, setTrainsersContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        trainersImage: 1, 
        text: trainersText,
        content: trainersContent
      };

      const response = await fetch('/api/trainers/add', { // change the path if the ports are not same (yet to decide)
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
        <h2 id="main-header">Trainers Page Add Form</h2>
        <p>This is the page where you, the admin, can manipulate content in the "Trainers" page.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-combined"></form>

      <div className="form-A">
        <form className="form-element">
          <label>Images</label>
          <input 
          className="file-form" 
          type="file"
          accept='image/*' 
          value={trainersImage} 
          onChange={(e) => setTrainersImage(e.target.value)} 
          required 
        />
        </form>
      </div>

      {/* Second Form */}
      <div className="form-B">
        <form className="form-element">
          <label>Text</label>
          <input 
          className="text-form" 
          type="text" 
          value={trainersText} 
          onChange={(e) => setTrainersText(e.target.value)} 
          required 
        />        
        </form>
      </div>

      {/* Third Form */}
      <div className="form-C">
        <form className="form-element">
          <label>Other Content</label>
          <input 
          className="text-form" 
          type="text" 
          value={trainersContent} 
          onChange={(e) => setTrainsersContent(e.target.value)} 
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

export default TrainersAddForm;