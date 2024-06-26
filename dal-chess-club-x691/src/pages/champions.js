import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/champions.css';

const Champions = () => {
    const [champions, setChampions] = useState([]);

    useEffect(() => {
        // Fetch data from the database
        axios.get('/api/champions')
            .then(response => {
                setChampions(response.data);
            })
            .catch(error => {
                console.error('Error fetching champions data:', error);
            });
    }, []);

    return (
        <div className="champions-page">
            <h1>Champions</h1>
            <p>Welcome to the Champions page of the Dalhousie Chess Club.</p>
            <p>Explore the records of our champions and be inspired by their journey and accomplishments.</p>
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
                            <td>{champion.year}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Champions;