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
    const [pairingsIframe, setPairingsIframe] = useState('');
    const [standingsIframe, setStandingsIframe] = useState('');
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
                <p>To add pairings and standings tables, publish the respective <a href="https://support.google.com/docs/answer/183965?hl=en&co=GENIE.Platform%3DDesktop#zippy=%2Cstop-publishing-a-file%2Cembed-a-document-spreadsheet-or-presentation." target="_blank">Google Spreadsheet</a> as a web page and embed here:</p>
                <ul className="list-group">
                    <li>Open your Google Spreadsheet.</li>
                    <li>Click on File > Publish to the web.</li>
                    <li>Choose the Embed option and select the sheet you want to embed.</li>
                    <li>Click on 'Publish', then copy the HTML code provided.</li>
                </ul>
            </div>


            <form className="form-element" onSubmit={handleAdd}>


                <div className="form-container">
                    {/* Pairings Iframe Input */}
                    <label>Pairings Table (iframe):</label>
                    <textarea className="text-form" value={pairingsIframe} onChange={(e) => setPairingsIframe(e.target.value)} required />

                    {/* Standing Iframe Input */}
                    <label>Standings Table (iframe):</label>
                    <textarea className="text-form" value={standingsIframe} onChange={(e) => setStandingsIframe(e.target.value)} required />
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