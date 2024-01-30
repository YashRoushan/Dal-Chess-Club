import React from "react";

function TournamentItem({name, image, date, participantsNo, price, description }) {
  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
      <p> ${price} </p>
      <p> {date} </p>
      <p> {participantsNo} </p>
      <p> {description} </p>
    </div>
  );
}

export default TournamentItem;