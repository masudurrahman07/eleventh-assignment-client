import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../auth/useAuth";

const AddReviewModal = ({ mealId, onClose, onAdd }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!comment.trim()) {
      Swal.fire("Error", "Please write a comment", "error");
      return;
    }

    try {
      const newReview = {
        foodId: mealId.toString(), // always string
        reviewerName: user?.name,
        reviewerImage: user?.profileImage,
        rating,
        comment,
        date: new Date().toISOString()
      };

      const res = await axios.post("http://localhost:3000/reviews", newReview);

      // Immediately show in frontend
      onAdd({
        ...newReview,
        _id: res.data._id
      });

      onClose();
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl space-y-4">
        <h2 className="text-xl font-bold">Write a Review</h2>

        <div>
          <label className="font-semibold">Rating:</label>
          <select
            className="w-full mt-1 border p-2 rounded"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          >
            {[5,4,3,2,1].map(num => (
              <option key={num} value={num}>{num} Stars</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Comment:</label>
          <textarea
            className="w-full mt-1 border p-2 rounded h-28"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your experience..."
          />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
