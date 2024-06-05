import React from 'react';
import '../styles/forgotPassword.css';
import { BASE_URL } from '../config';


function MailingList() {
  const submitForm = async () => {
    const first_name = document.getElementById('fName').value;
    const last_name = document.getElementById('lName').value;
    const email = document.getElementById('email').value;

    const data = { first_name, last_name, email };
    console.log(data);
    try {
      const response = await fetch(`${BASE_URL}/api/subscribe/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('Subscription successful' + '\n' + first_name + '\n' + last_name + '\n' + email);
      } else {
        console.log('Subscription failed');
      }
    } catch (error) {
      console.log('Error submitting data');
      console.error('Error:', error);
    }
  };

  return (
    <div className="forgotPassword-container">
      <div className="forgotPassword-header">
        <h1 id="main-header">Subscribe to Our Mailing List</h1>
        <p>Please input your email address, and we will send you any relevant news and updates.</p>
      </div>
      <div className="emailFormDiv">
        <form className="form-element">
          <label>First Name:</label>
          <input id="fName" className="emailText-form" type="text" required />
          <label>Last Name:</label>
          <input id="lName" className="emailText-form" type="text" required />
          <label>Email Address:</label>
          <input id="email" className="emailText-form" type="email" required />
        </form>
      </div>
      <div className="reset-submit-container">
        <button type="button" onClick={submitForm}>Subscribe</button>
      </div>
    </div>
  );
}

export default MailingList;
