import React, { useState, useEffect } from 'react';
import {Close} from '@mui/icons-material';
import './styles/Popup.css'

function TournamentPopUp({ name, image, date, time, endTime, participantsNo, price, description, registrationLink, onClose }) {
  let embedLink = registrationLink + "&embed=true";
  return (
    <div className="popup-background" onClick={onClose}>
    <div className="popup-content" onClick={e => e.stopPropagation()}>
        <h1>{name}</h1>
        <img className="tournament-image" src={image} alt={name} />
        <p> Cost: {price} </p>
        <p> Date: {date} </p>
        <p> Time: {time} - {endTime}</p>
        <p> Number of Participants: {participantsNo} </p>
        <p> {description} </p>
        {registrationLink && (
        <a href={registrationLink} target="_blank" rel="noopener noreferrer">
          <button className="registerButton">Register</button>
        </a>
      )}
      // displaying the live scores form to show tournament results
        <div className="form-container">
        <form className="form-element">
          <label>Player 1 Name:</label>
          <input className="text-form" type="text" required />
        </form>
      </div>
      <div className="form-container">
        <form className="form-element">
          <label>Player 2 Name:</label>
          <input className="text-form-c" type="text" required />
        </form>
      </div>

        <div className="form-container">
            <form className="form-element">
                <label>Player 1 Time Taken:</label>
                <input className="text-form" type="time" required />
            </form>
        </div>

       
        <div className="form-container">
            <form className="form-element">
                <label>Player 2 Time Taken:</label>
                <input className="text-form" type="time" required />
            </form>
        </div>

        <div className="form-container">
            <h3>Outcome: </h3>
            <form className="form-element">
                <label>Player 1 Score: </label>
                <input className="text-form" type="number" defaultValue={0} required/>

                <label>Player 2 Score: </label>
                <input className="text-form" type="number" defaultValue={0} required/>

            </form>
        </div>

        <button id="close-button" onClick={onClose}><Close /></button>
    </div>
  </div>
  );
}

export default TournamentPopUp