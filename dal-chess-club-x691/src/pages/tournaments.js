import React, { useState, useEffect } from 'react';
import TournamentItem from '../tournamentItem.js';
import { TournamentSearch } from '../tournamentSearch.js';
import "../styles/tournaments.css";
import { BASE_URL} from '../config.js';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Tournaments() {
  const [tournamentsList, setTournamentsList] = useState([]);

  //Search results state
  const [filteredResults, setResults] = useState([]);

  //Filter inputs state
  const [priceFilter, setPriceFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

    // Fetch tournaments from the API
    useEffect(() => {
      // Fetch tournaments from API
      fetch(`${BASE_URL}/tournaments`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setTournamentsList(data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }, []); 

    //Filter and search not set up to the database yet
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
            {filteredTournaments.map((tournament, key) => {
              
              return(
                <TournamentItem
                  key={key}
                  name={tournament.title}
                  image={tournament.image}
                  price={formatPrice(tournament.cost)}
                  date={formatDate(tournament.start_date)}
                  time={formatTime(tournament.start_date)}
                  endTime={formatTime(tournament.end_date)}
                  participantsNo={tournament.num_of_participants}
                  description={tournament.description}
                  registrationLink={tournament.registration_link}
                />
              )
            })}
        </div>
    </div>
  )
}

function formatPrice(price) {
  if (!price || price == 0) {
    return "FREE";
  } else {
    return "$" + price;
  }
}

function formatDate(dateString) {
  if (!dateString) {
    return "Date TBD";
  }
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