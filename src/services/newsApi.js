import axios from 'axios';

const apiKey = 'e3ece87ca92a4962a2d10f3523f38d96';
// Here we are mentioning the api and the api key that we are using ( this is a public news api)
const instance = axios.create({
  baseURL: 'https://newsapi.org/v2/',
});

export const fetchArticles = async (category, page = 1) => {
  try {
    const response = await instance.get('top-headlines', {
      params: {
        country: 'us',
        category,
        apiKey,
        page,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};
