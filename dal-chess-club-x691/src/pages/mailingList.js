import React from 'react';
import '../styles/forgotPassword.css';

function MailingList() {

  return (
    <div className="forgotPassword-container">

      <div className="forgotPassword-header">
        <h1 id="main-header">Subscribe to Our Mailing List</h1>
        <p>Please input your email address, and we will send you any relevant news and updates.</p>
      </div>

      <div className="emailFormDiv">
        <form className="form-element">
          <label>Email Address:</label>
          <input className="emailText-form" type="text" required />
        </form>
      </div>

      <div className="reset-submit-container">
        <button type="submit">Subscribe</button>
      </div>

    </div>
  )
}

export default MailingList;