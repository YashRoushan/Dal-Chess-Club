import React,  { useState, useEffect } from 'react'
import { BASE_URL } from '../config.js';

import TournamentInfoItem from '../tournamentInfoItem.js';

function TournamentInfo() {

  const [tournamentsList, setTournamentsList] = useState([]);
  const [tournamentID, setTournamentID] = useState(0);

  const parameters = new URLSearchParams(window.location.search);
  const id = Number(parameters.get('itemId'));

  console.log(id);

  useEffect(() => {
    fetchData(tournamentID);
  }, [tournamentID]);

  const fetchData =  (tournamentID) => {
    setTournamentID(id);
    const serverUrl =  `${BASE_URL}/tournaments?id=${tournamentID}`;
    console.log(serverUrl);
    fetch(serverUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          // setTournamentsList([]); // Clear the list if no data is returned
        } else {
          setTournamentsList(data[0]);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        // Clear the list if there is an error
      });
  }

  console.log(tournamentsList)

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
    );
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
 