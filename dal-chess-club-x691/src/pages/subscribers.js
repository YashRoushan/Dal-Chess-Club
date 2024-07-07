import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/editPage.css';

function Subscribers() {

    const [items, setItems] = useState([
        {id: 1, title: 'Subscriber'},
        {id: 2, title: 'Subscriber'},
        {id: 3, title: 'Subscriber'},
        {id: 4, title: 'Subscriber'},
    ]);

    const handleDelete = (itemId) => {
        console.log(itemId);
        window.location.href = `/subscribersDeleteForm?itemId=${itemId}`;
    };

    return (
        <div className='editPage-container'>
            <h1>Subscribers List</h1>
            <div className='editing-container'>
                {items.map(item => (
                    <div key={item.id} className='item'>
                        <h3>{item.title}</h3>
                        <div className='buttons-container'>
                            {/* Use Link component for the "Delete" button */}
                            <Link to={`/subscribersDeleteForm?itemId=${item.id}`}>
                                <button>Delete</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default Subscribers;