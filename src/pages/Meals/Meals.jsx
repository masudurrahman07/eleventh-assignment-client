// src/pages/Meals/Meals.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import MealCard from "../../components/MealCard";
import Loading from "../../components/Loading";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const limit = 10;

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        // Backend page cycling
        const backendPage = ((page - 1) % 2) + 1;
        const res = await axios.get(
          `http://localhost:3000/meals?page=${backendPage}&limit=${limit}`
        );
        let fetchedMeals = res.data.meals || [];

        // Sort client-side by price
        fetchedMeals.sort((a, b) =>
          sortOrder === "asc" ? a.price - b.price : b.price - a.price
        );

        setMeals(fetchedMeals);
        setTotal(res.data.total || 0);
      } catch (err) {
        console.error("Error fetching meals:", err);
        setMeals([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [page, sortOrder]);

  if (loading) return <Loading />;

  if (!meals.length)
    return (
      <p className="text-center text-gray-500 text-lg mt-16">
        No meals available.
      </p>
    );

  const totalPages = 4;

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      {/* Page Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
      >
        Explore All Meals
      </motion.h1>

      {/* Sort Select */}
      <div className="flex justify-center mb-8">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="
            px-4 py-2 rounded-lg border border-gray-300
            shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500
            font-medium text-gray-700 transition-all duration-300
          "
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Meals Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeUp}
      >
        {meals.map((meal) => (
          <motion.div
            key={meal._id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: false }}
          >
            <MealCard meal={meal} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <motion.div
        className="flex justify-center mt-12 gap-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`
              px-4 py-2 rounded-full font-semibold shadow 
              transition-all duration-300 
              ${
                page === i + 1
                  ? "bg-emerald-500 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {i + 1}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default Meals;
