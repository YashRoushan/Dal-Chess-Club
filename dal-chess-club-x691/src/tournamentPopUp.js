import React, { useState, useEffect } from 'react';
import {Close} from '@mui/icons-material';
import './styles/Popup.css'
import {BASE_URL} from "./config";

function TournamentPopUp({ tournamentsID,name, image, date, time, endTime, participantsNo, price, description, registrationLink, onClose }) {
  let embedLink = registrationLink + "&embed=true";


    useEffect(()=>{
        fetchData();
    }, []);


    const [Player1, setPlayer1] = useState('');
    const [Player2, setPlayer2] = useState('');
    const [Player1_time, setPlayer1_time] = useState('');
    const [Player2_time, setPlayer2_time] = useState('');
    const [Player1_score, setPlayer1_score] = useState(0);
    const [Player2_score, setPlayer2_score] = useState(0);


    const fetchData = () =>{
        const tournamentURL = `${BASE_URL}/api/live-tournaments/${tournamentsID}`;
        fetch(tournamentURL).then(response => {
            if(!response.ok){
                // Show the default page.
            }
            response.json().then(data => {
                setPlayer1(data.Player1);
                setPlayer2(data.Player2);
                setPlayer1_time(data.Player1_time);
                setPlayer2_time(data.Player2_time);
                setPlayer1_score(data.Player1_score)
                setPlayer2_score(data.Player2_score);
            })
        })
    }

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
        <h1>LIVE!</h1>
      {/* displaying the live scores form to show tournament results*/}
        <table className="live-scores">
          <thead>
                <tr>
                  <th>Players</th>
                  <th>Time</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{Player1}</td>
                  <td>{Player1_time}</td>
                  <td>{Player1_score}</td>
                </tr>
                <tr>
                  <td>{Player2}</td>
                  <td>{Player2_time}</td>
                  <td>{Player2_score}</td>
                </tr>
               
              </tbody>
      </table>

        <button id="close-button" onClick={onClose}><Close /></button>
    </div>
  </div>
  );
}

export default TournamentPopUp