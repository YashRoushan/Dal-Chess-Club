import React, { useState } from 'react';
import './AddForms.css';

function LiveTournamentsAddForm() {
    const [gameId, setGameId] = useState(0);
    const [Player1, setPlayer1] = useState('');
    const [Player2, setPlayer2] = useState('');
    const [Player1_time, setPlayer1_time] = useState('');
    const [Player2_time, setPlayer2_time] = useState('');
    const [Player1_score, setPlayer1_score] = useState(0);
    const [Player2_score, setPlayer2_score] = useState(0);
    const [game_date, setGame_date] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const handleAdd = async (event) => {
        event.preventDefault();
        const formData = { gameId, Player1, Player2, Player1_time, Player2_time, Player1_score, Player2_score, game_date };
        try {
            const response = await fetch('http://localhost:5001/api/live-tournaments/add', {
                method: 'POST',
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

            {/* First Form */}
            <div className="form-container">
                <form className="form-element" onSubmit={handleAdd}>
                    <label>Player 1 Name:</label>
                    <input className="text-form" type="text" value={Player1} onChange={(e) => setPlayer1(e.target.value)} required />
                </form>
            </div>

            {/* Second Form */}
            <div className="form-container">
                <form className="form-element">
                    <label>Player 2 Name:</label>
                    <input className="text-form-c" type="text" value={Player2} onChange={(e) => setPlayer2(e.target.value)} required />
                </form>
            </div>

            {/* Third Form */}
            <div className="form-container">
                <form className="form-element">
                    <label>Player 1 Time Taken:</label>
                    <input className="text-form" type="time" value={Player1_time} onChange={(e) => setPlayer1_time(e.target.value)} required />
                </form>
            </div>

            {/* Fourth Form */}
            <div className="form-container">
                <form className="form-element">
                    <label>Player 2 Time Taken:</label>
                    <input className="text-form" type="time" value={Player2_time} onChange={(e) => setPlayer2_time(e.target.value)} required />
                </form>
            </div>

            {/* Fifth Form */}
            <div className="form-container">
                <h3>Outcome: </h3>
                <form className="form-element">
                    <label>Player 1 Score: </label>
                    <input className="text-form" type="number" value={Player1_score} onChange={(e) => setPlayer1_score(parseInt(e.target.value, 10))} required />
                    <label>Player 2 Score: </label>
                    <input className="text-form" type="number" value={Player2_score} onChange={(e) => setPlayer2_score(parseInt(e.target.value, 10))} required />
                </form>
            </div>

            {/* Sixth Form */}
            <div className="form-container">
                <form className="form-element">
                    <label>Game Date:</label>
                    <input className="text-form" type="datetime-local" value={game_date} onChange={(e) => setGame_date(e.target.value)} required />
                </form>
            </div>

            <div className="submit-button-container">
                <button onClick={handleAdd} type="button">Submit</button>
            </div>
            {successMessage && <p>{successMessage}</p>}
        </div>
    )
}

export default LiveTournamentsAddForm;