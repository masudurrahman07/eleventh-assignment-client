import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const MealsPagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const { theme } = useTheme();
  
  if (totalPages <= 1) return null;

  
  const maxButtons = 4;
  const pages = Array.from({ length: maxButtons }, (_, i) => i + 1);

  return (
    <div className="flex gap-2 justify-center mt-6">

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => setCurrentPage(num)}
          className="px-3 py-1 rounded transition-colors duration-200"
          style={{
            backgroundColor: currentPage === num 
              ? '#3b82f6' 
              : theme === 'dark' ? '#374151' : '#e5e7eb',
            color: currentPage === num 
              ? '#ffffff' 
              : theme === 'dark' ? '#f9fafb' : '#1f2937'
          }}
          onMouseEnter={(e) => {
            if (currentPage !== num) {
              e.target.style.backgroundColor = theme === 'dark' ? '#4b5563' : '#d1d5db';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== num) {
              e.target.style.backgroundColor = theme === 'dark' ? '#374151' : '#e5e7eb';
            }
          }}>
          {num}
        </button>
      ))}
      
    </div>
  );
};

export default MealsPagination;
