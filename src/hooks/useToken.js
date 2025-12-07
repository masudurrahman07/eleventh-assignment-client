// src/hooks/useToken.js
import { useState, useEffect } from 'react';

const useToken = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('access-token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const saveToken = (newToken) => {
    localStorage.setItem('access-token', newToken);
    setToken(newToken);
  };

  return [token, saveToken];
};

export default useToken;
