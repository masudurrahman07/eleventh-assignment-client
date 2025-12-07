// src/components/Loading.jsx
import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="w-16 h-16 border-4 border-green-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
