import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/tournamentRegistration.css';
import { BASE_URL } from './config.js';

function EventItem({ tournamentsID, name, image, date, time, endTime, participantsNo, price, description, registrationLink }) {
  const navigate = useNavigate();
  const [participantCount, setParticipantCount] = useState(0);

  useEffect(() => {
    console.log('Tournament ID:', tournamentsID); // Debug log
    // Fetch the number of participants for this tournament
    if (tournamentsID) {
      fetch(`${BASE_URL}/api/tournaments/${tournamentsID}/participants`)
        .then(response => response.json())
        .then(data => setParticipantCount(data.participantCount))
        .catch(error => console.error('Error fetching participant count:', error));
    }
  }, [tournamentsID]);

  const handleTournamentClick = (e) => {
    e.preventDefault();  // Prevents the popup from opening when the button is clicked
    navigate(`/eventInfo?itemId=${tournamentsID}`); // Navigate to the tournament info
  }
  
  return (
    <div className="tournamentItem" onClick={handleTournamentClick}>
      <h1>{name}</h1>
      <img src={image} alt={name} />
      <p>{date} | {time} - {endTime} | {price}</p>
      <p>Number of Participants: {participantCount}</p>
    </div>
  );
}

export default EventItem;