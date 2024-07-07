import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/adminLanding.css';

const adminLanding = () => {

    //Variable to handle the link content
    const redirectLink = [
        { label: 'Add Tournament', to: '/Tournaments-AddForm'},
        { label: 'Edit Tournament', to: '/editTournaments'},
        { label: 'Add Book', to: '/Library-AddForm'},
        { label: 'Edit Books', to: '/editLibrary'},
        { label: 'Add News', to: '/News-AddForm'},
        { label: 'Edit News', to: '/editNews'},
        { label: 'Add Trainer', to: '/Trainers-AddForm'},
        { label: 'Edit Trainer', to: '/editTrainer'},
        { label: 'Add Event', to: '/Events-AddForm'},
        { label: 'Edit Event', to: '/editEvent'},
        { label: 'Add FAQ', to: '/FAQ-AddForm'},
        { label: 'Edit FAQ', to: '/editFaq'},
        { label: 'Add AboutUs', to: '/AboutUs-AddForm'},
        { label: 'Edit AboutUs', to: '/editAbout'},
        { label: 'Subscribers', to: '/subscribers'},
    ];

    //Code for the page layout
    return (
    <div className="page">
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