import React from 'react';

const DetailedNews = ({ article, onBackClick }) => {
  return (
    <div className="container">
        {/* this is the detailing page as mentioned (clicking on the news it should open in a detail news form ) also coming back to main page  */}
      <button className="btn btn-secondary mb-3" onClick={onBackClick}>
        Back to Home
      </button>
          {/* this is also the way of displaying full news article in card format for perfect view of images and content */}
      <div className="card">
        <img src={article.urlToImage} className="card-img-top" alt={article.title} />
        <div className="card-body">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.content}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary d-block mt-3"
          >
            Read Full Article
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailedNews;


