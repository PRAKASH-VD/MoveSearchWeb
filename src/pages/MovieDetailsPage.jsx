// src/pages/MovieDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../api';
import { motion } from 'framer-motion';

function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
        setError('');
      } catch {
        setError('Error fetching movie details');
      }
    };
    fetchMovieDetails();
  }, [id]);

  return (
    <div className="container mx-auto mt-6">
      {error && <p className="text-red-500">{error}</p>}
      {movie && (
        <motion.div
          className="relative bg-gray-800 text-white rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10 p-6">
            <h1 className="text-3xl font-bold">{movie.Title}</h1>
            <p className="text-lg mt-2">{movie.Plot}</p>
            <p className="text-md mt-1">Release Year: {movie.Year}</p>
            <p className="text-md mt-1">Genre: {movie.Genre}</p>
            <p className="text-md mt-1">Director: {movie.Director}</p>
            <p className="text-md mt-1">Actors: {movie.Actors}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default MovieDetailsPage;
