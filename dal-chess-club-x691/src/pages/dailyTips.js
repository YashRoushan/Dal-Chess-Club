import React, { useState, useEffect } from 'react';
import '../styles/dailyTips.css';
import { BASE_URL } from '../config.js';

const Tip = ({ title, description, image_link }) => {
    const imageUrl = image_link ? `${BASE_URL}${image_link}` : '';

    return (
        <div className="tip-content">
            <div className="tip-text">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            {imageUrl && <img src={imageUrl} alt={title} className="tip-image" />}
        </div>
    );
};

const TipSlider = ({ tips, type, typeIntro }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTip = () => {
        setCurrentIndex((currentIndex + 1) % tips.length);
    };

    const prevTip = () => {
        setCurrentIndex((currentIndex - 1 + tips.length) % tips.length);
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="tip-container">
            <div className="type-intro-box">
                <p><strong>{type}:</strong> {typeIntro}</p>
            </div>
            <div className="tip-slider-container">
                <button onClick={prevTip} className="slide-btn prev-btn">{"<"}</button>
                <div className="tip-content-wrapper">
                    {tips.length > 0 && <Tip {...tips[currentIndex]} />}
                </div>
                <button onClick={nextTip} className="slide-btn next-btn">{">"}</button>
            </div>
            <div className="dot-container">
                {tips.map((_, index) => (
                    <span key={index} 
                          onClick={() => handleDotClick(index)}
                          className={`dot ${index === currentIndex ? 'active' : ''}`}></span>
                ))}
            </div>
        </div>
    );
};

function DailyTips() {
    const [openingTips, setOpeningTips] = useState([]);
    const [middleGameTips, setMiddleGameTips] = useState([]);
    const [endgameTips, setEndgameTips] = useState([]);

    const fetchTips = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/tips`);
            const data = await response.json();
            setOpeningTips(data.filter(tip => tip.type.toLowerCase() === 'opening'));
            setMiddleGameTips(data.filter(tip => tip.type.toLowerCase() === 'middle game'));
            setEndgameTips(data.filter(tip => tip.type.toLowerCase() === 'endgame'));
        } catch (error) {
            console.error('Error fetching tips:', error);
        }
    };

    useEffect(() => {
        fetchTips();
    }, []);

    return (
        <div className="daily-tips-page">
            <h1 className="daily-tips-header">Chess Tips</h1>
            <p className="daily-tips-intro">Welcome to the Daily Chess Tips page! Here, you'll find valuable tips to improve your chess game.</p>
            <p className="daily-tips-intro">Use the sliders below to browse through tips for the opening, middle game, and endgame. Discover new strategies and enhance your skills.</p>
            <div className="tips-container">
                {openingTips.length > 0 && (
                    <TipSlider 
                        tips={openingTips}
                        type="Opening"
                        typeIntro="Mastering the art of the opening is a vital first step towards chess mastery. A strong opening sets the tone for the entire game, helping you establish control, develop your pieces effectively, and ensure the safety of your king."
                    />
                )}
                {middleGameTips.length > 0 && (
                    <TipSlider 
                        tips={middleGameTips}
                        type="Middle Game"
                        typeIntro="Transitioning to the middle game, the real strategic battle unfolds. It's not just about moving pieces; it's about launching a well-coordinated attack while maintaining a solid defense."
                    />
                )}
                {endgameTips.length > 0 && (
                    <TipSlider 
                        tips={endgameTips}
                        type="Endgame"
                        typeIntro="The endgame is where chess matches are won or lost. It's a high-stakes phase where every move can make the difference between a resounding victory or a bitter defeat."
                    />
                )}
            </div>
        </div>
    );
}

export default DailyTips;



