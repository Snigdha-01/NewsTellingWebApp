

import axios from 'axios';

const API_KEY = 'e3ece87ca92a4962a2d10f3523f38d96';

const NewsService = {
  async getTopHeadlines(category = 'business', country = 'us', page = 1) {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&apiKey=${API_KEY}`
      );
      return response.data.articles;
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      return [];
    }
  },
  
  async searchArticles(query, page = 1) {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&page=${page}&apiKey=${API_KEY}`
      );
      return response.data.articles;
    } catch (error) {
      console.error('Error searching articles:', error);
      return [];
    }
  }
};

export default NewsService;
