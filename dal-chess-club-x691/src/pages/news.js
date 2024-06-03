import React, { useState, useEffect } from 'react';
import '../styles/news.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// Import BASE_URL and getImageUrl from config.js
import { BASE_URL} from '../config.js';

const NewsArticle = ({ title, date, text, imageUrl }) => (
    <div className="news-article">
        <h2>{title}</h2>
        <p className="date">{date}</p>
        <p>{text}</p>
        {imageUrl && <img src={imageUrl} alt={title} />}
    </div>
);

const NewsPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);

    useEffect(() => {
        // Fetch news articles from API
        fetch(`${BASE_URL}/api/news/getAllNews`)
            .then(res => res.json())
            .then(data => setNewsArticles(data))
            .catch(err => console.error("Error fetching news:", err));
    }, []);


    return (
        <div className="news-page">
            <h1 className="news-header">News</h1>
            <div className='input-wrapper'>
                <FontAwesomeIcon icon={faSearch} id="search-icon"/>
                <input placeholder='Type to search...'/>
            </div>
            <div className="news-container">
                {newsArticles.map((article, index) => (
                    <NewsArticle key={index} {...article} />
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
