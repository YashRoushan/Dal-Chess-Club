import React from 'react';
import '../styles/subscriberDeletionForm.css';
import axios from 'axios';
import { BASE_URL } from '../config';

function SubscribersDeleteForm() {
  const params = new URLSearchParams(window.location.search);
  const id  = params.get('id');
  const email  = params.get('email');
  console.log(id + " " + email);
  
  function onDelete () {
    let iEmail = document.getElementById("email").value;
    console.log(iEmail);
    if (email === iEmail && id) {
      console.log(JSON.stringify({ id: id } ));
      fetch(`${BASE_URL}/api/subscribers/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
      });
    }
  }
  return (
    <div className="add-form-container">

      <div className="header-info">
        <h2 id="main-header">Subscriber Deletion Page</h2>
        <p>This is the page where you, the admin, can individual subscribers from the database.</p>
      </div>

      <div className="form-A">
        <form className="form-element">
          <label>Subscriber To Be Deleted Email</label>
          <input className="text-form" type="text" id = "email" required />
        </form>
      </div>

      <div className="submit-button-container">
        <button type="submit" onClick={onDelete}>Delete</button>
      </div>

    </div>
  )
}

export default SubscribersDeleteForm;

