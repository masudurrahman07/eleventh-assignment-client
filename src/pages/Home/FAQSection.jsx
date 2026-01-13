import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How does LocalChefBazaar work?',
      answer: 'Simply browse meals from local chefs, place your order, and enjoy fresh homemade food delivered to your doorstep. Our chefs prepare each meal with care using quality ingredients.'
    },
    {
      question: 'What areas do you deliver to?',
      answer: 'We currently deliver to most areas within the city. During checkout, you can enter your address to confirm delivery availability in your location.'
    },
    {
      question: 'How fresh are the meals?',
      answer: 'All meals are prepared fresh by our chefs on the day of delivery. We prioritize quality and freshness to ensure you get the best dining experience.'
    },
    {
      question: 'Can I customize my order?',
      answer: 'Many of our chefs offer customization options. You can add special instructions during checkout or contact the chef directly through our platform.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and digital payment methods through our secure payment system powered by Stripe.'
    },
    {
      question: 'How can I become a chef on the platform?',
      answer: 'You can apply to become a chef by registering on our platform and submitting a chef application. Our team will review your application and get back to you.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className="py-20 transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? '#1f2937' : '#f8fafc'
      }}
    >
      <div className="max-w-4xl mx-auto px-4">
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
            Frequently Asked Questions
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: theme === 'dark' ? '#d1d5db' : '#64748b' }}
          >
            Find answers to common questions about our service
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-lg shadow-sm overflow-hidden"
              style={{
                backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e2e8f0'
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:opacity-80 transition-opacity"
              >
                <h3 
                  className="text-lg font-semibold"
                  style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}
                >
                  {faq.question}
                </h3>
                <div style={{ color: '#10b981' }}>
                  {openIndex === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div 
                      className="px-6 pb-4 border-t"
                      style={{ 
                        borderColor: theme === 'dark' ? '#4b5563' : '#e2e8f0'
                      }}
                    >
                      <p 
                        className="text-base leading-relaxed pt-4"
                        style={{ color: theme === 'dark' ? '#d1d5db' : '#64748b' }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;