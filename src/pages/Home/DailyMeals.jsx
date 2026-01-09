import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import MealCard from '../../components/MealCard';
import Loading from '../../components/Loading';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const DailyMeals = () => {
  const { theme } = useTheme();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axios.get('https://local-chef-bazaar-server-mocha.vercel.app/meals?limit=6');
        setMeals(res.data.meals || []);
      } catch (err) {
        console.error('Error fetching meals:', err);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) return <Loading />;

  if (meals.length === 0)
    return (
      <p 
        className="text-center"
        style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
        No meals available today.
      </p>
    );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeUp}
      className="px-4 py-8"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : 'transparent'
      }}>
      <h2 
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8"
        style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}>
        Daily Meals</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {meals.map(meal => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>
    </motion.div>
  );
};

export default DailyMeals;
