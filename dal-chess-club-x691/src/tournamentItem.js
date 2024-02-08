import React, {useState} from "react";
import TournamentPopUp from './TournamentPopUp';

function TournamentItem({name, image, date, time, endTime, participantsNo, price, description, registrationLink }) {
  
  const [showPopUp, setShowPopUp] = useState(false);
  
  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  }

  return (
    <div className="tournamentItem" onClick={togglePopUp}>
      <h1> {name} </h1>
      <img className="tournament-image" src={image} alt="Tournament Logo" />
      <p> {date} | {time} - {endTime} | ${price} </p>
      <p> Number of Participants: {participantsNo}</p>
      {showPopUp && (
        <TournamentPopUp
          name={name}
          image={image}
          date={date}
          time={time}
          endTime={endTime}
          participantsNo={participantsNo}
          price={price}
          description={description}
          registrationLink={registrationLink}
          onClose={togglePopUp}
        />
      )}
    </div>
  );
}

export default TournamentItem;