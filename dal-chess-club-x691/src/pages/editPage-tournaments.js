import React from 'react';
import { BASE_URL} from '../config.js';
import { useState, useEffect } from 'react';
import '../styles/editPage.css';
import { Link } from 'react-router-dom';
import TournamentItem from '../tournamentItem.js';
import {Tournaments, formatDate, formatTime, formatPrice} from "./tournaments.js";


function EditTournaments() {


    useEffect(()=>{
        fetchData();
    })
    const [items, setItems] = useState([
        {tournamentsID: 1, title: 'Tournament 1'},
        {tournamentsID: 2, title: 'Tournament 2'},
        {tournamentsID: 3, title: 'Tournament 3'},
        {tournamentsID: 4, title: 'Tournament 4'},
    ]);



    const fetchData = () =>{
        const tournamentURL = `${BASE_URL}/tournaments`;
        fetch(tournamentURL).then(response => {
            if(!response.ok){
                throw new Error('Error fetching tournaments');
            }
            response.json().then(data => {
                console.log(data);
                setItems(data);
            })
        })
    }

    /*const handleDelete = async (itemId) => {
        try {
            const response = await fetch(`/api/tournaments/delete/${itemId}`, {
                method: 'DELETE',
            });

            const result = await response.json();
            if (result) {
                console.log(result);
                setItems(currentItems => currentItems.filter(item => item.id !== itemId));
            } else {
                console.error('Failed to delete tournament');
            }
        } catch (error) {
            console.error('Error deleting tournament:', error);
        }
    };*/

    return (
        <div className='editPage-container'>
            <h1>Edit Tournaments</h1>
            <div className='editing-container'>
                {items.map(tournament => (
                    <div key = {tournament.tournamentsID} className='item'>
                        {/*<h3>{item.title}</h3>*/}
                        <h3>{tournament.id}</h3>
                        <TournamentItem
                            key={tournament.tournamentsID}
                            name={tournament.title}
                            image={tournament.image}
                            price={formatPrice(tournament.cost)}
                            date={formatDate(tournament.start_date)}
                            time={formatTime(tournament.start_date)}
                            endTime={formatTime(tournament.end_date)}
                            participantsNo={tournament.num_of_participants}
                            description={tournament.description}
                            registrationLink={tournament.registration_link}
                        />
                        <div className='buttons-container'>
                        <Link to={`/editForm-tournaments?itemId=${tournament.tournamentsID}`}>
                                <button>Edit Tournament</button>
                        </Link>
                            <Link to={`/editForm-liveTournament?itemId=${tournament.tournamentsID}`}>
                                <button>Update Live</button>
                            </Link>
                        </div>
                    </div>
                 ))}
            </div>
        </div>
    );

};

export default EditTournaments;
