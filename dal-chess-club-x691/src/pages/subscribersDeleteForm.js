import React from 'react';
import '../styles/subscriberDeletionForm.css';

function SubscribersDeleteForm() {

  return (
    <div className="add-form-container">

      <div className="header-info">
        <h2 id="main-header">Subscriber Deletion Page</h2>
        <p>This is the page where you, the admin, can individual subscribers from the database.</p>
      </div>

      <div className="form-A">
        <form className="form-element">
          <label>Subscriber To Be Deleted Email</label>
          <input className="text-form" type="text" required />
        </form>
      </div>

      <div className="submit-button-container">
        <button type="submit">Delete</button>
      </div>

    </div>
  )
}

export default SubscribersDeleteForm;
