import React from 'react';
import { Close } from '@mui/icons-material';
import './styles/Popup.css';

function TournamentPopUp({ name, image, date, time, endTime, participantsNo, price, description, onClose }) {
  return (
    <div className="popup-background" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <h1>{name}</h1>
        <img className="tournament-image" src={image} alt={name} />
        <p>Cost: {price}</p>
        <p>Date: {date}</p>
        <p>Time: {time} - {endTime}</p>
        <p>Number of Participants: {participantsNo}</p>
        <p>{description}</p>
        <button className="close-button" onClick={onClose}><Close /></button>
      </div>
    </div>
  );
}

export default TournamentPopUp;



