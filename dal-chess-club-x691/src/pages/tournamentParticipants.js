import React, { useState, useEffect } from 'react';
import "../styles/tournaments.css";
import { BASE_URL } from '../config.js';
import {useLocation} from "react-router-dom";
import {formatDate, formatPrice, formatTime} from "./tournaments";
import button from "bootstrap/js/src/button";

function TournamentParticipants() {
    const [participants, setParticipants] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tournamentID = searchParams.get('itemId');

    useEffect(() => {
        fetchData();
    }, [tournamentID]);

    const fetchData = (async () => {
      try{
          const participantUrl = `${BASE_URL}/api/registration`;
          const response = await fetch(participantUrl, {
              method: 'GET',
          })
          if(!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const filteredParticipants = data.filter(user => user.tournamentsID === tournamentID.toString());
          //console.log("data is" , data);
          setParticipants(filteredParticipants);
      }  catch (e){
          console.log("Error fetching tournament Participants: ", e);
      }
    })

    const deleteParticipant = async (id) => {
        try{
            const deleteURL = `${BASE_URL}/api/registration/delete/${id}`;
            const response = await fetch(deleteURL, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setParticipants(participants.filter(user => user.id !== id));
        }
        catch (e){
            console.log("Error deleting Participants: ", e);
        }
    }

    return (
        <div className='editPage-container'>
            <h1>List of Participants</h1>
            <div className='editing-container'>
                <table className="tournament-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>CFC ID</th>
                        <th>Entry Date</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {participants.map(participant => (
                        <tr key={participant.id}>
                            <td>{participant.fullname}</td>
                            <td>{participant.email}</td>
                            <td>{participant.cfcID}</td>
                            <td>{formatDate(participant.entry_date)}</td>
                            <td>
                                <button onClick={(e)=>deleteParticipant(participant.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TournamentParticipants;