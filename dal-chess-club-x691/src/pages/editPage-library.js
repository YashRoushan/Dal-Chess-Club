import React from 'react';
import { useState } from 'react';
import '../styles/editPage.css';

function EditLibrary() {

    const [items, setItems] = useState([
        {id: 1, title: 'Book 1'},
        {id: 2, title: 'Book 2'},
        {id: 3, title: 'Book 3'},
        {id: 4, title: 'Book 4'},
    ]);

    const handleEdit = async (itemId, title, author, image, available, description) => {
        const formData = { title, author, image, available, description };
        try {
          const response = await fetch(`/api/library/edit/${itemId}`, {
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
            console.error('Failed to update library book');
          }
        } catch (error) {
          console.error('Error updating library book:', error);
        }
      };

      const handleDelete = async (itemId) => {
        try {
          const response = await fetch(`/api/library/delete/${itemId}`, {
            method: 'DELETE',
          });
      
          const result = await response.json();
          if (result) {
            console.log(result);
            setItems((currentItems) => currentItems.filter(item => item.id !== itemId));
        } else {
            console.error('Failed to delete library book');
          }
        } catch (error) {
          console.error('Error deleting library book:', error);
        }
      };      

    return (
        <div className='editPage-container'>
            <h1>Edit Library</h1>
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