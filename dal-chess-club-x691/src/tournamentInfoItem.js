import React, { useState, useEffect } from "react";
import "./styles/tournaments.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from "./config";

function TournamentInfoItem({ name, image, date, time, endTime, participantsNo, price, description, registrationLink }) {
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

  const handleRegisterNow = () => {
    navigate('/tournamentRegistration');
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
            {registrationLink && (
              <a href={registrationLink} target="_blank" rel="noopener noreferrer">
                <button className="tregisterButton">Register</button>
              </a>
            )}
          </div>
        </div>
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
