import React, { useState } from 'react';

function ResetPassword() {
  const [tempPassword, setTempPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your reset password logic here
  };

  return (
    <div className="resetPassword-container">
      <div className="resetPassword-header">
        <h1 id="main-header">Reset Password</h1>
        <p>Please enter the password received in your email and reset your password.</p>
      </div>

      <div className="passwordFormDiv">
        <form className="form-element" onSubmit={handleSubmit}>
          <label>Password In Email:</label>
          <input
            className="passwordText-form"
            type="password"
            required
            value={tempPassword}
            onChange={(e) => setTempPassword(e.target.value)}
          />
          <label>New Password:</label>
          <input
            className="passwordText-form"
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label>Confirm Password:</label>
          <input
            className="passwordText-form"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="reset-submit-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>

      {message && <div className='message'>{message}</div>}
    </div>
  );
}

export default ResetPassword;
