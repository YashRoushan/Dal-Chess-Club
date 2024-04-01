import React, {useState} from "react";
import TournamentPopUp from './tournamentPopUp.js';
import winterBlitz from '../src/images/winter-blitz.jpg';
import dalOpen2023 from '../src/images/dal-open-2023.jpg';
import winterRapidOpen from '../src/images/winter-rapid-open.jpg';
import shirreffChess from '../src/images/shirreff-chess.jpg';
import subChessSocial from '../src/images/sub-chess-social.jpg';
import sextonChessSocial from '../src/images/sexton-chess-social.jpg';

//This technique won't work as images are added by the client via the admin page.
const imageMap = {
  '/src/images/winter-blitz.jpg': winterBlitz,
  '/src/images/dal-open-2023.jpg': dalOpen2023,
  '/src/images/winter-rapid-open.jpg': winterRapidOpen,
  '/src/images/shirreff-chess.jpg': shirreffChess,
  '/src/images/sub-chess-social.jpg': subChessSocial,
  '/src/images/sexton-chess-social.jpg': sextonChessSocial,
};

function TournamentItem({name, imagePath, date, time, endTime, participantsNo, price, description, registrationLink }) {
  
  const [showPopUp, setShowPopUp] = useState(false);
  const image = imageMap[imagePath];
  
  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  }

  return (
    <div className="tournamentItem" onClick={togglePopUp}>
      <h1> {name} </h1>
      <img src={image} alt={name} />
      <p> {date} | {time} - {endTime} | ${price} </p>
      <p> Number of Participants: {participantsNo}</p>
      {showPopUp && (
        <TournamentPopUp
          name={name}
          image={`${process.env.PUBLIC_URL}/path/to/${image}`}
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