import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './styles/Popup.css'

function TournamentPopUp({ name, image, date, time, endTime, participantsNo, price, description, registrationLink, onClose }) {
  return (
    <div className="popup-background" onClick={onClose}>
    <div className="popup-content" onClick={e => e.stopPropagation()}>
        <h1>{name}</h1>
        <img className="tournament-image" src={image} alt="Tournament Logo" />
        <p> Cost: ${price} </p>
        <p> Date: {date} </p>
        <p> Time: {time} - {endTime}</p>
        <p> Number of Participants: {participantsNo} </p>
        <p> {description} </p>
        <a href={registrationLink} id="register-button">Register</a> 
        <button id="close-button" onClick={onClose}><CloseIcon /></button>
    </div>
  </div>
  );
}

export default TournamentPopUp