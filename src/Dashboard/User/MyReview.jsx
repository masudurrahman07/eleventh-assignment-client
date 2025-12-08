// src/pages/Dashboard/User/MyReviews.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth  from '../../auth/useAuth';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import ReviewCard from '../../components/ReviewCard';

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get(`/reviews/my`); // backend filters by user email
        setReviews(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to fetch reviews', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [axiosSecure]);

  // Delete a review
  const handleDelete = async (reviewId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This review will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/reviews/${reviewId}`);
        setReviews(reviews.filter(r => r._id !== reviewId));
        Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to delete review', 'error');
      }
    }
  };

  // Update a review
  const handleUpdate = async (reviewId, newData) => {
    try {
      const res = await axiosSecure.put(`/reviews/${reviewId}`, newData);
      setReviews(reviews.map(r => (r._id === reviewId ? res.data : r)));
      Swal.fire('Success', 'Review updated successfully!', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update review', 'error');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">You haven't submitted any reviews yet.</p>
      ) : (
        <div className="grid gap-4">
          {reviews.map(review => (
            <ReviewCard
              key={review._id}
              review={review}
              onDelete={() => handleDelete(review._id)}
              onUpdate={(newData) => handleUpdate(review._id, newData)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
