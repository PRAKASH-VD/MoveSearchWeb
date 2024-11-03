// src/components/Pagination.js
import React from 'react';

// src/components/Pagination.js
const Pagination = ({ currentPage, setPage, hasNextPage, totalResults }) => {
  const handlePrevious = () => {
    if (currentPage > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };

  const handleFirst = () => {
    setPage(1);
  };

  const handleLast = () => {
    const totalPages = Math.ceil(totalResults / 10);
    setPage(totalPages);
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={handleFirst}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white transition`}
      >
        First
      </button>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white transition`}
      >
        Previous
      </button>
      <span className="text-lg">
        Page {currentPage}
      </span>
      <button
        onClick={handleNext}
        disabled={!hasNextPage}
        className={`px-4 py-2 rounded-lg ${!hasNextPage ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white transition`}
      >
        Next
      </button>
      <button
        onClick={handleLast}
        disabled={!hasNextPage}
        className={`px-4 py-2 rounded-lg ${!hasNextPage ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white transition`}
      >
        Last
      </button>
    </div>
  );
};
export default Pagination;
