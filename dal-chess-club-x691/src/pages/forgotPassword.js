import React from 'react';
import '../styles/forgotPassword.css';

function ForgotPassword() {

  return (
    <div className="forgotPassword-container">

      <div className="forgotPassword-header">
        <h1 id="main-header">Forgot Password</h1>
        <p>Please input your email address, thereafter we will send you a password reset email.</p>
      </div>

      <div className="emailFormDiv">
        <form className="form-element">
          <label>Email Address:</label>
          <input className="emailText-form" type="text" required />
        </form>
      </div>

      <div className="reset-submit-container">
        <button type="submit">Submit</button>
      </div>

    </div>
  )
}

export default ForgotPassword;