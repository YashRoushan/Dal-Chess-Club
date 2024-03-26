import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/editPage.css';

function EditNews() {

    const [items, setItems] = useState([
        {id: 1, title: 'Event 1'},
        {id: 2, title: 'Event 2'},
        {id: 3, title: 'Event 3'},
        {id: 4, title: 'Event 4'},
    ]);

    const handleEdit = (itemId) => {
        console.log(itemId);
        window.location.href = `/editForm-news?itemId=${itemId}`;
    };

    const handleDelete = (itemId) => {
        console.log(itemId);
        window.location.href = `/editForm-news?itemId=${itemId}`;
    };

    return (
        <div className='editPage-container'>
            <h1>Edit News</h1>
            <div className='editing-container'>
                {items.map(item => (
                    <div key = {item.id} className='item'>
                        <h3>{item.title}</h3>
                        <div className='buttons-container'>
                            <Link to={`/editForm-news?itemId=${item.id}`}>
                                <button>Edit</button>
                            </Link>
                            <Link to={`/deleteForm?itemId=${item.id}`}>
                                <button>Delete</button>
                            </Link>
                        </div>
                    </div>
                 ))}
            </div>
        </div>
    );

};

export default EditNews;