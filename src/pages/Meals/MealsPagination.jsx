import React from 'react';

const MealsPagination = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  // Always show 4 pages (or however many you want)
  const maxButtons = 4;
  const pages = Array.from({ length: maxButtons }, (_, i) => i + 1);

  return (
    <div className="flex gap-2 justify-center mt-6">
      {pages.map((num) => (
        <button
          key={num}
          onClick={() => setCurrentPage(num)}
          className={`px-3 py-1 rounded ${
            currentPage === num ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default MealsPagination;
