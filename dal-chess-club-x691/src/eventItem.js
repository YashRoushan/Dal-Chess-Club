// import React, {useState} from "react";
// import EventPopUp from './eventPopUp';

// function EventItem({name, image, date, description }) {
  
//   const [showPopUp, setShowPopUp] = useState(false);
  
//   const togglePopUp = () => {
//     setShowPopUp(!showPopUp);
//   }

//   return (
//     <div className="eventItem" onClick={togglePopUp}>
//       <img className="event-image" src={image} alt="Event Image" />
//       <h2> {name} </h2>
//       {showPopUp && (
//         <EventPopUp
//           name={name}
//           image={image}
//           date = {date}
//           description={description}
//           onClose={togglePopUp}
//         />
//       )}
//     </div>
//   );
// }

// export default EventItem;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TournamentPopUp from './tournamentPopUp.js';
import './styles/tournamentRegistration.css';
import { BASE_URL } from './config.js';

function EventItem({ tournamentsID, name, image, date, time, endTime, participantsNo, price, description, registrationLink }) {
  const navigate = useNavigate();
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

  const handleTournamentClick = (e) => {
    e.preventDefault();  // Prevents the popup from opening when the button is clicked
    navigate(`/tournamentInfo?itemId=${tournamentsID}`); // Navigate to the tournament info
  }

  // Updated function to handle registration button click
  const handleRegisterNow = (e) => {
    e.stopPropagation();  // Prevents the popup from opening when the button is clicked
    navigate(`/tournamentRegistration?tournamentsID=${tournamentsID}`); // Navigate to the registration page including tournament ID
  }

  return (
    <div className="tournamentItem" onClick={handleTournamentClick}>
      <h1>{name}</h1>
      <img src={image} alt={name} />
      <p>{date} | {time} - {endTime} | {price}</p>
      <p>Number of Participants: {participantCount}</p>
      {/* <div className="participants-register-container">
        <button className="register-now-button" onClick={handleRegisterNow}>Register Now</button>
      </div> */}
    </div>
  );
}

export default EventItem;