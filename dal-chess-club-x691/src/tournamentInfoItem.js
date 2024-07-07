import React, { useState, useEffect } from "react";
import "./styles/tournaments.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from "./config";

function TournamentInfoItem({ tournamentID, name, image, date, time, endTime, participantsNo, price, description, registrationLink, participants }) {
  let embedLink = registrationLink + "&embed=true";
  const navigate = useNavigate();
  const [pairings, setPairings] = useState('');
  const [standings, setStandings] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get('itemId');

  useEffect(() => {
    fetchData();
  }, [itemId]);

  const fetchData = () => {
    const tournamentURL = `${BASE_URL}/api/live-tournaments/${itemId}`;
    fetch(tournamentURL).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      response.json().then(data => {
        setStandings(data.Standings);
        setPairings(data.Pairings);
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  };

const handleRegisterNow = (e) => {
    navigate(`/tournamentRegistration?tournamentsID=${tournamentID}`); // Navigate to the registration page with the tournament ID
  };
  
  return (
    <div className="tpopup-background">
      <div className="tpopup-content" onClick={e => e.stopPropagation()}>
        <div className="ttournament-info">
          <img className="ttournament-image" src={image} alt={name} />
          <h1 className="ttitle">{name}</h1>
          <div className="ttournament-details">
            
            <p> Cost: {price} </p>
            <p> Date: {date} </p>
            <p> Time: {time} - {endTime}</p>
            <p> Number of Participants: {participantsNo} </p>
            <p> {description} </p>
            <div className="participants-register-container">
              <button className="register-now-button" onClick={handleRegisterNow}>Register Now</button>
            </div>
          </div>
        </div>

        <h2>Registered Participants:</h2>
      <ul>
        {participants.map(participant => (
          <li key={participant.id}>{participant.fullname}</li>
        ))}
      </ul>

        <div className="ttables">
          <h3>Standings</h3>
          <div className="tstandings-table" dangerouslySetInnerHTML={{ __html: standings }}></div>
          <h3>Pairings</h3>
          <div className="tpairings-table" dangerouslySetInnerHTML={{ __html: pairings }}></div>
        </div>
      </div>
    </div>
  );
}

export default TournamentInfoItem;




