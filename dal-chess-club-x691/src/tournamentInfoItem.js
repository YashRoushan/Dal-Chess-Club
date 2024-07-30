import React, { useState, useEffect } from "react";
import "./styles/tournaments.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from "./config";
import {BsCaretDownFill, BsCaretUpFill} from "react-icons/bs";

function TournamentInfoItem({ tournamentID, name, image, date, time, endTime, participantsNo, price, description, registrationLink, participants }) {
  const navigate = useNavigate();
  const [pairings, setPairings] = useState('');
  const [standings, setStandings] = useState('');
  const [showStandings, setShowStandings] = useState(false);
  const [showPairings, setShowPairings] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get('itemId');
  const [isPastTournament, setIsPastTournament] = useState(true);

  useEffect(() => {
    if (itemId) {
      fetchData(itemId);
      fetchCurrentTournament(tournamentID);
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

  // checking if the tournament is pastTournament or currentTournament
  const fetchCurrentTournament = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tournaments?id=${tournamentID}`);
      console.log("tournament id is ", tournamentID);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("data is ", data);
      if (data.length > 0){
      setIsPastTournament(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleRegisterNow = () => {
    navigate(`/tournamentRegistration?tournamentsID=${tournamentID}`); // Navigate to the registration page with the tournament ID
  };

  const toggleStandings = () => {
    setShowStandings(!showStandings);
  };

  const togglePairings = () => {
    setShowPairings(!showPairings);
  };

  return (
      <div className="tpopup-background">
        <div className="ttables">
          <button className="dropdown-button" onClick={toggleStandings}>Standings {showStandings ? <BsCaretUpFill/> :
              <BsCaretDownFill/>}</button>
          {showStandings && (
              <>
                <h3>Standings</h3>
                <div className="tstandings-table" dangerouslySetInnerHTML={{__html: standings}}></div>
              </>
          )}

          <button className="dropdown-button"
                  onClick={togglePairings}>Pairings {showPairings ? <BsCaretUpFill/> : <BsCaretDownFill/>} </button>
          {showPairings && (
              <>
                <h3>Pairings</h3>
                <div className="tpairings-table" dangerouslySetInnerHTML={{__html: pairings}}></div>
              </>
          )}

        </div>
        <div className="tpopup-content" onClick={e => e.stopPropagation()}>
          <div className="ttournament-info">
            <img className="ttournament-image" src={image} alt={name}/>
            <h1 className="ttitle">{name}</h1>
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
              { !isPastTournament  && <div className="participants-register-container">
                <button className="register-now-button" onClick={handleRegisterNow}>Register Now</button>
              </div>}

            </div>
            
          </div>
        </div>

        {registrationLink && (
          <a href={registrationLink} target="_blank" rel="noopener noreferrer">
            <button className="tregisterButton">Register</button>
          </a>
        )}
      </div>
  );
}

export default TournamentInfoItem;