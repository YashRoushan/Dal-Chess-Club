import React from 'react'
import { trainersList } from '../trainersList'
import TrainerItem from '../trainerItem'
import '../styles/trainer.css'
import { eventList } from '../eventList'
import EventItem from '../eventItem'
import '../styles/event.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../styles/improve.css';

function improve() {
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
                    name={eventItem.name}
                    image={eventItem.image}
                    date={eventItem.date}
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
            
              {trainersList.map((trainerItem, key) => {
                return(
                  <TrainerItem
                    key={key}
                    name={trainerItem.name}
                    image={trainerItem.image}
                    description={trainerItem.description}
                  />
                )
              })}
          </div>
      </div>
    </div>
  )
}

export default improve