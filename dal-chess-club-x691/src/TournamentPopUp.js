import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './styles/Popup.css'

function TournamentPopUp({ name, image, date, participantsNo, price, description, onClose }) {
  return (
    <div className="popup-background" onClick={onClose}>
    <div className="popup-content" onClick={e => e.stopPropagation()}>
        <h1>{name}</h1>
        <img className="tournament-image" src={image} alt="Tournament Logo" />
        <p> ${price} </p>
        <p> {date} </p>
        <p> Number of Participants: {participantsNo} </p>
        <p> </p>
        <p> {description} </p>
        <button onClick={onClose}><CloseIcon /></button>
    </div>
  </div>
  );
}

export default TournamentPopUp