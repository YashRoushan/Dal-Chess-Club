import React from 'react';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './styles/Popup.css';
import './styles/tournamentRegistration.css';

function TournamentPopUp({ name, image, date, time, endTime, participantsNo, price, description, handleRegisterNow, onClose }) {
  const navigate = useNavigate(); // Instantiate the navigate function
   handleRegisterNow = (e) => {
    e.stopPropagation();  // Prevents the popup from opening when the button is clicked
    navigate('/tournamentRegistration'); // Navigate to the registration page
  }
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
        <button className="register-now-button" onClick={handleRegisterNow}>Register Now</button>
        
        
        <button className="close-button" onClick={onClose}><Close /></button>
      </div>
    </div>
  );
}

export default TournamentPopUp;



