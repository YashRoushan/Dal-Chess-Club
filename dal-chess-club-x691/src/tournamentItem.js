import React from "react";

function TournamentItem({name, image, date, participantsNo, price, description }) {
  return (
    <div className="tournamentItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
      <p> ${price} </p>
      <p> {date} </p>
      <p> Number of Participants: {participantsNo} </p>
      <p> {description} </p>
    </div>
  );
}

export default TournamentItem;