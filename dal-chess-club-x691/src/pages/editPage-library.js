import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/editPage.css';

function EditLibrary() {

    const [items, setItems] = useState([
        {id: 1, title: 'Book 1'},
        {id: 2, title: 'Book 2'},
        {id: 3, title: 'Book 3'},
        {id: 4, title: 'Book 4'},
    ]);

    const handleEdit = (itemId) => {
        console.log(itemId);
    };

    const handleDelete = (itemId) => {
        console.log(itemId);
    };

    return (
        <div className='editPage-container'>
            <div className='title'>
                <Link to='../adminLanding' onClick={() => {window.scroll({top: 0, left: 0, behavior: "smooth",});}}><button>Back</button></Link>
                <h1>Edit Library</h1>
            </div>
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

export default EditLibrary;