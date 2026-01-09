
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/logo.jpg';

const Loading = () => {
  const { theme } = useTheme();

  return (
    <div 
      className="flex flex-col md:flex-row justify-center items-center min-h-screen px-4 transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb'}}>
      
      <img
        src={logo}
        alt=""
        className="w-20 h-20 md:w-24 md:h-24 rounded-full shadow-lg mb-4 md:mb-0 md:mr-4"
        style={{ animation: 'spin 2s linear infinite' }}/>

      
      <h1 className="text-3xl md:text-5xl font-extrabold bg-linear-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent animate-bounce-fade text-center md:text-left">
        LocalChefBazaar
      </h1>

  
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes bounce-fade {
            0%, 100% { transform: translateY(0); opacity: 0.85; }
            50% { transform: translateY(-6px); opacity: 1; }
          }

          .animate-bounce-fade {
            animation: bounce-fade 1.5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
