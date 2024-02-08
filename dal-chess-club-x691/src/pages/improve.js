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

function improve() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };
  return (
    <div className="improve">
      <div className="event">
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