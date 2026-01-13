import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Heart, Users, Leaf, Clock } from 'lucide-react';

const AboutSection = () => {
  const { theme } = useTheme();

  const values = [
    {
      icon: <Heart size={24} />,
      title: 'Made with Love',
      description: 'Every dish is prepared with passion and care by our local chefs'
    },
    {
      icon: <Users size={24} />,
      title: 'Community First',
      description: 'Supporting local chefs and bringing communities together through food'
    },
    {
      icon: <Leaf size={24} />,
      title: 'Fresh & Healthy',
      description: 'Using fresh, locally sourced ingredients for nutritious meals'
    },
    {
      icon: <Clock size={24} />,
      title: 'Always Fresh',
      description: 'Meals prepared daily and delivered at peak freshness'
    }
  ];

  return (
    <section 
      className="py-20 transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#ffffff'
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}
            >
              About LocalChefBazaar
            </h2>
            <p 
              className="text-lg leading-relaxed mb-8"
              style={{ color: theme === 'dark' ? '#d1d5db' : '#64748b' }}
            >
              We believe that great food brings people together. LocalChefBazaar was created to connect 
              talented home chefs with food lovers in their community, creating a platform where passion 
              meets convenience.
            </p>
            <p 
              className="text-base leading-relaxed mb-8"
              style={{ color: theme === 'dark' ? '#9ca3af' : '#94a3b8' }}
            >
              Our mission is to support local culinary talent while providing customers with access to 
              authentic, homemade meals that you simply can't find anywhere else. Every chef on our 
              platform is carefully vetted to ensure quality and food safety standards.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ 
                      backgroundColor: theme === 'dark' ? '#374151' : '#f8fafc',
                      color: '#10b981'
                    }}
                  >
                    {value.icon}
                  </div>
                  <div>
                    <h3 
                      className="font-semibold mb-1"
                      style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}
                    >
                      {value.title}
                    </h3>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
                    >
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://i.ibb.co/XxM8YNPt/freepik-assistant-1765001038409.png"
                alt="About LocalChefBazaar"
                className="w-full h-96 object-cover"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
              />
            </div>
            
            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 p-6 rounded-lg shadow-xl"
              style={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff'
              }}
            >
              <div className="text-center">
                <div 
                  className="text-2xl font-bold"
                  style={{ color: '#10b981' }}
                >
                  2019
                </div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: theme === 'dark' ? '#d1d5db' : '#64748b' }}
                >
                  Founded
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;