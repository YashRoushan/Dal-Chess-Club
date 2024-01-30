import React from 'react'
import { tournamentsList } from './tournamentsList'

function tournaments() {
  return (
    <div className="tournaments">
        <div className="tournamentsList">
            {tournamentsList.map(())}
        </div>
    </div>
  )
}

export default tournaments