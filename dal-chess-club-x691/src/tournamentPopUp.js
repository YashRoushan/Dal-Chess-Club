import React, { useState, useEffect } from 'react';
import { Close } from '@mui/icons-material';
import './styles/Popup.css';
import { BASE_URL } from "./config";


function TournamentPopUp({ tournamentsID, name, image, date, time, endTime, participantsNo, price, description, registrationLink, onClose }) {
 let embedLink = registrationLink + "&embed=true";


 const [standings, setStandings] = useState('');
 const [pairings, setPairings] = useState('');


 useEffect(() => {
   fetchData();
 }, []);


 const fetchData = () => {
   const tournamentURL = `${BASE_URL}/api/live-tournaments/${tournamentsID}`;
   fetch(tournamentURL).then(response => {
     if (!response.ok) {
      
     }
     response.json().then(data => {
       setStandings(data.Standings);
       setPairings(data.Pairings)
     });
   });
 };


 return (
   <div className="popup-background" onClick={onClose}>
     <div className="popup-content" onClick={e => e.stopPropagation()}>
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
       <h3>Standings</h3>
       <div className="standings-table" dangerouslySetInnerHTML={{ __html: standings }}></div>
      
       <h3>Pairings</h3>
       <div className="pairings-table" dangerouslySetInnerHTML={{ __html: pairings }}></div>
       <button id="close-button" onClick={onClose}><Close /></button>
     </div>
   </div>
 );
}


export default TournamentPopUp;


