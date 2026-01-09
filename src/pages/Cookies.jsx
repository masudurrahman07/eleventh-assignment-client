import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

const Cookies = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-linear-to-br from-gray-900 via-[#1a1c2e] to-[#2d1b4e] backdrop-blur-md">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative" >
        
          <div className="w-[320px] h-80 md:w-[400px] md:h-[400px] rounded-full bg-linear-to-br from-[#36e2c3] via-[#2bc9ad] to-[#1eb89a] shadow-[0_0_50px_rgba(54,226,195,0.3)] flex flex-col items-center justify-center text-center p-8 border-4 border-white/20">
            
           
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 md:top-10 md:right-10 bg-[#1a1c2e]/20 hover:bg-[#1a1c2e]/40 p-2 rounded-full transition-colors group">
              <X size={20} className="text-white group-hover:rotate-90 transition-transform" />
            </button>

      
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-sm">Cookie Policy</h2>
              
              <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed max-w-[250px] mx-auto">
                This website uses cookies to ensure you get the best experience on our website.</p>

              <button className="text-white font-bold underline underline-offset-4 hover:text-[#1a1c2e] transition-colors">
                Read more</button>

              <div className="pt-4">
                <h3 className="text-xl md:text-2xl font-extrabold text-white mb-6">
                  Happy To Accept?</h3>
                
           
                <div className="flex items-center justify-center gap-6">
    
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsVisible(false)}
                    className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg group">
                    <Check size={28} className="text-[#2bc9ad] group-hover:scale-110 transition-transform" strokeWidth={4} />
                  </motion.button>

                
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsVisible(false)}
                    className="w-12 h-12 md:w-16 md:h-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group">
                    <X size={28} className="text-white group-hover:scale-110 transition-transform" strokeWidth={4} />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Cookies;