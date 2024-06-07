import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/editPage.css';
import { BASE_URL } from '../config';

function Subscribers() {
    const [items, setItems] = useState([]);  // Initialize items as an empty array
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch subscribers from the backend on component mount
        axios.get(`${BASE_URL}/api/subscribers`)
            .then(response => {
                // Update state with the fetched subscribers
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching subscribers:', error);
                // Handle errors here, such as displaying a notification or setting error messages in state
            });
    }, []);  // The empty array ensures this effect runs only once after initial render
    console.log(items);
    const handleDelete = (item) => {
        navigate(`/subscribersDeleteForm?email=${item.email}&id=${item.id}`);
    };

    return (
        <div className='editPage-container'>
            <h1>Subscribers List</h1>
            <div className='editing-container'>
                {items.map(item => (
                    <div key={item.id} className='item'>
                        <h3>Name: {item.name}</h3>  {/* Display the subscriber's full name */}
                        <h3>Email: {item.email}</h3>
                        <div className='buttons-container'>
                            <button onClick={() => handleDelete(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscribers;
