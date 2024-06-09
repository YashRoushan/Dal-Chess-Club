import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/adminLanding.css';

const AdminLanding = () => {
    const [visibleDropdown, setVisibleDropdown] = useState(null);

    const toggleDropdown = (dropdown) => {
        setVisibleDropdown(visibleDropdown === dropdown ? null : dropdown);
    };

    const redirectLink = [
        { label: 'Add Tournament', to: '/Tournaments-AddForm', category: 'tournament' },
        { label: 'Edit Tournament', to: '/editTournaments', category: 'tournament' },
        { label: 'Add Book', to: '/Library-AddForm', category: 'book' },
        { label: 'Edit Books', to: '/editLibrary', category: 'book' },
        { label: 'Add News', to: '/News-AddForm', category: 'news' },
        { label: 'Edit News', to: '/editNews', category: 'news' },
        { label: 'Add Trainer', to: '/Trainers-AddForm', category: 'trainer' },
        { label: 'Edit Trainer', to: '/editTrainer', category: 'trainer' },
        { label: 'Add Event', to: '/Events-AddForm', category: 'event' },
        { label: 'Edit Event', to: '/editEvent', category: 'event' },
        { label: 'Add FAQ', to: '/FAQ-AddForm', category: 'FAQ' },
        { label: 'Edit FAQ', to: '/editFAQ', category: 'FAQ' },
        { label: 'Add AboutUs', to: '/AboutUs-AddForm', category: 'aboutUs' },
        { label: 'Edit AboutUs', to: '/editAbout', category: 'aboutUs' },
        { label: 'Subscribers', to: '/subscribers' },
    ];

    const categorizedLinks = {
        tournament: redirectLink.filter(link => link.category === 'tournament'),
        book: redirectLink.filter(link => link.category === 'book'),
        news: redirectLink.filter(link => link.category === 'news'),
        trainer: redirectLink.filter(link => link.category === 'trainer'),
        event: redirectLink.filter(link => link.category === 'event'),
        FAQ: redirectLink.filter(link => link.category === 'FAQ'),
        aboutUs: redirectLink.filter(link => link.category === 'aboutUs'),
    };

    return (
        <div className="page">
            <h1>Welcome!</h1>
            <div className='button-container'>
                {Object.keys(categorizedLinks).map((category, index) => (
                    <div key={index} className="dropdown">
                        <button
                            className="dropdown-button"
                            onClick={() => toggleDropdown(category)}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)} Options
                        </button>
                        {visibleDropdown === category && (
                            <div className="dropdown-content">
                                {categorizedLinks[category].map((link, index) => (
                                    <Link key={index} className='dropdown-link' to={link.to}>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <Link className='redirectLink' to='/subscribers'>Subscribers</Link>
            </div>
        </div>
    );
};

export default AdminLanding;
