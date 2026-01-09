import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaStar } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const MealCard = ({ meal }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSeeDetails = () => {
    navigate(`/meals/${meal._id}`);
  };

  return (
    <div 
      className="rounded-xl shadow-lg border hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden backdrop-blur-lg"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        borderColor: theme === 'dark' ? '#374151' : '#14b8a6'
      }}>
      <div className="relative">
        <img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full h-52 object-cover"/>
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        <h2 className="absolute bottom-3 left-3 text-white text-xl font-bold drop-shadow-lg">
          {meal.foodName}
        </h2>
      </div>

      <div className="p-4 space-y-2">
        <div 
          className="flex items-center gap-2"
          style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
          <FaUserTie className="text-emerald-600" />
          <span className="font-semibold">{meal.chefName}</span>
        </div>

        <span className="inline-block px-3 py-1 text-xs bg-linear-to-r from-emerald-400 to-teal-500 text-white rounded-full shadow">
          ID: {meal.chefId}
        </span>

        <p 
          className="text-sm font-medium"
          style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }}>
          Delivery Area: <span className="text-emerald-600 font-semibold">All over Dhaka</span>
        </p>

        <div className="flex justify-between items-center mt-1">
          <p className="text-lg font-bold text-emerald-600">${meal.price}</p>
          <p className="flex items-center gap-1 text-yellow-500 font-medium">
            <FaStar /> {meal.rating}
          </p>
        </div>

        <button
          onClick={handleSeeDetails}
          className="mt-3 w-full px-4 py-2 rounded-lg font-semibold text-white bg-linear-to-r from-emerald-400 to-teal-500 hover:from-teal-400 hover:to-emerald-500 shadow-md hover:shadow-xl transition-all duration-300">
          See Details
        </button>
      </div>
    </div>
  );
};

export default MealCard;
