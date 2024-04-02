import React, { useState, useEffect } from 'react';
import { trainersList } from '../trainersList'
import TrainerItem from '../trainerItem'
import '../styles/trainer.css'
//import { eventList } from '../eventList'
import EventItem from '../eventItem'
import '../styles/event.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../styles/improve.css';

function Improve() {
  const [eventList, setEventsList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/improve")
      .then(response => response.json())
      .then(data => {
        setEventsList(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []); 

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="improve">
      <div className="event">
        <h1>Event Tab</h1>
          <div className="eventList">
            <Slider {...settings}>
              {eventList.map((eventItem, key) => {
                return(
                  <EventItem
                    key={key}
                    name={eventItem.title}
                    image={eventItem.image}
                    date={formatDate(eventItem.start_date)}
                    time={formatTime(eventItem.start_date)}
                    endTime={formatTime(eventItem.end_date)}
                    description={eventItem.description}
                  />
                )
              })}
              </Slider>
          </div>
      </div>
      <div className="trainer">
        <h1>Trainer List</h1>
          <div className="trainerList">
              {eventList.map((trainerItem, key) => {
                return(
                  <TrainerItem
                    key={key}
                    name={trainerItem.name}
                    image={trainerItem.image}
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