import React, { useState, useEffect } from "react";
import "./styles/tournaments.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from "./config";

function EventInfoItem({ tournamentID, name, image, date, time, endTime, participantsNo, price, description, registrationLink, participants }) {
  const navigate = useNavigate();
  const [pairings, setPairings] = useState('');
  const [standings, setStandings] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get('itemId');

  useEffect(() => {
    if (itemId) {
      fetchData(itemId);
    }
  }, [itemId]);

  const fetchData = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/live-tournaments/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setStandings(data.Standings);
      setPairings(data.Pairings);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="tpopup-background">
      <div className="tpopup-content" onClick={e => e.stopPropagation()}>
        <div className="ttournament-info">
          <img className="eevent-image" src={image} alt={name} />
          <div>
          <h1 className="ttitle">{name}</h1>
          </div>
          <div className="ttournament-details">
            <p> Cost: {price} </p>
            <p> Date: {date} </p>
            <p> Time: {time} - {endTime}</p>
            <p> Number of Participants: {participantsNo} </p>
            <p> {description} </p>
            
            <h2>Registered Participants:</h2>
            
            <ul>
              {participants.map(participant => (
                <li key={participant.id}>{participant.fullname}</li>
              ))}
            </ul>
          </div>
        </div>

        {registrationLink && (
          <a href={registrationLink} target="_blank" rel="noopener noreferrer">
            <button className="tregisterButton">Register</button>
          </a>
        )}
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

export default EventInfoItem;
