import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Search, ShoppingCart, Truck } from 'lucide-react';

const HowItWorksSection = () => {
  const { theme } = useTheme();

  const steps = [
    {
      icon: <Search size={40} />,
      title: 'Browse & Discover',
      description: 'Explore meals from talented local chefs in your area',
      step: '01'
    },
    {
      icon: <ShoppingCart size={40} />,
      title: 'Order & Pay',
      description: 'Select your favorite meals and place your order securely',
      step: '02'
    },
    {
      icon: <Truck size={40} />,
      title: 'Enjoy Fresh Food',
      description: 'Get your freshly prepared meals delivered to your doorstep',
      step: '03'
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
            How It Works
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: theme === 'dark' ? '#d1d5db' : '#64748b' }}
          >
            Getting delicious homemade food is easier than ever
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center relative"
            >
              {/* Step Number */}
              <div 
                className="absolute -top-4 -right-4 w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold"
                style={{ 
                  backgroundColor: '#10b981',
                  color: '#ffffff'
                }}
              >
                {step.step}
              </div>

              {/* Icon */}
              <div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-lg mb-6"
                style={{ 
                  backgroundColor: theme === 'dark' ? '#374151' : '#f8fafc',
                  color: '#10b981'
                }}
              >
                {step.icon}
              </div>

              {/* Content */}
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}
              >
                {step.title}
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ color: theme === 'dark' ? '#d1d5db' : '#64748b' }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;