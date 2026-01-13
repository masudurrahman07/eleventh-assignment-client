import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const { theme } = useTheme();

  const testimonials = [
    {
      name: 'Emily Davis',
      role: 'Food Enthusiast',
      image: 'https://i.ibb.co/9yKKpQs/user1.jpg',
      rating: 5,
      text: 'The quality of food from LocalChefBazaar is outstanding. Every meal feels like it was made with love and care.'
    },
    {
      name: 'Michael Brown',
      role: 'Busy Professional',
      image: 'https://i.ibb.co/7XzQzKs/user2.jpg',
      rating: 5,
      text: 'As someone with a hectic schedule, LocalChefBazaar has been a lifesaver. Fresh, healthy meals delivered right to my door.'
    },
    {
      name: 'Lisa Wilson',
      role: 'Health Conscious',
      image: 'https://i.ibb.co/qNzQzKs/user3.jpg',
      rating: 5,
      text: 'I love supporting local chefs while getting amazing, nutritious meals. The variety and quality are unmatched.'
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
            What Our Customers Say
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: theme === 'dark' ? '#d1d5db' : '#64748b' }}
          >
            Real stories from real customers who love our service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 relative"
              style={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff'
              }}
            >
              {/* Quote Icon */}
              <div 
                className="absolute -top-3 -left-3 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#10b981' }}
              >
                <Quote size={16} className="text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p 
                className="text-base leading-relaxed mb-6"
                style={{ color: theme === 'dark' ? '#d1d5db' : '#64748b' }}
              >
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 
                    className="font-semibold"
                    style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}
                  >
                    {testimonial.name}
                  </h4>
                  <p 
                    className="text-sm"
                    style={{ color: theme === 'dark' ? '#9ca3af' : '#94a3b8' }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;