// src/components/ReviewCard.jsx
import React from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewCard = ({ review, onDelete, onUpdate }) => {
  const formattedDate = new Date(review.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-3">
        <img
          src={review.reviewerImage || 'https://i.ibb.co/0s3pdnc/default-user.png'}
          alt={review.reviewerName}
          className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800">{review.reviewerName || review.name}</h4>
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

      <h5 className="font-semibold text-gray-700 mb-2">{review.mealName}</h5>
      <p className="text-gray-600 flex-1">{review.comment}</p>
      <p className="text-gray-400 text-sm mt-2">{formattedDate}</p>

      {/* Buttons */}
      <div className="mt-3 flex gap-2">
        <button
          onClick={onUpdate}
          className="px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600"
        >
          Update
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
