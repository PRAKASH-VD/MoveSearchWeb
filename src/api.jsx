// src/api.js
import axios from 'axios';


const API_URL = 'https://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
// const fetchMovies = async (searchQuery) => {
//   try {
//     const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${searchQuery}`);
//     const data = await response.json();
//     if (data.Response === "False") {
//       throw new Error(data.Error);
//     }
//     console.log("Fetched data:", data);
//   } catch (error) {
//     console.error("Fetch error:", error);
//   }
// };



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
