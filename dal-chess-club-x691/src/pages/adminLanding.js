import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/adminLanding.css';

const adminLanding = () => {

    //Variable to handle the link content
    const redirectLink = [
        { label: 'Add Tournament'},
        { label: 'Edit Tournament', to: '../editTournaments'},
        { label: 'Add Book'},
        { label: 'Edit Books', to: '../editLibrary'},
        { label: 'Add News'},
        { label: 'Edit News', to: '../editNews'},
        { label: 'Add Trainer',},
        { label: 'Edit Trainer', to: '../editTrainer'},
        { label: 'Add Event'},
        { label: 'Edit Event', to: '../editEvent'},
        { label: 'Add FAQ'},
        { label: 'Edit FAQ', to: '../editFaq'},
        { label: 'Add AboutUs'},
        { label: 'Edit AboutUs', to: '../editAbout'},
    ];

    //Code for the page layout
    return (
    <div class="page">
        <h1>Welcome!</h1>
        <div className='button-container'>
            <br></br>
            {redirectLink.map((button , index) => (
                <Link key={index} className='redirectLink' to={button.to}>{button.label}</Link>
            ))}
        </div>
    </div>
    );
};

export default adminLanding;