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
        <div className="form-container">
        <form className="form-element">
          <label>Player 1 Name:</label>
          <input className="text-form" type="text" required />
        </form>
      </div>
        <button id="close-button" onClick={onClose}><Close /></button>
    </div>
  </div>
  );
}

export default TournamentPopUp