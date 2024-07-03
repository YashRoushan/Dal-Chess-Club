import React, {useState} from "react";
//import TournamentPopUp from './tournamentPopUp.js';
import "./styles/tournaments.css";
import TournamentInfo from "./pages/tournamentInfo.js";
import { useNavigate } from "react-router-dom";

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
