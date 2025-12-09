// src/pages/Home/ReviewSection.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import useAuth from "../../auth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ReviewCard from "../../components/ReviewCard";
import Loading from "../../components/Loading";
import AddReviewModal from "../MealDetails/AddReviewModal";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ReviewSection = ({ mealId, onReady }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      let url = mealId ? `/reviews/meal/${mealId}` : "/reviews?limit=6";
      const res = await axiosSecure.get(url);
      const formatted = (res.data || [])
        .map(r => ({
          ...r,
          _id: String(r._id),
          reviewerName: r.reviewerName || r.name || "Anonymous",
          reviewerImage: r.reviewerImage || "https://i.ibb.co/0s3pdnc/default-user.png",
          date: r.date ? new Date(r.date) : new Date(),
        }))
        .sort((a, b) => b.date - a.date);
      setReviews(formatted);
    } catch (err) {
      console.error("Fetch reviews error:", err);
      Swal.fire("Error", "Failed to fetch reviews", "error");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof onReady === "function") {
      onReady({
        open: () => setShowModal(true),
        close: () => setShowModal(false),
        refresh: fetchReviews,
      });
    }
  }, [onReady]);

  useEffect(() => {
    fetchReviews();
  }, [mealId]);

  const handleAddReview = (newReview) => {
    if (!mealId || mealId === newReview.foodId) {
      setReviews(prev => [
        { ...newReview, _id: String(newReview._id), date: new Date() },
        ...prev
      ]);
    }
    Swal.fire("Success", "Review submitted!", "success");
    setShowModal(false);
  };

  if (loading) return <Loading />;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={fadeUp}
      className="bg-linear-to-b from-gray-50 to-white py-12"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Customer Reviews
          </h2>
          {user && (
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow transition"
            >
              <FaPlus /> Give Review
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reviews.length > 0
            ? reviews.map((review, i) => (
                <motion.div
                  key={review._id + "-" + i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))
            : Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg p-6 opacity-0 pointer-events-none"
                />
              ))}
        </div>

        {showModal && (
          <AddReviewModal
            mealId={mealId}
            onClose={() => setShowModal(false)}
            onAdd={handleAddReview}
          />
        )}
      </div>
    </motion.section>
  );
};

export default ReviewSection;
