import React from 'react';
import { useState } from 'react';
import '../styles/editPage.css';

function EditEvents() {

    const [items, setItems] = useState([
        {id: 1, title: 'Event 1'},
        {id: 2, title: 'Event 2'},
        {id: 3, title: 'Event 3'},
        {id: 4, title: 'Event 4'},
    ]);

    const handleEdit = (itemId) => {
        console.log(itemId);
    };

    const handleDelete = (itemId) => {
        console.log(itemId);
    };

    return (
        <div className='editPage-container'>
            <h1>Edit Events</h1>
            <div className='editing-container'>
                {items.map(item => (
                    <div key = {item.id} className='item'>
                        <h3>{item.title}</h3>
                        <div className='buttons-container'>
                            <button onClick={() => handleEdit(item.id)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                 ))}
            </div>
        </div>
    );

};

export default EditEvents;