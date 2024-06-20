
import React, { useState, useEffect } from 'react';
import NewsService from '../services/NewsService';
import './HomePage.css'; // Import CSS file for styles

const HomePage = ({ 
  articles, 
  loading, 
  onArticleClick, 
  currentPage, 
  setCurrentPage, 
  setArticles, 
  setLoading, 
  onAddToFavorites, 
  favorites,
  onRemoveFromFavorites 
}) => {
  const [categories] = useState([
    { value: 'business', label: 'Business' },
    { value: 'technology', label: 'Technology' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'sports', label: 'Sports' },
    { value: 'health', label: 'Health' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState('business');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [hoveredArticle, setHoveredArticle] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, [currentPage, selectedCategory, showFavorites]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      let fetchedArticles;
      if (showFavorites) {
        fetchedArticles = favorites;
      } else {
        if (searchQuery) {
          fetchedArticles = await NewsService.searchArticles(searchQuery, currentPage);
        } else {
          fetchedArticles = await NewsService.getTopHeadlines(selectedCategory, 'us', currentPage);
        }
      }
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page
    fetchArticles();
  };

  const toggleFavoritesView = () => {
    setShowFavorites(!showFavorites);
  };

  const handleAddToFavorites = (article) => {
    onAddToFavorites(article);
  };

  const handleRemoveFromFavorites = (article) => {
    onRemoveFromFavorites(article);
  };

  const handleMouseEnter = (article) => {
    setHoveredArticle(article);
  };

  const handleMouseLeave = () => {
    setHoveredArticle(null);
  };

  return (
    <div className="container my-4">

      <form className="search-bar mb-4" onSubmit={handleSearchSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for articles..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>

      <div className="App">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="text-center me-2">
          <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <button className="btn btn-outline-secondary" onClick={toggleFavoritesView}>
            {showFavorites ? 'Show All Articles' : 'Show Favorites'} ❤️
          </button>
        </div>
      </div>
    </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {articles.map((article, index) => (
            <div key={index} className="col">
              <div className="card h-100">
                <img src={article.urlToImage} className="card-img-top" alt={article.title} />
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description}</p>
                  <button className="btn btn-primary" onClick={() => onArticleClick(article)}>
                    View Article
                  </button>
                  <button
                    className="btn btn-outline-light ms-2"
                    onClick={() =>
                      favorites.some((fav) => fav.url === article.url)
                        ? handleRemoveFromFavorites(article)
                        : handleAddToFavorites(article)
                    }
                    onMouseEnter={() => handleMouseEnter(article)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {favorites.some((fav) => fav.url === article.url) ? '🩶' : '❤️'}
                    {hoveredArticle && hoveredArticle.url === article.url && (
                      <span className="ms-1">
                        {favorites.some((fav) => fav.url === article.url)
                          ? 'Remove from favorites'
                          : 'Add to favorites'}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!showFavorites && (
        <nav className="mt-4" aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default HomePage;
