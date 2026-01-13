import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Mail, Send } from 'lucide-react';
import Swal from 'sweetalert2';

const NewsletterSection = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    
    // Simulate newsletter signup
    setTimeout(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Thank you for subscribing to our newsletter!',
        icon: 'success',
        confirmButtonColor: '#10b981'
      });
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <section 
      className="py-20 transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? '#1f2937' : '#f8fafc'
      }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-lg mb-6"
            style={{ 
              backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
              color: '#10b981'
            }}
          >
            <Mail size={32} />
          </div>
          
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}
          >
            Stay Updated
          </h2>
          
          <p 
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{ color: theme === 'dark' ? '#d1d5db' : '#64748b' }}
          >
            Subscribe to our newsletter and be the first to know about new chefs, 
            special offers, and delicious meal updates in your area.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                style={{
                  backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                  borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                  color: theme === 'dark' ? '#f9fafb' : '#1f2937'
                }}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50"
                style={{
                  backgroundColor: '#10b981',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </form>

          <p 
            className="text-sm mt-4"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#94a3b8' }}
          >
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;