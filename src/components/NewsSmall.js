import React from 'react';

// basically this is design in which we'll show our news in the form of card 
const NewsSmall = ({ article }) => {
  return (
    <div className="card">
      <img src={article.urlToImage} className="card-img-top" alt={article.title} />
      <div className="card-body">
        <h5 className="card-title">{article.title}</h5>
        <p className="card-text">{article.description}</p>
        <a href={article.url} className="btn btn-primary stretched-link">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsSmall;
