import React, { useState, useEffect } from 'react';
import TrainerItem from '../trainerItem'
import '../styles/trainer.css'
import EventItem from '../eventItem'
import '../styles/event.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/tournaments.css";
import { BASE_URL} from '../config.js';
import TournamentItem from '../tournamentItem.js';

function Improve() {
  const [eventList, setEventsList] = useState([]);

    // Fetch events from the API
    useEffect(() => {
      fetch(`${BASE_URL}/improve`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setEventsList(data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }, []); 

  return (
    <div className="improve">
      <div className="tournament">
        <h1>Events</h1>
          <div className="tournamentList">
              {eventList.map((eventItem, key) => {
                return(
                  <TournamentItem
                    key={key}
                    name={eventItem.title}
                    image={eventItem.eventImage}
                    price={formatPrice(eventItem.cost)}
                    date={formatDate(eventItem.start_date)}
                    time={formatTime(eventItem.start_date)}
                    endTime={formatTime(eventItem.end_date)}
                    description={eventItem.description}
                  />
                )
              })}
          </div>
      </div>
      <div className="trainer">
        <h1>Speakers</h1>
          <div className="trainerList">
              {eventList.map((trainerItem, key) => {
                return(
                  <TrainerItem
                    key={key}
                    name={trainerItem.name}
                    image={trainerItem.speakerImage}
                    speciality={trainerItem.speciality}
                    description={trainerItem.bio}
                  />
                )
              })}
          </div>
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

export default Improve