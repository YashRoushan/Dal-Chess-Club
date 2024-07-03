import React from 'react'
import {Close} from '@mui/icons-material';
//import './styles/Popup.css'
import TournamentItem from '../tournamentItem';
import { BASE_URL } from '../config';
import { useState, useEffect } from 'react';
import TournamentInfoItem from '../tournamentInfoItem';

function TournamentInfo({ name, image, date, time, endTime, participantsNo, price, description, registrationLink, }) {

  const [tournamentsList, setTournamentsList] = useState([]);
  
  // Search results state
  const [nameFilter, setNameFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const parameters = new URLSearchParams(window.location.search);
  const id = parameters.get('tournamentID');


  // fetches data from db whenever either of the three filters change
  // useEffect(() => {
  //   fetchData();
  // }, [nameFilter, priceFilter, dateFilter]);

  // fetches data from db whenever the tournament id changes
  useEffect(() => {
    fetchData();
  }, []);
  
  // fetches data from the server with querystrings incase of filters and assigns it to tournamentList.
  const fetchData = () => {
    const serverUrl =  `${BASE_URL}/tournaments/${id}`;
    fetch(serverUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          setTournamentsList([]); // Clear the list if no data is returned
        } else {
          setTournamentsList(data);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setTournamentsList([]); // Clear the list if there is an error
      });
  }
  
  // handle functions to call state change
  const handleNameFilter = (event) => {
    setNameFilter(event.target.value);
  }
  const handlePriceFilter = (event) => {
    setPriceFilter(event.target.value);
  }
  const handleDateFilter = (event) => {
    setDateFilter(event.target.value);
  }

  // let tournament = '';
  // tournament = tournamentsList.find(tournament => tournament.name === name);

  // if (!tournament) {
  //   return <div>Loading...</div>;
  // }

  let embedLink = registrationLink + "&embed=true";

  //tournamentsList.map(() => {
    return (

      <TournamentInfoItem
                  name={tournamentsList.title}
                  image={tournamentsList.image}
                  price={formatPrice(tournamentsList.cost)}
                  date={formatDate(tournamentsList.start_date)}
                  time={formatTime(tournamentsList.start_date)}
                  endTime={formatTime(tournamentsList.end_date)}
                  participantsNo={tournamentsList.num_of_participants}
                  description={tournamentsList.description}
                  registrationLink={tournamentsList.registration_link}
                />

      // <div className='editPage-container'>
      //     <h1>{tournament.name}</h1>
      //     <img className="tournament-image" src={tournament.image} alt={tournament.title} />
      //     <p> Cost: {formatPrice(tournament.cost)} </p>
      //     <p> Date: {formatDate(tournament.start_date)} </p>
      //     <p> Time: {formatTime(tournament.start_date)} - {formatTime(tournament.end_date)}</p>
      //     <p> Number of Participants: {tournament.num_of_participants} </p>
      //     <p> {tournament.description} </p>
      //     {/* <TournamentItem
      //       name={name}
      //       image={image}
      //       date={date}
      //       time={time}
      //       endTime={endTime}
      //       participantsNo={participantsNo}
      //       price={price}
      //       description={description}
      //       registrationLink={registrationLink}
      //       //onClose={togglePopUp}
      //     /> */}
      // </div>
    );
  //})
}

function formatPrice(price) {
  if (!price || price === 0) {
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

export default TournamentInfo;
