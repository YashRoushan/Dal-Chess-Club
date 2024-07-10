import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/adminLanding.css';
import tournamentIcon from '../images/tournament.png';
import bookIcon from '../images/book.png';
import championIcon from '../images/championship.png';
import newsIcon from '../images/newspaper.png';
import trainerIcon from '../images/trainer.png';
import eventIcon from '../images/event.png';
import faqIcon from '../images/FAQ.png';
import aboutUsIcon from '../images/aboutUs.png';
import subscribersIcon from '../images/subscribe.jpg';

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
        { label: 'Add Champion', to: '/Champions-AddForm', category: 'champion' },
        { label: 'Edit Champion', to: '/champions', category: 'champion' },
    ];

    const categorizedLinks = {
        tournament: redirectLink.filter(link => link.category === 'tournament'),
        book: redirectLink.filter(link => link.category === 'book'),
        news: redirectLink.filter(link => link.category === 'news'),
        trainer: redirectLink.filter(link => link.category === 'trainer'),
        event: redirectLink.filter(link => link.category === 'event'),
        FAQ: redirectLink.filter(link => link.category === 'FAQ'),
        aboutUs: redirectLink.filter(link => link.category === 'aboutUs'),
        champion: redirectLink.filter(link => link.category === 'champion'),
    };

    const icons = {
        tournament: tournamentIcon,
        book: bookIcon,
        news: newsIcon,
        trainer: trainerIcon,
        event: eventIcon,
        FAQ: faqIcon,
        aboutUs: aboutUsIcon,
        champion: championIcon,
        subscribers: subscribersIcon
    };

    return (
        <div className="admin-page">
            <h1>Welcome!</h1>
            <div className='admin-button-container-row1'>
                {['tournament', 'book', 'news', 'trainer'].map((category, index) => (
                    <div
                        key={index}
                        className="admin-dropdown"
                        onMouseLeave={() => setVisibleDropdown(null)}
                    >
                        <button
                            className={`admin-dropdown-button ${category}`}
                            onClick={() => toggleDropdown(category)}
                        >
                            <span className="label">{category.charAt(0).toUpperCase() + category.slice(1)} Options</span>
                            <img src={icons[category]} alt={`${category} icon`} className="icon" />
                        </button>
                        {visibleDropdown === category && (
                            <div className="admin-dropdown-content admin-show">
                                {categorizedLinks[category].map((link, index) => (
                                    <Link key={index} className='admin-dropdown-link' to={link.to}>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className='admin-button-container-row2'>
                {['event', 'FAQ', 'aboutUs', 'champion'].map((category, index) => (
                    <div
                        key={index}
                        className="admin-dropdown"
                        onMouseLeave={() => setVisibleDropdown(null)}
                    >
                        <button
                            className={`admin-dropdown-button ${category}`}
                            onClick={() => toggleDropdown(category)}
                        >
                            <span className="label">{category.charAt(0).toUpperCase() + category.slice(1)} Options</span>
                            <img src={icons[category]} alt={`${category} icon`} className="icon" />
                        </button>
                        {visibleDropdown === category && (
                            <div className="admin-dropdown-content admin-show">
                                {categorizedLinks[category].map((link, index) => (
                                    <Link key={index} className='admin-dropdown-link' to={link.to}>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <div className="admin-dropdown">
                    <Link to="/subscribers" className={`admin-dropdown-button subscribers`}>
                        <span className="label">Subscribers</span>
                        <img src={icons.subscribers} alt="subscribers icon" className="icon" />
                    </Link>
                    <Link to="/grandPrixForm" className={`admin-dropdown-button grandPrixForm`}>
                        <span className="label">Grand Prix</span>
                        
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLanding;