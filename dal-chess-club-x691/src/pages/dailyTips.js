import React, { useState, useEffect } from 'react';
import '../styles/dailyTips.css'; // Use dailyTips.css for styling
import { BASE_URL } from '../config.js';

const Tip = ({ title, type, description, image_link }) => {
    const imageUrl = image_link ? `${BASE_URL}${image_link}` : '';

    let typeIntro = '';
    if (type.toLowerCase() === 'opening') {
        typeIntro = "Mastering the art of the opening is a vital first step towards chess mastery. A strong opening sets the tone for the entire game, helping you establish control, develop your pieces effectively, and ensure the safety of your king.";
    } else if (type.toLowerCase() === 'middle game') {
        typeIntro = "Transitioning to the middle game, the real strategic battle unfolds. It's not just about moving pieces; it's about launching a well-coordinated attack while maintaining a solid defense.";
    } else if (type.toLowerCase() === 'endgame') {
        typeIntro = "The endgame is where chess matches are won or lost. It's a high-stakes phase where every move can make the difference between a resounding victory or a bitter defeat.";
    }

    return (
        <div className="tip-article">
            <h2>{title}</h2>
            <p className="type">{type} - {typeIntro}</p>
            <p>{description}</p>
            {imageUrl && <img src={imageUrl} alt={title} />}
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
            <div className="tips-container">
                {openingTip && <Tip {...openingTip} />}
                {middleGameTip && <Tip {...middleGameTip} />}
                {endgameTip && <Tip {...endgameTip} />}
            </div>
        </div>
    );
}

export default DailyTips;




