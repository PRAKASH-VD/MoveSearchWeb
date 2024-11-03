// src/pages/SearchPage.js
import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { searchMovies } from '../api';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchMovies(query, page, type, year);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10));
        setError('');
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error);
      }
    } catch (error) {
      setError('An error occurred while fetching data');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (query) handleSearch();
  }, [page, type, year]);

  return (
    <div className="container mx-auto mt-6">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="border dark:border-gray-600 p-2 rounded-lg w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        />
        <select
          onChange={(e) => setType(e.target.value)}
          value={type}
          className="border dark:border-gray-600 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        >
          <option value="">All</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
        </select>
        <select
          onChange={(e) => setYear(e.target.value)}
          value={year}
          className="border dark:border-gray-600 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        >
          <option value="">Year</option>
          {Array.from({ length: 20 }, (_, i) => {
            const currentYear = new Date().getFullYear();
            return <option key={i} value={currentYear - i}>{currentYear - i}</option>;
          })}
        </select>
        <button onClick={handleSearch} className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
      {/* <Pagination currentPage={page} setPage={setPage} hasNextPage={page * 10 < totalResults} />
      // src/pages/SearchPage.js
//... previous code */}

      <Pagination currentPage={page} setPage={setPage} hasNextPage={page * 10 < totalResults} />


    </div>
  );
}

export default SearchPage;
