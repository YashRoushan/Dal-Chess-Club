import React from 'react';
import "./styles/tournaments.css";
import { useNavigate } from 'react-router-dom';

function TournamentInfoItem({ tournamentID, name, image, date, time, endTime, participantsNo, price, description, registrationLink, participants }) {
  let embedLink = registrationLink + "&embed=true";
  const navigate = useNavigate();

  // Updated function to handle registration button click
  const handleRegisterNow = (e) => {
    navigate(`/tournamentRegistration?tournamentsID=${tournamentID}`); // Navigate to the registration page with the tournament ID
  };

  return (
    <div className='editPage-container'>
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

      <div className="participants-register-container">
        <button className="register-now-button" onClick={handleRegisterNow}>Register Now</button>
      </div>
    </div>
  );
}

export default TournamentInfoItem;




