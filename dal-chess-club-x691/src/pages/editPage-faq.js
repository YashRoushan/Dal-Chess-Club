import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/editPage.css';

function EditFaq() {

    const [items, setItems] = useState([
        {id: 1, title: 'Question 1'},
        {id: 2, title: 'Question 2'},
        {id: 3, title: 'Question 3'},
        {id: 4, title: 'Question 4'},
    ]);

    const handleEdit = (itemId) => {
        console.log(itemId);
        window.location.href = `/editForm-faq?itemId=${itemId}`;
    };

    const handleDelete = (itemId) => {
        console.log(itemId);
        window.location.href = `/editForm-faq?itemId=${itemId}`;
    };

    return (
        <div className='editPage-container'>
            <div className='title'>
                <Link to='../adminLanding' onClick={() => {window.scroll({top: 0, left: 0, behavior: "smooth",});}}><button>Back</button></Link>
                <h1>Edit Questions</h1>
            </div>
            <div className='editing-container'>
                {items.map(item => (
                    <div key = {item.id} className='item'>
                        <h3>{item.title}</h3>
                        <div className='buttons-container'>
                            <Link to={`/editForm-faq?itemId=${item.id}`}>
                                <button>Edit</button>
                            </Link>
                            <Link to={``}>
                                <button>Delete</button>
                            </Link>
                        </div>
                    </div>
                 ))}
            </div>
        </div>
    );

};

export default EditFaq;