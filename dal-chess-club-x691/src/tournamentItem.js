import React, { useState } from "react";

import TournamentPopUp from './tournamentPopUp.js';
import './styles/tournamentRegistration.css'; 

function TournamentItem({name, image, date, time, endTime, participantsNo, price, description, registrationLink }) {
  const [showPopUp, setShowPopUp] = useState(false);
  

  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  }

  
  return (
    <div className="tournamentItem" onClick={() => setShowPopUp(true)}>
      <h1>{name}</h1>
      <img src={image} alt={name}/>
      <p>{date} | {time} - {endTime} | {price}</p>
      <p>Number of Participants: {participantsNo}</p>
      
      {showPopUp && (
        <TournamentPopUp
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
