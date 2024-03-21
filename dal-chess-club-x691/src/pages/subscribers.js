import React from 'react';
import { useState } from 'react';
import '../styles/editPage.css';

function Subscribers() {

    const [items, setItems] = useState([
        {id: 1, title: 'Subscriber'},
        {id: 2, title: 'Subscriber'},
        {id: 3, title: 'Subscriber'},
        {id: 4, title: 'Subscriber'},
    ]);

    // const handleEdit = (itemId) => {
    //     console.log(itemId);
    // };

    const handleDelete = (itemId) => {
        console.log(itemId);
    };

    return (
        <div className='editPage-container'>
            <h1>Subscribers List</h1>
            <div className='editing-container'>
                {items.map(item => (
                    <div key = {item.id} className='item'>
                        <h3>{item.title}</h3>
                        <div className='buttons-container'>
                            {/* <button onClick={() => handleEdit(item.id)}>Edit</button> */}
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                 ))}
            </div>
        </div>
    );

};

export default Subscribers;