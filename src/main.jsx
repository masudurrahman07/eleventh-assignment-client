
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './auth/AuthProvider';
import { ThemeProvider } from './contexts/ThemeContext';
import Lenis from 'lenis';
import './index.css'; 

// Initialize Lenis smooth scrolling
const initLenis = () => {
  const lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 0.8,
    smoothTouch: false,
    touchMultiplier: 1.5,
    infinite: false,
    syncTouch: false,
    syncTouchLerp: 0.1,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  
  return lenis;
};


const AppWrapper = () => {
  useEffect(() => {
    const lenis = initLenis();
    
    return () => {
      lenis.destroy();
    };
  }, []);

  return <App />;
}; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppWrapper />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
