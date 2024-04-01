import React, { useState } from 'react';
import '../styles/forgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/emailVer', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      const data = await response.json();
      if(data.exists) {
        setMessage('Email exists in admin table');
        //window.location.href = "/chessclub/resetPassword";
      } else {
        setMessage('Email does not exist in admin table');
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setMessage('Error checking email.');
    }
  }

  return (
    <div className="forgotPassword-container">

      <div className="forgotPassword-header">
        <h1 id="main-header">Forgot Password</h1>
        <p>Please input your email address, thereafter we will send you a password reset email.</p>
      </div>

      <div className="emailFormDiv">
        <form className="form-element" onSubmit={handleSubmit}>
          <label>Email Address:</label>
          <input className="emailText-form" type="text" required value={email} onChange={(e) => setEmail(e.target.value)}/>
          <div className="reset-submit-container">
            <button type="submit">Submit</button>
        </div>
        </form>
      </div>

      <h1>Message:</h1>
      {message && <div className='message'>{message}</div>}
    </div>
  )
}

export default ForgotPassword;