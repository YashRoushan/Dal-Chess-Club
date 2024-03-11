import React, {useState} from "react";
import EventPopUp from './eventPopUp';

function EventItem({name, image, date, description }) {
  
  const [showPopUp, setShowPopUp] = useState(false);
  
  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  }

  return (
    <div className="eventItem" onClick={togglePopUp}>
      <img className="event-image" src={image} alt="Event Image" />
      <h2> {name} </h2>
      {showPopUp && (
        <EventPopUp
          name={name}
          image={image}
          date = {date}
          description={description}
          onClose={togglePopUp}
        />
      )}
    </div>
  );
}

export default EventItem;