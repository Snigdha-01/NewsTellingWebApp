import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import DetailedNews from './components/DetailedNews';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleBackClick = () => {
    setSelectedArticle(null);
  };

  const handleAddToFavorites = (article) => {
    let updatedFavorites;
    if (favorites.some(fav => fav.url === article.url)) {
      updatedFavorites = favorites.filter(fav => fav.url !== article.url);
    } else {
      updatedFavorites = [...favorites, article];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="App">
      <header>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* End Navbar */}

        {/* Hero Section */}
        <section
          className="py-5 text-center text-white"
          style={{
            backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-8 mx-auto">
                <h1 className="display-4 mb-3">News App</h1>
                <p className="lead mb-4">Stay Updated with the Latest News</p>
                <div className="social-icons mb-4">
                  <a href="#" className="text-white me-3">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#" className="text-white me-3">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="#" className="text-white">
                    <i className="fa fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Hero Section */}
      </header>

      <main className="container my-4">
        {selectedArticle ? (
          <  DetailedNews article={selectedArticle} onBackClick={handleBackClick} />
        ) : (
          <HomePage
            articles={articles}
            loading={loading}
            onArticleClick={handleArticleClick}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setArticles={setArticles}
            setLoading={setLoading}
            onAddToFavorites={handleAddToFavorites}
            favorites={favorites}
            onRemoveFromFavorites={handleAddToFavorites} // This will handle both add and remove from favorites
          />
        )}
      </main>

      <footer className="page-footer bg-dark text-white">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center py-4">
            <div className="col text-center">
              <small>&copy; Persist Venture, 2017. All rights reserved.</small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

