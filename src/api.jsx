// src/api.js
import axios from 'axios';

const API_URL = 'http://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const searchMovies = async (query, page = 1, type = '') => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        s: query,
        page,
        type,
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching search results');
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        i: id,
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching movie details');
  }
};
