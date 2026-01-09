
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Banner = () => {
  const images = [
    "https://i.ibb.co/XxM8YNPt/freepik-assistant-1765001038409.png",
    "https://i.ibb.co.com/sdWc7zpn/freepik-assistant-1765001507847.png",
    "https://i.ibb.co/ZRtX588c/freepik-talk-9718.png",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center rounded-b-lg text-center overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}>
   
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Banner ${index + 1}`}
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: current === index ? 1 : 0,
              scale: current === index ? 1 : 1.05
            }}
            transition={{ 
              duration: 1.2, 
              ease: "easeInOut"
            }}
            style={{ zIndex: current === index ? 10 : 5 }}/>
        ))}
      </div>

  
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/50 z-20"></div>

 
      <motion.div
        className="relative z-30 flex flex-col items-center justify-center px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-white/90 to-gray-200 bg-clip-text text-transparent drop-shadow-lg mb-2">
          Welcome to LocalChefBazaar
        </h1>

        <p className="text-base md:text-lg lg:text-xl bg-linear-to-r from-white/90 to-gray-200 bg-clip-text text-transparent drop-shadow-md max-w-2xl mb-4">
          Fresh, homemade meals from local chefs delivered to your doorstep.
        </p>

        <a
          href="/meals"
          className="px-5 py-2 rounded-lg font-semibold text-white bg-linear-to-r from-emerald-400 to-teal-500 shadow hover:from-teal-400 hover:to-emerald-500 transition-all duration-300 text-sm">
          Explore Meals
        </a>
      </motion.div>

   
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index 
                ? 'bg-white shadow-lg' 
                : 'bg-white/50 hover:bg-white/70'
            }`}/>
        ))}
      </div>
    </motion.section>
  );
};

export default Banner;
