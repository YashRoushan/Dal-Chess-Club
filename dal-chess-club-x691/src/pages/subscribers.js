import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/editPage.css';
import { BASE_URL } from '../config';

function Subscribers() {
    const [items, setItems] = useState([]); // Initialize items as an empty array
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch subscribers from the backend on component mount
        axios.get(`${BASE_URL}/api/subscribers`)
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching subscribers:', error);
            });
    }, []);

    const handleDelete = (item) => {
        navigate(`/subscribersDeleteForm?email=${item.email}&id=${item.id}`);
    };

    const copyToClipboard = () => {
        const mailingList = items.map(item => item.email).join(';');
        navigator.clipboard.writeText(mailingList).then(() => {
            alert('Mailing list copied to clipboard!');
        }).catch(error => {
            console.error('Failed to copy text:', error);
        });
    };

    return (
        <div className='editPage-container'>
            <h1>Subscribers List</h1>
            <div className='mailingList-container'>
                <button onClick={copyToClipboard} className='copy-button'>Copy All the Emails</button>
            </div>
            <table className="subscribers-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                                <button onClick={() => handleDelete(item)} className='copy-button'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Subscribers;
