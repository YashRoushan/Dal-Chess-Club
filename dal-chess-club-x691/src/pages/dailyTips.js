import React, { useState, useEffect } from 'react';
import '../styles/dailyTips.css'; // Use dailyTips.css for styling
import { BASE_URL } from '../config.js';

const Tip = ({ title, type, typeIntro, description, image_link }) => {
    const imageUrl = image_link ? `${BASE_URL}${image_link}` : '';

    return (
        <div className="tip-article">
            <div className="type-info">
                <p className="type"><strong>{type}</strong> - {typeIntro}</p>
            </div>
            <h2>{title}</h2>
            <div className="tip-content">
                <p>{description}</p>
                {imageUrl && <img className="tip-image" src={imageUrl} alt={title} />}
            </div>
        </div>
    );
};

function DailyTips() {
    const [openingTip, setOpeningTip] = useState(null);
    const [middleGameTip, setMiddleGameTip] = useState(null);
    const [endgameTip, setEndgameTip] = useState(null);

    const fetchTips = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/tips`);
            const data = await response.json();
            const openingTips = data.filter(tip => tip.type.toLowerCase() === 'opening');
            const middleGameTips = data.filter(tip => tip.type.toLowerCase() === 'middle game');
            const endgameTips = data.filter(tip => tip.type.toLowerCase() === 'endgame');

            if (openingTips.length > 0) setOpeningTip(openingTips[Math.floor(Math.random() * openingTips.length)]);
            if (middleGameTips.length > 0) setMiddleGameTip(middleGameTips[Math.floor(Math.random() * middleGameTips.length)]);
            if (endgameTips.length > 0) setEndgameTip(endgameTips[Math.floor(Math.random() * endgameTips.length)]);
        } catch (error) {
            console.error('Error fetching tips:', error);
        }
    };

    useEffect(() => {
        fetchTips();
    }, []);

    return (
        <div className="daily-tips-page">
            <h1 className="daily-tips-header">Daily Chess Tips</h1>
            <p className="daily-tips-intro">Welcome to the Daily Chess Tips page! Here, you'll find valuable tips to improve your chess game.</p>
            <p className="daily-tips-intro">Every time you visit, you'll receive a new tip for the opening, middle game, and endgame. Refresh the page to discover new strategies and enhance your skills.</p>
            <div className="tips-container">
                {openingTip && <Tip {...openingTip} typeIntro="Mastering the art of the opening is a vital first step towards chess mastery. A strong opening sets the tone for the entire game, helping you establish control, develop your pieces effectively, and ensure the safety of your king." />}
                {middleGameTip && <Tip {...middleGameTip} typeIntro="Transitioning to the middle game, the real strategic battle unfolds. It's not just about moving pieces; it's about launching a well-coordinated attack while maintaining a solid defense." />}
                {endgameTip && <Tip {...endgameTip} typeIntro="The endgame is where chess matches are won or lost. It's a high-stakes phase where every move can make the difference between a resounding victory or a bitter defeat." />}
            </div>
        </div>
    );
}

export default DailyTips;




