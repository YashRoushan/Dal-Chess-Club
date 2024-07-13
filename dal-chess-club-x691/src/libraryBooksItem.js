import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import LibraryPopUp from './libraryBooksPopUp';
import { BASE_URL } from './config.js';

function LibraryItem({name, image, author }) {
  
  
  const [showPopUp, setShowPopUp] = useState(false);
  
  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  }

  return (
    <div className="libraryItem" onClick={togglePopUp}>
      <img className="library-image" src={image} alt="Book Image" />
      <h3> {name} </h3>
      {showPopUp && (
        <LibraryPopUp
          name={name}
          image={image}
          author={author}
          onClose={togglePopUp}
        />
      )}
    </div>
  );
}

export default LibraryItem;