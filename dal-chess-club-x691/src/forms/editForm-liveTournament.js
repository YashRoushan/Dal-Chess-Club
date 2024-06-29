import React, { useState, useEffect } from 'react';
import './AddForms.css';
import { BASE_URL } from "../config";

function LiveTournamentsAddForm() {
    const parameters = new URLSearchParams(window.location.search);
    // console.log(parameters.get("itemId"));
    const currentGameId = parameters.get('itemId');
    const [gameId, setGameId] = useState(currentGameId);
    const [Player1, setPlayer1] = useState('');
    const [Player2, setPlayer2] = useState('');
    const [Player1_time, setPlayer1_time] = useState('');
    const [Player2_time, setPlayer2_time] = useState('');
    const [Player1_score, setPlayer1_score] = useState(0);
    const [Player2_score, setPlayer2_score] = useState(0);
    const [game_date, setGame_date] = useState('');
    const [successMessage, setSuccessMessage] = useState('');




    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const tournamentURL = `${BASE_URL}/api/live-tournaments/${gameId}`;
        fetch(tournamentURL).then(response => {
            if (!response.ok) {
                // Show the default page.
            }
            response.json().then(data => {
                setPlayer1(data.Player1);
                setPlayer2(data.Player2);
                setPlayer1_time(data.Player1_time);
                setPlayer2_time(data.Player2_time);
                setPlayer1_score(data.Player1_score)
                setPlayer2_score(data.Player2_score);
                data.game_date !== undefined && setGame_date(new Date(data.game_date).toISOString().slice(0, 19).replace('T', ' '));
            })
        })
    }


    const handleAdd = async (event) => {
        event.preventDefault();
        const formData = { gameId, Player1, Player2, Player1_time, Player2_time, Player1_score, Player2_score, game_date };
        try {
            const response = await fetch(`${BASE_URL}/api/live-tournaments/edit/${gameId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to add live tournament:', errorText);
                setSuccessMessage('');
                return;
            }

            const result = await response.json();
            if (result) {
                console.log(result);
                setSuccessMessage('Tournament added successfully!');
            } else {
                console.error('Failed to add tournament');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSuccessMessage('');
        }
    };

    return (
        <div className="add-form-container">

            <div className="header-info">
                <h2 id="main-header">Add Live Tournament</h2>
                <p>This is the page where you, the admin, can add new tournaments.</p>
            </div>


            <form className="form-element" onSubmit={handleAdd}>
                {/* Player 1 Name */}
                <div className="form-container">
                    <label>Player 1 Name:</label>
                    <input className="text-form" type="text" value={Player1} onChange={(e) => setPlayer1(e.target.value)} required />
                </div>

                {/* Player 2 Name */}
                <div className="form-container">
                    <label>Player 2 Name:</label>
                    <input className="text-form" type="text" value={Player2} onChange={(e) => setPlayer2(e.target.value)} required />
                </div>

                {/* Player 1 Time Taken */}
                <div className="form-container">
                    <label>Player 1 Time Taken:</label>
                    <input className="text-form" type="time" value={Player1_time} onChange={(e) => setPlayer1_time(e.target.value)} required />
                </div>

                {/* Player 2 Time Taken */}
                <div className="form-container">
                    <label>Player 2 Time Taken:</label>
                    <input className="text-form" type="time" value={Player2_time} onChange={(e) => setPlayer2_time(e.target.value)} required />
                </div>

                {/* Outcome */}
                <div className="form-container">
                    <h3>Outcome: </h3>
                    <label>Player 1 Score: </label>
                    <input className="text-form" type="number" value={Player1_score} onChange={(e) => setPlayer1_score(parseInt(e.target.value, 10))} required />
                    <label>Player 2 Score: </label>
                    <input className="text-form" type="number" value={Player2_score} onChange={(e) => setPlayer2_score(parseInt(e.target.value, 10))} required />
                </div>

                {/* Game Date */}
                <div className="form-container">
                    <label>Game Date:</label>
                    <input className="text-form" type="datetime-local" value={game_date} onChange={(e) => setGame_date(e.target.value)} required />
                </div>

                <div className="submit-button-container">
                    <button type="submit">Submit</button>
                </div>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    )
}

export default LiveTournamentsAddForm;