import React, { useState, useEffect } from 'react';
import '../styles/champions.css';
import { BASE_URL } from "../config";

const UsersChampions = () => {
    const [champions, setChampions] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState("Dalhousie Chess Championship");

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/champions?tournament=${encodeURIComponent(selectedTournament)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (isMounted) {
                        setChampions(data);
                    }
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error updating champions:', error);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [selectedTournament]);

    const tournaments = [
        "Dalhousie Chess Championship",
        "Dalhousie Open",
        "Summer Rapid Open",
        "Summer Blitz Battle",
        "Owen Maitzen Rapid Open",
        "Fall Blitz Battle",
        "Winter Rapid Open",
        "Winter Blitz Battle"
    ];

    return (
        <div className="champions-page">
            <div className="tournament-tabs">
                <ul className="nav-tabs">
                    {tournaments.map(tournament => (
                        <li
                            key={tournament}
                            className={tournament === selectedTournament ? 'active' : ''}
                            onClick={() => setSelectedTournament(tournament)}
                        >
                            {tournament}
                        </li>
                    ))}
                </ul>
            </div>
            <h1>Champions</h1>
            <table className="champions-table">
                <thead>
                <tr>
                    <th>Champion Name</th>
                    <th>Year</th>
                </tr>
                </thead>
                <tbody>
                {champions.map((champion, index) => (
                    <tr key={index}>
                        <td>{champion.name}</td>
                        <td>{formatDate(champion.year)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersChampions;

// adapted from tournaments.js 
export function formatDate(dateString) {
    if (!dateString) {
      return "Date TBD";
    }
    const date = new Date(dateString);
    
    const year = date.getFullYear();
  
    return `${year}`;
}
