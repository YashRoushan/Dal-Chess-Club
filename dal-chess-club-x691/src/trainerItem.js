import React, {useState} from "react";
import TrainerPopUp from './trainerPopUp';

function TrainerItem({name, image,  description }) {
  
  const [showPopUp, setShowPopUp] = useState(false);
  
  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  }

  return (
    <div className="trainerItem" onClick={togglePopUp}>
      <img className="trainer-image" src={image} alt="Trainer Image" />
      <h1> {name} </h1>
      {showPopUp && (
        <TrainerPopUp
          name={name}
          image={image}
          description={description}
          onClose={togglePopUp}
        />
      )}
    </div>
  );
}

export default TrainerItem;