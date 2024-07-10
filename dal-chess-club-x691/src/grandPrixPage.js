import React from 'react';
import './styles/grandPrix.css';

function GrandPrixPage() {
    return (
        <div className='grandPrix-background'>
            <div className='grandPrix-container'>
                <h1 className='grandPrix-title'>Grand Prix Standings</h1>
                <iframe 
                    className='grandPrix-iframe' 
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQAYuIdHE48BSbyi0BThV4LdI8AUWuS4KJXXnxWnQ0nBzFPzSkQhk6-sVJ5uuHi9phhL8nAhFXi9teQ/pubhtml?widget=true&amp;headers=false"
                    title="Grand Prix Standings"
                ></iframe>
            </div>
        </div>
    );
}

export default GrandPrixPage;
