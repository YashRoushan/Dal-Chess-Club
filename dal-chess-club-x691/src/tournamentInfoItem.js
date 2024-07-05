import React, {useState} from "react";
import "./styles/tournaments.css";

function TournamentInfoItem({name, image, date, time, endTime, participantsNo, price, description, registrationLink }) {
    
  let embedLink = registrationLink + "&embed=true";
    
  return (
    <div className='editPage-container'>
        <h1>{name}</h1>
        <img className="tournament-image" src={image} alt={name} />
        <p> Cost: {price} </p>
        <p> Date: {date} </p>
        <p> Time: {time} - {endTime}</p>
        <p> Number of Participants: {participantsNo} </p>
        <p> {description} </p>
        {registrationLink && (
        <a href={registrationLink} target="_blank" rel="noopener noreferrer">
          <button className="registerButton">Register</button>
        </a>
      )}
    </div>
  );
}

export default TournamentInfoItem;
