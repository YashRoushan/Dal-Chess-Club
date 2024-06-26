import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import TournamentPopUp from './tournamentPopUp.js';
import './styles/tournamentRegistration.css'; 

function TournamentItem({tournamentsID, name, image, date, time, endTime, participantsNo, price, description, registrationLink }) {
  
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate(); // Instantiate the navigate function

  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  }

  // Updated function to handle registration button click
  const handleRegisterNow = (e) => {
    e.stopPropagation();  // Prevents the popup from opening when the button is clicked
    navigate('/tournamentRegistration'); // Navigate to the registration page
  }

  return (
    <div className="tournamentItem" onClick={() => setShowPopUp(true)}>
      <h1>{name}</h1>
      <img src={image} alt={name}/>
      <p>{date} | {time} - {endTime} | {price}</p>
      <p>Number of Participants: {participantsNo}</p>
      <div className="participants-register-container">
        <button className="register-now-button" onClick={handleRegisterNow}>Register Now</button>
      </div>
      {showPopUp && (
        <TournamentPopUp
            tournamentsID={tournamentsID}
          name={name}
          image={image}
          date={date}
          time={time}
          endTime={endTime}
          participantsNo={participantsNo}
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
