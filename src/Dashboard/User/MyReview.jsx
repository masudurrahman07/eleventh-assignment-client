
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import ReviewCard from '../../components/ReviewCard';

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mealsMap, setMealsMap] = useState({}); 

  const [editingReview, setEditingReview] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');

useEffect(() => {
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get('/reviews/my');
      setReviews(res.data); }
       catch (err) {
      console.error('Fetch reviews error:', err);
      Swal.fire('Error', 'Failed to fetch your reviews', 'error');
      setReviews([]);
    } finally {
      setLoading(false);} };

  fetchReviews();
}, []);

  const handleDelete = async (reviewId) => {

    if (!reviewId) return;
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This review will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',});

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/reviews/${reviewId}`);
      setReviews(prev => prev.filter(r => r._id !== reviewId));
      Swal.fire('Deleted!', 'Your review has been deleted.', 'success');} 
      catch (err) {
      console.error('Delete review error:', err);
      Swal.fire('Error', 'Failed to delete review', 'error');}};

  const openEditModal = (review) => {
    if (!review?._id) return Swal.fire('Error', 'Invalid review', 'error');
    setEditingReview({ ...review });
    setEditRating(review.rating || 5);
    setEditComment(review.comment || '')};

  const submitEdit = async () => {
    if (!editingReview?._id) return Swal.fire('Error', 'Invalid review', 'error');
    if (!editComment.trim()) return Swal.fire('Error', 'Comment cannot be empty', 'error');

    try {
      const res = await axiosSecure.patch(`/reviews/${editingReview._id}`, {
        rating: editRating,
        comment: editComment,});

      const updatedReview = res.data;

    
      setReviews(prev =>
        prev.map(r =>
          r._id === updatedReview._id
            ? {
                ...r,
                rating: updatedReview.rating,
                comment: updatedReview.comment,
                date: updatedReview.date,
                mealName: mealsMap[r.foodId] || 'Unknown Meal',
              }
            : r ));

      Swal.fire('Success', 'Review updated successfully!', 'success');
      setEditingReview(null);} 
      catch (err) {
      console.error('Update review error:', err);
      Swal.fire('Error', err.response?.data?.message || 'Failed to update review', 'error');}};

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto py-6">

      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">You haven't submitted any reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {reviews.map(review => (
            <ReviewCard
              key={review._id}
              review={review}
              onUpdate={() => openEditModal(review)}
              onDelete={() => handleDelete(review._id)}/>))}
        </div>)}

      {editingReview && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl space-y-4">
            <h2 className="text-xl font-bold">Edit Review</h2>

            <div>
              <label className="font-semibold">Rating:</label>
              <select
                className="w-full mt-1 border p-2 rounded"
                value={editRating}
                onChange={(e) => setEditRating(parseInt(e.target.value))}>
                {[5,4,3,2,1].map(num => (
                  <option key={num} value={num}>{num} Stars</option>))}
              </select>
            </div>

            <div>
              <label className="font-semibold">Comment:</label>
              <textarea
                className="w-full mt-1 border p-2 rounded h-28"
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                placeholder="Update your experience..."/>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setEditingReview(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"> Cancel</button>
              <button onClick={submitEdit} className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"> Update</button>
            </div>
          </div>
        </div>)}
    </div>
  );
};

export default MyReviews;
