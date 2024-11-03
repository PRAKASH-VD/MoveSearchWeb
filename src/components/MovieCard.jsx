// src/components/MovieCard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some((fav) => fav.imdbID === movie.imdbID));
  }, [movie.imdbID]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-md overflow-hidden transform transition hover:scale-105"
      whileHover={{ scale: 1.05 }}
    >
      <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{movie.Title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{movie.Year}</p>
        <div className="flex justify-between items-center mt-2">
          <Link to={`/movie/${movie.imdbID}`} className="text-blue-500 dark:text-blue-400">View Details</Link>
          <button onClick={toggleFavorite} className="text-red-500 dark:text-red-400">
            {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default MovieCard;
