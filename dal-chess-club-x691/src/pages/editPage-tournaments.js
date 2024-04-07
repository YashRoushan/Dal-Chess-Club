import React from 'react';
import { useState } from 'react';
import '../styles/editPage.css';
import { Link } from 'react-router-dom';

function EditTournaments() {

    const [items, setItems] = useState([
        {id: 1, title: 'Tournament 1'},
        {id: 2, title: 'Tournament 2'},
        {id: 3, title: 'Tournament 3'},
        {id: 4, title: 'Tournament 4'},
    ]);

    /*const handleDelete = async (itemId) => {
        try {
            const response = await fetch(`/api/tournaments/delete/${itemId}`, {
                method: 'DELETE',
            });

            const result = await response.json();
            if (result) {
                console.log(result);
                setItems(currentItems => currentItems.filter(item => item.id !== itemId));
            } else {
                console.error('Failed to delete tournament');
            }
        } catch (error) {
            console.error('Error deleting tournament:', error);
        }
    };*/

    return (
        <div className='editPage-container'>
            <h1>Edit Tournaments</h1>
            <div className='editing-container'>
                {items.map(item => (
                    <div key = {item.id} className='item'>
                        <h3>{item.title}</h3>
                        <div className='buttons-container'>
                        <Link to={`/editForm-tournaments?itemId=${item.id}`}>
                                <button>Edit</button>
                        </Link>

                            
                        </div>
                    </div>
                 ))}
            </div>
        </div>
    );

};

export default EditTournaments;
