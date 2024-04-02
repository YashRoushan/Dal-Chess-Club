import React, { useState, useEffect } from 'react';
import '../styles/news.css';

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
    fetch("http://localhost:5000/api/news/getAllNews")
      .then(res => res.json())
      .then(data => setNewsArticles(data))
      .catch(err => console.error("Error fetching news:", err));
  }, []);

  return (
    <div className="news-page">
      <h1 className="news-header">News</h1>
      <div className="news-container">
        {newsArticles.map((article, index) => (
          <NewsArticle key={index} {...article} />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
