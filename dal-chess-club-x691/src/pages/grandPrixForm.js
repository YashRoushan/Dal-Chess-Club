import React, { useState } from 'react';
import '../styles/editPage.css';

function GrandPrixForm() {
    const [iframeLink, setIframeLink] = useState('');

    const handleInputChange = (event) => {
        setIframeLink(event.target.value);
    };

    return (
        <div className="grandPrix-form-container">
            <h1>Grand Prix</h1>
            <div className="form-group">
                <label htmlFor="iframeLink">Enter Iframe Link:</label>
                <input 
                    type="text" 
                    id="iframeLink" 
                    value={iframeLink} 
                    onChange={handleInputChange} 
                    placeholder="Enter iframe link here" 
                />
            </div>
            {iframeLink && (
                <div className="iframe-container">
                    <iframe 
                        className="grandPrix-iframe" 
                        src={iframeLink} 
                        title="Grand Prix Standings" 
                        frameBorder="0" 
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
}

export default GrandPrixForm;
