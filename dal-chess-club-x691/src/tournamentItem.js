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
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
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