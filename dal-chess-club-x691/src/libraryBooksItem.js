import React, {useState} from "react";
import LibraryPopUp from './libraryBooksPopUp';

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