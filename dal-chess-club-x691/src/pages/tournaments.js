import React from 'react'
import { tournamentsList } from '../tournamentsList'
import 

function tournaments() {
  return (
    <div className="tournaments">
        <div className="tournamentsList">
            {tournamentsList.map((tournamentItem, key) => {
              return(
                <tournamentItem
                  key={key}
                  name={tournamentItem.name}
                />
              )
            })}
        </div>
    </div>
  )
}

export default tournaments