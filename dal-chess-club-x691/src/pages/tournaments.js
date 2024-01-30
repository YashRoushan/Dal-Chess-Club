import React from 'react'
import { tournamentsList } from '../TournamentsList'
import TournamentItem from '../TournamentItem'

function tournaments() {
  return (
    <div className="tournaments">
        <div className="tournamentsList">
            {tournamentsList.map((tournamentItem, key) => {
              return(
                <TournamentItem
                  key={key}
                  name={tournamentItem.name}
                  image={tournamentItem.image}
                  price={tournamentItem.price}
                  date={tournamentItem.date}
                  participantsNo={tournamentItem.participantsNo}
                  description={tournamentItem.description}
                />
              )
            })}
        </div>
    </div>
  )
}

export default tournaments