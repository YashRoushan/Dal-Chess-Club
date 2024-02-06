import React from 'react'
import { tournamentsList } from '../TournamentsList'
import TournamentItem from '../TournamentItem'
import { TournamentSearch } from '../TournamentSearch'
import "../styles/Tournaments.css"

function tournaments() {
  return (
    <div className="tournament">
      <h1>Tournaments</h1>
      <TournamentSearch />
        <div className="tournamentList">
            {tournamentsList.map((tournamentItem, key) => {
              return(
                <TournamentItem
                  key={key}
                  name={tournamentItem.name}
                  image={tournamentItem.image}
                  price={tournamentItem.price}
                  date={formatDate(tournamentItem.date)}
                  participantsNo={tournamentItem.participantsNo}
                  description={tournamentItem.description}
                />
              )
            })}
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
  
  const hour = date.getHours().toString();
  //const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //const year = date.getFullYear();

  return `${hour}`;
}

export default tournaments