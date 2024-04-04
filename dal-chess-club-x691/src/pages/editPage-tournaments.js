import React from 'react';
import { useState } from 'react';
import '../styles/editPage.css';

function EditTournaments() {

    const [items, setItems] = useState([
        {id: 1, title: 'Tournament 1'},
        {id: 2, title: 'Tournament 2'},
        {id: 3, title: 'Tournament 3'},
        {id: 4, title: 'Tournament 4'},
    ]);

    const handleEdit = async (itemId, title, description, cost, event_imageID, registration_link, start_date, end_date, num_of_participants, locationID, requirements, prizes, tournament_typeID, registration_deadline, cfc_required) => {
        const formData = { title, description, cost, event_imageID, registration_link, start_date, end_date, num_of_participants, locationID, requirements, prizes, tournament_typeID, registration_deadline, cfc_required };
        try {
            const response = await fetch(`/api/tournaments/edit/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result) {
                console.log(result);
            } else {
                console.error('Failed to update tournament');
            }
        } catch (error) {
            console.error('Error updating tournament:', error);
        }
    };

    const handleDelete = async (itemId) => {
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
    };

    return (
        <div className='editPage-container'>
            <h1>Edit Tournaments</h1>
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

export default EditTournaments;
