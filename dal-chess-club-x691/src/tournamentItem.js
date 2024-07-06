import React, { useState, useEffect } from 'react';
import TournamentPopUp from './tournamentPopUp.js';
import './styles/tournamentRegistration.css'; 
import { BASE_URL } from './config.js';

function TournamentItem({tournamentsID, name, image, date, time, endTime, participantsNo, price, description, registrationLink }) {
  const [showPopUp, setShowPopUp] = useState(false);
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

  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  }

  return (
    <div className="tournamentItem" onClick={() => setShowPopUp(true)}>
      <h1>{name}</h1>
      <img src={image} alt={name}/>
      <p>{date} | {time} - {endTime} | {price}</p>
      <p>Number of Participants: {participantCount}</p>
      
      {showPopUp && (
        <TournamentPopUp
          tournamentsID={tournamentsID}  // Pass the tournament ID to the pop-up
          name={name}
          image={image}
          date={date}
          time={time}
          endTime={endTime}
          participantsNo={participantCount}
          price={price}
          description={description}
          registrationLink={registrationLink}
          
          onClose={togglePopUp}
        />
      )}
    </div>
  );
}

export default TournamentItem;


