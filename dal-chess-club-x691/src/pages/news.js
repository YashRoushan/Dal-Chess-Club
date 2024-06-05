import React, { useState, useEffect } from 'react';
import '../styles/news.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
    const [input, setInput] = useState("");
    const [dateFilter, setDateFilter] = useState('');

    const fetchData = () => {
        fetch(`${BASE_URL}/api/news/getAllNews`)
            .then((response) => response.json())
            .then((json) => {
                const filteredResults = json.filter(article => {
                    const matchesTitle = article.title.toLowerCase().includes(input.toLowerCase());
                    const matchesDate = dateFilter ? new Date(article.date) <= new Date(dateFilter) : true;
                    return matchesTitle && matchesDate;
                });
                setNewsArticles(filteredResults);
            });
    };

    useEffect(() => {
        fetchData();
    }, [input, dateFilter]);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleDateFilterChange = (event) => {
        setDateFilter(event.target.value);
    };

    return (
        <div className="news-page">
            <h1 className="news-header">News</h1>
            <div className="filters-container">
                <div className='input-wrapper'>
                    <FontAwesomeIcon icon={faSearch} id="search-icon"/>
                    <input
                        placeholder='Type to search...'
                        value={input}
                        onChange={handleInputChange}
                    />
                </div>
                <input
                    className='filter'
                    type="date"
                    value={dateFilter}
                    onChange={handleDateFilterChange}
                />
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
