import React, { useState, useEffect } from 'react';
import '../styles/champions.css';
import { BASE_URL } from "../config";


const UsersChampions = () => {
    const [champions, setChampions] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/champions`, {
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
    }, []);

    return (
        <div className="champions-page">
            <h1>Champions</h1>
            {/* <p>Welcome to the Champions page of the Dalhousie Chess Club.</p>
            <p>Explore the records of our champions and be inspired by their journey and accomplishments.</p> */}
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