import React from 'react';
import '../styles/forgotPassword.css'; 

function RegistrationForm() {
  const handleSubmit = () => {
    alert('Registration form submitted!');
  };

  return (
    <div className="forgotPassword-container">
      <div className="forgotPassword-header">
        <h1>Register for the Tournament</h1>
        <p>Please fill out this form if you are interested in participating in the upcoming tournament.</p>
        <p>The survey will take approximately 5 minutes or less to complete.</p>
      </div>
      <div className="emailFormDiv">
        <form className="form-element" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <input name="name" className="emailText-form" placeholder="What is your name?" required />
    
          <input name="email" className="emailText-form" placeholder="What is your email address?" required />

          <div className="emailText-form">
            <label>Do you have a CFC ID?</label>
            <input type="radio" name="cfcIdCheck" /> Yes
            <input type="radio" name="cfcIdCheck" /> No
          </div>

          <input name="cfcId" className="emailText-form" placeholder="Please state your CFC ID" />
          <input name="cfcRating" className="emailText-form" placeholder="Please state your CFC regular rating" />
          
          <div className="emailText-form">
            <label>How will you be paying your entry fee?</label>
            <input type="radio" name="paymentMethod" value="e-transfer" />
            E-transfer to chess@dal.ca (Please write the name of the participant when sending the fee).
            <input type="radio" name="paymentMethod" value="cash" />
            with cash on the day of the tournament. Please note that if you are paying with cash, change will not be provided.
          </div>

          <div className="emailText-form">
            <label>Would you like to be added to our email list, so that we can better inform you of future events?</label>
            <input type="radio" name="emailList" value="already" />
            Already on the list
            <input type="radio" name="emailList" value="yes" />
            Yes
            <input type="radio" name="emailList" value="no" />
            No
          </div>

          <div className="reset-submit-container">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;


