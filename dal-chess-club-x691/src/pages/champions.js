import React, { useState, useEffect } from 'react';
import '../styles/champions.css';
import { BASE_URL } from "../config";
import {Link} from "react-router-dom";

const Champions = () => {
    const [champions, setChampions] = useState([
        { name: 'Champion 1', year: new Date().toISOString().split('T')[0] },
        { name: 'Champion 2', year: new Date().toISOString().split('T')[0] },
        { name: 'Champion 3', year: new Date().toISOString().split('T')[0] },
    ]);

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
            <p>Welcome to the Champions page of the Dalhousie Chess Club.</p>
            <p>Explore the records of our champions and be inspired by their journey and accomplishments.</p>
            <table className="champions-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Champion Name</th>
                    <th>Year</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {champions.map((champion, index) => (
                    <tr key={index}>
                        <td>{champion.id}</td>
                        <td>{champion.name}</td>
                        <td>{champion.year}</td>
                        <td>
                            <div className='buttons-container'>
                                <Link to={`../Champions-EditForm?id=${champion.id}`}>
                                    <button>Edit</button>
                                </Link>
                            </div>
                        </td>
                    </tr>

                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Champions;