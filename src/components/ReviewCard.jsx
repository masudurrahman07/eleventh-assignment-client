
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const ReviewCard = ({ review, onDelete, onUpdate }) => {
  const { theme } = useTheme();
  
  const formattedDate = new Date(review.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div 
      className="rounded-xl p-5 shadow-lg flex flex-col h-full transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff'
      }}>
      <div className="flex items-center gap-4 mb-3">
        <img
          src={review.reviewerImage || 'https://i.ibb.co/0s3pdnc/default-user.png'}
          alt=""
          className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400"/>

        <div className="flex-1">
          <h4 
            className="font-semibold"
            style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}>
            {review.reviewerName || review.name}
          </h4>
          <div className="flex items-center text-yellow-400 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
        </div>
      </div>

      <h5 
        className="font-semibold mb-2"
        style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
        {review.mealName}
      </h5>
      
      <p 
        className="flex-1"
        style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }}>
        {review.comment}
      </p>
      
      <p 
        className="text-sm mt-2"
        style={{ color: theme === 'dark' ? '#6b7280' : '#9ca3af' }}>
        {formattedDate}
      </p>

      {(onUpdate || onDelete) && (
        <div className="mt-3 flex gap-2">
          {onUpdate && (
            <button
              onClick={onUpdate}
              className="px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors">
              Update
            </button>
          )}

          {onDelete && (
            <button
              onClick={onDelete}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
              Delete
              </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
