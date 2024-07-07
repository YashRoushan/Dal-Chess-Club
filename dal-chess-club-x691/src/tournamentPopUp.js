import React, { useState, useEffect } from 'react';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './styles/Popup.css';
import './styles/tournamentRegistration.css';
import { BASE_URL } from './config';

function TournamentPopUp({ name, image, date, time, endTime, participantsNo, price, description, tournamentsID, handleRegisterNow, onClose }) {
  const navigate = useNavigate(); 
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchParticipants(tournamentsID);
  }, [tournamentsID]);

  const fetchParticipants = async (tournamentID) => {
    try {
      const response = await fetch(`${BASE_URL}/api/registration`);
      const data = await response.json();
      const filteredParticipants = data.filter(user => user.tournamentsID == tournamentID);
      setParticipants(filteredParticipants);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  handleRegisterNow = (e) => {
    e.stopPropagation();  
    navigate(`/tournamentRegistration?tournamentsID=${tournamentsID}`); 
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
        
        <h2>Registered Participants:</h2>
        <ul>
          {participants.map(participant => (
            <li key={participant.id}>{participant.fullname}</li>
          ))}
        </ul>
        
        <button className="register-now-button" onClick={handleRegisterNow}>Register Now</button>
        <button className="close-button" onClick={onClose}><Close /></button>
      </div>
    </div>
  
  );
}

export default TournamentPopUp;



















