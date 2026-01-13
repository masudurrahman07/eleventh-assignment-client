import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Users, ChefHat, Star, Clock } from 'lucide-react';

const StatsSection = () => {
  const { theme } = useTheme();

  const stats = [
    {
      icon: <Users size={32} />,
      number: '10,000+',
      label: 'Happy Customers',
      color: '#10b981'
    },
    {
      icon: <ChefHat size={32} />,
      number: '500+',
      label: 'Local Chefs',
      color: '#10b981'
    },
    {
      icon: <Star size={32} />,
      number: '4.8',
      label: 'Average Rating',
      color: '#10b981'
    },
    {
      icon: <Clock size={32} />,
      number: '30min',
      label: 'Average Delivery',
      color: '#10b981'
    }
  ];

  return (
    <section 
      className="py-16 transition-colors duration-300"
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
          className="text-center mb-12"
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}
          >
            Trusted by Thousands
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: theme === 'dark' ? '#d1d5db' : '#64748b' }}
          >
            Join our growing community of food lovers and talented chefs
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-lg mb-4"
                style={{ backgroundColor: theme === 'dark' ? '#374151' : '#ffffff' }}
              >
                <div style={{ color: stat.color }}>
                  {stat.icon}
                </div>
              </div>
              <div 
                className="text-3xl font-bold mb-2"
                style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}
              >
                {stat.number}
              </div>
              <div 
                className="text-sm font-medium"
                style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;