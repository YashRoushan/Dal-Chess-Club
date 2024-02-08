import React from 'react'
import './styles/Popup.css'

function eventPopUp({ name, image, date, description, onClose}) {
    return (
        <div className="popup-background" onClick={onClose}>
            <div className="popup-content" onClick = {e => e.stopPropagation()}>
                <img className="event-image" src={image} alt="Event Pic" />
                <h1>{name}</h1>
                <p>{date}</p>
                <p>{description}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default eventPopUp