import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const MealCardSkeleton = () => {
  const { theme } = useTheme();

  return (
    <div 
      className="rounded-xl shadow-lg border overflow-hidden animate-pulse"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
      }}>
     
      <div 
        className="w-full h-52"
        style={{backgroundColor: theme === 'dark' ? '#374151' : '#e5e7eb'}}></div>

      <div className="p-4 space-y-3">
       
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded"
            style={{backgroundColor: theme === 'dark' ? '#4b5563' : '#d1d5db'
            }}></div>
          <div 
            className="h-4 w-24 rounded"
            style={{backgroundColor: theme === 'dark' ? '#4b5563' : '#d1d5db'}}></div>
        </div>

        <div 
          className="h-6 w-20 rounded-full"
          style={{backgroundColor: theme === 'dark' ? '#4b5563' : '#d1d5db'}}></div>

       
        <div 
          className="h-4 w-32 rounded"
          style={{backgroundColor: theme === 'dark' ? '#4b5563' : '#d1d5db'}}></div>

    
        <div className="flex justify-between items-center">
          <div 
            className="h-6 w-16 rounded"
            style={{backgroundColor: theme === 'dark' ? '#4b5563' : '#d1d5db'
            }}></div>
          <div 
            className="h-4 w-12 rounded"
            style={{backgroundColor: theme === 'dark' ? '#4b5563' : '#d1d5db'}}></div>
        </div>

      
        <div 
          className="h-10 w-full rounded-lg mt-3"
          style={{backgroundColor: theme === 'dark' ? '#4b5563' : '#d1d5db'}}></div>
      </div>
    </div>
  );
};

export default MealCardSkeleton;