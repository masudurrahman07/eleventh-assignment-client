// src/pages/Home/ReviewSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ReviewCard from "../../components/ReviewCard";
import Loading from "../../components/Loading";
import AddReviewModal from "../MealDetails/AddReviewModal";
import useAuth from "../../auth/useAuth";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ReviewSection = ({ mealId, onReady /* optional: parent can get API */ }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Provide parent with a small API so it can trigger the modal
  useEffect(() => {
    if (typeof onReady === "function") {
      onReady({
        open: () => setShowReviewModal(true),
        close: () => setShowReviewModal(false),
        refresh: fetchReviews, // eslint-disable-line no-use-before-define
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onReady]);

  async function fetchReviews() {
    try {
      setLoading(true);
      const url = mealId
        ? `http://localhost:3000/reviews/${mealId}`
        : `http://localhost:3000/reviews`;
      const res = await axios.get(url);

      const formatted = (res.data || [])
        .map((r) => ({
          ...r,
          _id: r._id || r.id,
          reviewerName: r.reviewerName || r.name || "Anonymous",
          reviewerImage: r.reviewerImage || "https://i.ibb.co/0s3pdnc/default-user.png",
          date: r.date ? new Date(r.date) : new Date(),
        }))
        .sort((a, b) => b.date - a.date);

      setReviews(formatted);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mealId]);

  const handleAddReview = (newReview) => {
    const formatted = {
      ...newReview,
      date: newReview.date ? new Date(newReview.date) : new Date(),
      reviewerImage: newReview.reviewerImage || "https://i.ibb.co/0s3pdnc/default-user.png",
      _id: newReview._id || Math.random().toString(36).slice(2),
    };

    // show new review on top
    setReviews((prev) => [formatted, ...prev]);
    Swal.fire("Success", "Review submitted!", "success");
    setShowReviewModal(false);
  };

  if (loading) return <Loading />;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={fadeUp}
      className="bg-linear-to-b from-gray-50 to-white py-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">Customer Reviews</h2>

          {user && (
            <button
              onClick={() => setShowReviewModal(true)}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg transition-all"
            >
              <FaPlus /> Give Review
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div
                key={String(review._id) + "-" + index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <ReviewCard review={review} />
              </motion.div>
            ))
          ) : (
            // keep layout consistent with invisible placeholders
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 opacity-0 pointer-events-none" />
            ))
          )}
        </div>

        {showReviewModal && (
          <AddReviewModal
            mealId={mealId}
            onClose={() => setShowReviewModal(false)}
            onAdd={handleAddReview}
          />
        )}
      </div>
    </motion.section>
  );
};

export default ReviewSection;
