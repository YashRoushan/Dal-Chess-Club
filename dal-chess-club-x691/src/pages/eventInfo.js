import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config.js';
import EventInfoItem from '../eventInfoItem.js';
import TrainerItem from '../trainerItem.js';

function EventInfo() {
  const [tournamentsList, setTournamentsList] = useState({});
  const [participantCount, setParticipantCount] = useState(0);
  const [participants, setParticipants] = useState([]);
  const parameters = new URLSearchParams(window.location.search);
  const tournamentID = Number(parameters.get('itemId'));

  useEffect(() => {
    fetchTournamentData(tournamentID);
    fetchParticipantCount(tournamentID);
    fetchParticipants(tournamentID);
  }, [tournamentID]);

  // const [eventList, setEventsList] = useState([]);

  //   // Fetch events from the API
  //   useEffect(() => {
  //     fetch(`${BASE_URL}/improve`)
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log(data);
  //         setEventsList(data);
  //       })
  //       .catch(error => {
  //         console.error("Error fetching data:", error);
  //       });
  //   }, []); 

  const fetchTournamentData = async (id) => {
    const serverUrl = `${BASE_URL}/improve?id=${id}`;
    console.log('Fetching tournament data:', serverUrl);
    try {
      const response = await fetch(serverUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        console.error("No tournament found");
      } else {
        console.log('Tournament data:', data[0]);
        setTournamentsList(data[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchParticipantCount = async (id) => {
    const participantUrl = `${BASE_URL}/api/events/${id}/participants`;
    console.log('Fetching participant count:', participantUrl);
    try {
      const response = await fetch(participantUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Participant count:', data.participantCount);
      setParticipantCount(data.participantCount);
    } catch (error) {
      console.error("Error fetching participant count:", error);
    }
  };

  const fetchParticipants = async (id) => {
    console.log('Fetching participants for tournament ID:', id);
    try {
      const response = await fetch(`${BASE_URL}/api/registration`);
      const data = await response.json();
      console.log('All participants:', data); // Log all participants
      const filteredParticipants = data.filter(user => user.eventsID === id.toString());
      console.log('Filtered participants:', filteredParticipants);
      setParticipants(filteredParticipants);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  // return (
  //   <div>
  //     <div className="tournamentList">
  //     {eventList.map((eventItem, key) => {
  //       return(
  //         <EventInfoItem
  //           key={key}
  //           eventsID={eventItem.eventsID}
  //           name={eventItem.title}
  //           image={eventItem.eventImage}
  //           price={formatPrice(eventItem.cost)}
  //           date={formatDate(eventItem.start_date)}
  //           time={formatTime(eventItem.start_date)}
  //           endTime={formatTime(eventItem.end_date)}
  //           description={eventItem.description}
  //           participantsNo={participantCount} // Pass the participant count here
  //           registrationLink={tournamentsList.registration_link}
  //           participants={participants} // Pass the participants here
  //         />
  //       )
  //     })}
  //   </div>
  //   <div className="trainer">
  //       <h1>Speakers</h1>
  //         <div className="trainerList">
  //             {eventList.map((trainerItem, key) => {
  //               return(
  //                 <TrainerItem
  //                   key={key}
  //                   name={trainerItem.name}
  //                   image={trainerItem.speakerImage}
  //                   speciality={trainerItem.speciality}
  //                   description={trainerItem.bio}
  //                 />
  //               )
  //             })}
  //         </div>
  //     </div>
  //   </div>
  // );

  return (
    <EventInfoItem
      tournamentID={tournamentID}
      name={tournamentsList.title}
      image={tournamentsList.eventImage}
      price={formatPrice(tournamentsList.cost)}
      date={formatDate(tournamentsList.start_date)}
      time={formatTime(tournamentsList.start_date)}
      endTime={formatTime(tournamentsList.end_date)}
      participantsNo={participantCount} // Pass the participant count here
      description={tournamentsList.description}
      registrationLink={tournamentsList.registration_link}
      participants={participants} // Pass the participants here
    />
  );
}

function formatPrice(price) {
  if (!price || price === 0) {
    return "FREE";
  } else {
    return "$" + price;
  }
}

function formatDate(dateString) {
  if (!dateString) {
    return "Date TBD";
  }
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function formatTime(dateString) {
  const date = new Date(dateString);
  if (!dateString) {
    return "Finish";
  }
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}${ampm}`;
}

export default EventInfo;

// Move the associated speaker within the events pop-up display rather than having the speaker section

// The client has concerns that as the events page grows, 
//   it will be hard to decipher which speaker is associated with which event.
// Display the speaker card on the event view more page.
