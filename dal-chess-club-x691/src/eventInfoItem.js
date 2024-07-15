import React, { useState, useEffect } from "react";
import "./styles/tournaments.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from "./config";

function EventInfoItem({ tournamentID, name, image, date, time, endTime, participantsNo, price, description, registrationLink, participants }) {
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="tpopup-background">
      <div className="tpopup-content" onClick={e => e.stopPropagation()}>
        <div className="ttournament-info">
          <img className="ttournament-image" src={image} alt={name} />
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
      </div>
    </div>
  );
}

export default EventInfoItem;
