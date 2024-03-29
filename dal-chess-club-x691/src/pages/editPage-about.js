import React from 'react';
import { useState } from 'react';
import '../styles/editPage.css';

function EditAbout() {

    const [items, setItems] = useState([
        {id: 1, title: 'President'},
        {id: 2, title: 'Secretary'},
        {id: 3, title: 'Member'},
        {id: 4, title: 'Member'},
    ]);

    const handleEdit = (itemId) => {
        console.log(itemId);
    };

    const handleDelete = (itemId) => {
        console.log(itemId);
    };

    return (
        <div className='editPage-container'>
            <h1>Edit Members</h1>
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

export default EditAbout;