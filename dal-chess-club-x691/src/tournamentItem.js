import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './styles/tournamentRegistration.css'; 

function TournamentItem({tournamentsID, name, image, date, time, endTime, participantsNo, price, description, registrationLink }) {
  
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate(); // Instantiate the navigate function

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
    navigate('/tournamentRegistration'); // Navigate to the registration page
  }

  return (
    <div className="tournamentItem" onClick={handleTournamentClick}>
      <h1>{name}</h1>
      <img src={image} alt={name}/>
      <p>{date} | {time} - {endTime} | {price}</p>
      <p>Number of Participants: {participantsNo}</p>
      <div className="participants-register-container">
        <button className="register-now-button" onClick={handleRegisterNow}>Register Now</button>
      </div>
    </div>
  );
}

export default TournamentItem;
 
