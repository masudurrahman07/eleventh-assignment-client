import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Star, Award } from 'lucide-react';

const FeaturedChefsSection = () => {
  const { theme } = useTheme();

  const chefs = [
    {
      name: 'Maria Rodriguez',
      specialty: 'Italian Cuisine',
      rating: 4.9,
      experience: '8 years',
      image: 'https://i.ibb.co/9yKKpQs/chef1.jpg',
      dishes: 45
    },
    {
      name: 'James Chen',
      specialty: 'Asian Fusion',
      rating: 4.8,
      experience: '6 years',
      image: 'https://i.ibb.co/7XzQzKs/chef2.jpg',
      dishes: 38
    },
    {
      name: 'Sarah Johnson',
      specialty: 'Healthy Bowls',
      rating: 4.9,
      experience: '5 years',
      image: 'https://i.ibb.co/qNzQzKs/chef3.jpg',
      dishes: 32
    }
  ];

  return (
    <section 
      className="py-20 transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? '#1f2937' : '#f8fafc'
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}
          >
            Featured Chefs
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: theme === 'dark' ? '#d1d5db' : '#64748b' }}
          >
            Meet our talented chefs who bring passion and expertise to every dish
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {chefs.map((chef, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                backgroundColor: theme === 'dark' ? '#374151' : '#ffffff'
              }}
            >
              {/* Chef Image */}
              <div className="relative mb-6">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-24 h-24 rounded-lg mx-auto object-cover"
                />
                <div 
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#10b981' }}
                >
                  <Award size={16} className="text-white" />
                </div>
              </div>

              {/* Chef Info */}
              <h3 
                className="text-xl font-bold mb-2"
                style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}
              >
                {chef.name}
              </h3>
              
              <p 
                className="text-sm font-medium mb-4"
                style={{ color: '#10b981' }}
              >
                {chef.specialty}
              </p>

              {/* Stats */}
              <div className="flex justify-center items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500 fill-current" />
                  <span 
                    className="text-sm font-medium"
                    style={{ color: theme === 'dark' ? '#d1d5db' : '#64748b' }}
                  >
                    {chef.rating}
                  </span>
                </div>
                <div 
                  className="text-sm"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#94a3b8' }}
                >
                  •
                </div>
                <div 
                  className="text-sm"
                  style={{ color: theme === 'dark' ? '#d1d5db' : '#64748b' }}
                >
                  {chef.dishes} dishes
                </div>
              </div>

              <p 
                className="text-sm"
                style={{ color: theme === 'dark' ? '#9ca3af' : '#94a3b8' }}
              >
                {chef.experience} experience
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedChefsSection;