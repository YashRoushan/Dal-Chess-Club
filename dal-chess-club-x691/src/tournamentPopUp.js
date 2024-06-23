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
        <div className="form-container">
        <form className="form-element">
          <label>Player 1 Name:</label>
          <input className="text-form" type="text" value={Player1} />
        </form>
      </div>
      <div className="form-container">
        <form className="form-element">
          <label>Player 2 Name:</label>
          <input className="text-form-c" type="text" value={Player2} />
        </form>
      </div>

        <div className="form-container">
            <form className="form-element">
                <label>Player 1 Time Taken:</label>
                <input className="text-form" type="time" value={Player1_time} />
            </form>
        </div>

       
        <div className="form-container">
            <form className="form-element">
                <label>Player 2 Time Taken:</label>
                <input className="text-form" type="time" value={Player2_time} />
            </form>
        </div>

        <div className="form-container">
            <h3>Outcome: </h3>
            <form className="form-element">
                <label>Player 1 Score: </label>
                <input className="text-form" type="number" defaultValue={0} value={Player1_score} />

                <label>Player 2 Score: </label>
                <input className="text-form" type="number" defaultValue={0} value={Player2_score} />

            </form>
        </div>

        <button id="close-button" onClick={onClose}><Close /></button>
    </div>
  </div>
  );
}

export default TournamentPopUp