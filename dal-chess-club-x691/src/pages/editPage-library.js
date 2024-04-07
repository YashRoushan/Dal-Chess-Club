import React from 'react';
import { useState } from 'react';
import '../styles/editPage.css';
import { Link } from 'react-router-dom';

function EditLibrary() {

    const [items, setItems] = useState([
        {id: 1, title: 'Book 1'},
        {id: 2, title: 'Book 2'},
        {id: 3, title: 'Book 3'},
        {id: 4, title: 'Book 4'},
    ]);


      /*const handleDelete = async (itemId) => {
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
      };   */   

    return (
        <div className='editPage-container'>
            <h1>Edit Library</h1>
            <div className='editing-container'>
                {items.map(item => (
                    <div key = {item.id} className='item'>
                        <h3>{item.title}</h3>
                        <div className='buttons-container'>
                        <Link to={`/editForm-library?itemId=${item.id}`}>
                                <button>Edit</button>
                        </Link>
                        </div>
                    </div>
                 ))}
            </div>
        </div>
    );

};

export default EditLibrary;