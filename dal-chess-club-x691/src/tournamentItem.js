import React, {useState} from "react";
import TournamentPopUp from './TournamentPopUp';

function TournamentItem({name, image, date, participantsNo, price, description }) {
  
  const [showPopUp, setShowPopUp] = useState(false);
  
  //function toggles whether popup is visible
  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  }

  return (
    <div className="tournamentItem" onClick={togglePopUp}>
      <h1> {name} </h1>
      <img className="tournament-image" src={image} alt="Tournament Logo" />
      <p> ${price} </p>
      <p> {date} </p>
      <p> Number of Participants: {participantsNo} </p>
      {showPopUp && (
        <TournamentPopUp
          name={name}
          image={image}
          date={date}
          participantsNo={participantsNo}
          price={price}
          description={description}
          onClose={togglePopUp}
        />
      )}
    </div>
  );
}

export default TournamentItem;