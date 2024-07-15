import React from 'react'
import './styles/libraryPopUp.css'

function libraryPopUp({ name, image, author, onClose}) {
    return (
        <div className="library-popup-background" onClick={onClose}>
            <div className="library-popup-content" onClick = {e => e.stopPropagation()}>
                <img className="library-image" src={image} alt="No image" />
                <h3>{name}</h3>
                <p>{author}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default libraryPopUp;