/*
FOR NEXT YEAR:
base code for reset password page. Some issues with url search params that was not able to be fixed. I suggest that you either try and fix
it or just simply use a different method to get the different parts of the URL (Recommended)
*/
import React, { useState, useEffect } from 'react';
import '../styles/resetPassword.css';
import { URLSearchParams } from 'url-search-params';

function ResetPassword() {
    const [isValidToken, setIsValidToken] = useState(false);

    useEffect(() => {
        async function verifyToken() {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const adminID = urlParams.get('adminID');
                const token = urlParams.get('token');
                const response = await fetch(`/verifyToken?adminID=${adminID}&token=${token}`);
                const data = await response.json();
                setIsValidToken(data.exists);
                if(!data.exists) {
                    window.location.href = "/chessclub/forgotPassword";
                }
            } catch (error) {
                console.error('Error verifying token:', error);
            }
        }
        verifyToken();
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = e.target.elements.newPassword.value;
    const confirmPassword = e.target.elements.confirmPassword.value;

    if(newPassword !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    if(!isValidToken) {
        alert('Invalid token');
        return;
    }

    try {
        const responseTo = await fetch('/resetPasswordAPI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                adminID: e.target.elements.adminID.value,
                token: e.target.elements.token.value,
                newPassword
            })
        });
        const data = await responseTo.json();
        if(data.success) {
            alert('Password reset successful');
            window.location.href = "/chessclub/adminLogin";
        } else {
            alert('Error resetting password');
        }
    } catch (error) {
        console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="resetPassword-container">

      <div className="resetPassword-header">
        <h1 id="main-header">Reset Password</h1>
        <p>Please enter a new password.</p>
      </div>

      <div className="passwordFormDiv">
        <form className="form-element" onSubmit={handleSubmit}>
            <input type='hidden' name='adminID' value={new URLSearchParams(window.location.search).get('adminID')} />
            <input type='hidden' name='token' value={new URLSearchParams(window.location.search).get('token')} />
          <label>New Password:</label>
          <input className="passwordText-form" type="text" id='new-password' required/>
          <label>Confirm Password:</label>
          <input className="passwordText-form" type="password" id='confirm-password' required/>
          <div className="reset-submit-container">
            <button type="submit">Confirm</button>
        </div>
        </form>
      </div>

    </div>
  )
}

export default ResetPassword;