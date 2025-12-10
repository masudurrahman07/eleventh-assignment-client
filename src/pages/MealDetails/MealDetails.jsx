
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaUserTie, FaStar, FaClock, FaHeart } from 'react-icons/fa';
import { useAuth } from '../../auth/AuthProvider';
import Loading from '../../components/Loading';
import ReviewSection from '../Home/ReviewSection';

const MealDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user, token } = useAuth();


  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [reviewSectionApi, setReviewSectionApi] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/meals/${id}`);
        setMeal(res.data);}
         catch (err) {
        console.error('Failed to load meal:', err);
        Swal.fire('Error', 'Failed to load meal', 'error');
        navigate('/');}
         finally {
        setLoading(false);}
    };

    fetchMeal();
  }, [id, navigate]);

  const handleAddToFavorite = async () => {
    if (!user || !token) {
      Swal.fire('Login Required', 'Please log in to add to favorites', 'info');
      navigate('/login');
      return;}

    if (!meal || !meal._id) {
      Swal.fire('Error', 'Meal ID is missing', 'error');
      return;}

    try {
      await axios.post(
        'http://localhost:3000/favorites',
        { mealId: meal._id },
        { headers: { Authorization: `Bearer ${token}` } });

      Swal.fire('Added!', 'Meal added to your favorites', 'success');}
       catch (err) {
      console.error('Favorites error:', err);
      Swal.fire(
        'Error',
        err.response?.data?.message || 'Could not add to favorites',
        'error'); }};

  if (loading) return <Loading />;

  if (!meal) return <div className="text-center py-20">Meal not found</div>;

  const mealIdStr = String(meal._id ?? meal.id ?? id);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-12">
      
      <div className="flex flex-col md:flex-row gap-8">

        <div className="relative md:w-1/2 rounded-xl overflow-hidden shadow-2xl">
          <img
            src={meal.foodImage}
            alt={meal.foodName}
            className="w-full h-96 object-cover"/>

          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>

          <h2 className="absolute bottom-6 left-6 text-4xl font-bold text-white drop-shadow-2xl">
            {meal.foodName}
          </h2>
        </div>

        <div className="flex-1 bg-white rounded-2xl p-8 shadow-xl space-y-6">

          <div className="flex items-center gap-3">
            <FaUserTie className="text-3xl text-emerald-600" /><div>

              <p className="text-xl font-bold">{meal.chefName}</p>
              <p className="text-sm text-gray-500">Chef ID: {meal.chefId}</p>
            </div>

          </div>

          <div className="flex flex-wrap gap-6 text-lg">

            <span className="flex items-center gap-2"><FaStar className="text-yellow-500" /> {meal.rating || 'New'}</span>

            <span className="flex items-center gap-2"><FaClock className="text-emerald-600" />{' '}
              {meal.estimatedDeliveryTime || '30-45 min'} </span>
            <span className="text-2xl font-bold text-emerald-600">
              ${meal.price} </span>
          </div>

          <p> <strong>Ingredients:</strong>{' '} {meal.ingredients?.join(', ') || 'Not listed'}</p>

          <p> <strong>Chef Experience:</strong>{' '}  {meal.chefExperience || 'Professional'} </p>

    
          <p> <strong>Delivery Area:</strong> All over Dhaka </p>

          <div className="flex flex-wrap gap-4 pt-4">

            <button
              onClick={() => navigate(`/order/${meal._id}`, { state: { meal } })}
              className="px-8 py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:scale-105 transition"> Order Now</button>

            <button
              onClick={handleAddToFavorite}
              className="px-8 py-3 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 transition flex items-center gap-2"><FaHeart /> Add to Favorite </button>
          </div>

        </div>
      </div>

      
      <ReviewSection mealId={mealIdStr} onReady={setReviewSectionApi} />
    </div>
  );
};

export default MealDetails;
