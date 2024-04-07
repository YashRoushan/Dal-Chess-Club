import React from 'react';
import './AddForms.css';
import { useLocation } from 'react-router-dom';

function AboutUsEditForm() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get('itemId');

  const handleEdit = async (itemId, positionID, status, bio, people_imageID, name) => {
    const formData = { positionID, status, bio, people_imageID, name };
    try {
        const response = await fetch(`/api/members/edit/${itemId}`, {
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
            console.error('Failed to update member');
        }
    } catch (error) {
        console.error('Error updating member:', error);
    }
};


  return (
    <div className="add-form-container">

      <div className="header-info">
        <h2 id="main-header">About Us Page Edit Form</h2>
        <p>This is the page where you, the admin, can edit existing content in the "About Us" page.</p>
      </div>

      <div className="form-A">
        <form className="form-element">
          <label>Images</label>
          <input className="file-form" type="file" accept="image/*" required />
        </form>
      </div>

      {/* Second Form */}
      <div className="form-B">
        <form className="form-element">
          <label>Text</label>
          <input className="text-form" type="text" required />
        </form>
      </div>

      {/* Third Form */}
      <div className="form-C">
        <form className="form-element">
          <label>Other Content</label>
          <input className="text-form-c" type="text" required />
        </form>
      </div>

      <div className="submit-button-container">
        <button onClick={() => handleEdit(itemId)} type="submit">Submit</button>
      </div>

    </div>
  )
}

export default AboutUsEditForm;