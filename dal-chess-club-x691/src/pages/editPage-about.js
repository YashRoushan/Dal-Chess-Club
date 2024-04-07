import React from 'react';
import { useState } from 'react';
import '../styles/editPage.css';
import { Link } from 'react-router-dom';

function EditAbout() {

    const [items, setItems] = useState([
        {id: 1, title: 'President'},
        {id: 2, title: 'Secretary'},
        {id: 3, title: 'Member'},
        {id: 4, title: 'Member'},
    ]);

    

    /*const handleDelete = async (itemId) => {
        try {
            const response = await fetch(`/api/members/delete/${itemId}`, {
                method: 'DELETE'
            });

            const result = await response.json();
            if (result) {
                console.log(result);
                setItems((currentItems) => currentItems.filter(item => item.id !== itemId));
            } else {
            console.error('Failed to delete member');
            }
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    };*/

    return (
        <div className='editPage-container'>
            <h1>Edit Members</h1>
            <div className='editing-container'>
                {items.map(item => (
                    <div key = {item.id} className='item'>
                        <h3>{item.title}</h3>
                        <div className='buttons-container'>
                        <Link to={`/editForm-about?itemId=${item.id}`}>
                                <button>Edit</button>
                        </Link>
                        </div>
                    </div>
                 ))}
            </div>
        </div>
    );

};

export default EditAbout;