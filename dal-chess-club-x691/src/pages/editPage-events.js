import React from 'react';
import { useState } from 'react';
import '../styles/editPage.css';
import { Link } from 'react-router-dom';

function EditEvents() {

    const [items, setItems] = useState([
        {id: 1, title: 'Event 1'},
        {id: 2, title: 'Event 2'},
        {id: 3, title: 'Event 3'},
        {id: 4, title: 'Event 4'},
    ]);

    
    
    /*const handleDelete = async (itemId) => {
        try {
            const response = await fetch(`/api/events/delete/${itemId}`, {
                method: 'DELETE',
            });

            const result = await response.json();
            if (result) {
                console.log(result);
                setItems((currentItems) => currentItems.filter(item => item.id !== itemId));
            } else {
                console.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };*/

    return (
        <div className='editPage-container'>
            <h1>Edit Events</h1>
            <div className='editing-container'>
                {items.map(item => (
                    <div key = {item.id} className='item'>
                        <h3>{item.title}</h3>
                        <div className='buttons-container'>
                        <Link to={`/editForm-events?itemId=${item.id}`}>
                                <button>Edit</button>
                        </Link>
                        </div>
                    </div>
                 ))}
            </div>
        </div>
    );

};

export default EditEvents;