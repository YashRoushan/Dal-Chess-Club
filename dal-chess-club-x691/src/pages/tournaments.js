import React from 'react';
import {useState} from "react";
import { tournamentsList } from '../tournamentsList.js';
import TournamentItem from '../tournamentItem.js';
import { TournamentSearch } from '../tournamentSearch.js';
import "../styles/Tournaments.css";

function Tournaments() {
  //Search results state
  const [filteredResults, setResults] = useState([]);

  //Filter inputs state
  const [priceFilter, setPriceFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filterTournaments = () => {
    return tournamentsList.filter(tournament => {
      const tournamentDate = new Date(tournament.date);
      const filterDate = dateFilter ? new Date(dateFilter) : null;
      
      const matchesPrice = priceFilter ? tournament.price <= priceFilter : true;
      const matchesDate = filterDate ? tournamentDate >= filterDate : true;

      return matchesPrice && matchesDate;
    });
  };

  const filteredTournaments = filterTournaments();

  return (
    <div className="tournament">
      <h1>Tournaments</h1>
      <div className="filters-container">
        <div>
        <TournamentSearch setResults={setResults}/>
        </div>
        <input className='filter'
            type="number" 
            placeholder="Max Price" 
            value={priceFilter} 
            onChange={(e) => setPriceFilter(e.target.value)} 
          />
          <input className='filter' 
            type="date" 
            value={dateFilter} 
            onChange={(e) => setDateFilter(e.target.value)} 
          />
        </div>

        <div className="tournamentList">
            {tournamentsList.map((tournamentItem, key) => {
              return(
                <TournamentItem
                  key={key}
                  name={tournamentItem.name}
                  image={tournamentItem.image}
                  price={tournamentItem.price}
                  date={formatDate(tournamentItem.date)}
                  time={formatTime(tournamentItem.date)}
                  endTime={formatTime(tournamentItem.endDate)}
                  participantsNo={tournamentItem.participantsNo}
                  description={tournamentItem.description}
                  registrationLink={tournamentItem.registrationLink}
                />
              )
            })}
        </div>
    </div>
  )
}

function formatDate(dateString) {
  const date = new Date(dateString);
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

function formatTime(dateString) {
  const date = new Date(dateString);

  if (!dateString) {
    return "Finish";
  }
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours}${ampm}`;
}

export default Tournaments