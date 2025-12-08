// src/pages/Dashboard/Chef/MyMeals.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../auth/useAuth';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';

const MyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(null);
  const [formData, setFormData] = useState({
    foodName: '',
    chefName: '',
    foodImage: '',
    price: '',
    rating: '', // added rating here
    ingredients: '',
    estimatedDeliveryTime: '',
    chefExperience: '',
  });

  // Fetch meals created by logged-in chef
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axiosSecure.get(`/meals/chef/${user.email}`);
        setMeals(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to fetch meals', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [axiosSecure, user.email]);

  // Delete a meal
  const handleDelete = async (mealId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This meal will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/meals/${mealId}`);
        setMeals(meals.filter((m) => m._id !== mealId));
        Swal.fire('Deleted!', 'Meal has been deleted.', 'success');
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to delete meal', 'error');
      }
    }
  };

  // Open modal with meal data
  const openUpdateModal = (meal) => {
    setCurrentMeal(meal);
    setFormData({
      foodName: meal.foodName || '',
      chefName: meal.chefName || '',
      foodImage: meal.foodImage || '',
      price: meal.price || '',
      rating: meal.rating || 0, // populate rating
      ingredients: meal.ingredients?.join(', ') || '',
      estimatedDeliveryTime: meal.estimatedDeliveryTime || '',
      chefExperience: meal.chefExperience || '',
    });
    setIsModalOpen(true);
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!currentMeal) return;

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating), // send rating to backend
      ingredients: formData.ingredients.split(',').map((i) => i.trim()),
    };

    try {
      const res = await axiosSecure.put(`/meals/${currentMeal._id}`, payload);
      setMeals(meals.map((m) => (m._id === currentMeal._id ? res.data : m)));
      setIsModalOpen(false);
      Swal.fire('Updated!', 'Meal updated successfully.', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update meal', 'error');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center">My Meals</h2>

      {meals.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">You haven't created any meals yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {meals.map((meal) => (
            <div
              key={meal._id}
              className="bg-white border rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <div className="relative">
                <img
                  src={meal.foodImage}
                  alt={meal.foodName}
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">{meal.foodName}</h3>

                <p className="text-gray-700">
                  <strong>Chef Name:</strong> {meal.chefName || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Chef ID:</strong> {meal.chefId || 'N/A'}
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="bg-linear-to-r from-green-400 to-green-600 text-white px-2 py-1 rounded-full shadow">
                    ${meal.price}
                  </span>
                  <span className="bg-linear-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full shadow">
                    Rating: {meal.rating || 0}
                  </span>
                  <span className="bg-linear-to-r from-blue-400 to-blue-600 text-white px-2 py-1 rounded-full shadow">
                    Delivery: {meal.estimatedDeliveryTime}
                  </span>
                </div>

                <p className="text-gray-600 text-sm">
                  <strong>Ingredients:</strong> {meal.ingredients.join(', ')}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openUpdateModal(meal)}
                    className="flex-1 text-white font-medium px-4 py-2 rounded-lg transition
                               bg-linear-to-r from-yellow-400 to-yellow-600
                               hover:from-yellow-500 hover:to-yellow-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="flex-1 text-white font-medium px-4 py-2 rounded-lg transition
                               bg-linear-to-r from-red-500 to-red-700
                               hover:from-red-600 hover:to-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-6 z-10">
            <h3 className="text-2xl font-semibold mb-4">Update Meal</h3>
            <form className="space-y-3" onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                name="foodName"
                placeholder="Food Name"
                value={formData.foodName}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="text"
                name="chefName"
                placeholder="Chef Name"
                value={formData.chefName}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="text"
                name="foodImage"
                placeholder="Food Image URL"
                value={formData.foodImage}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {/* Rating input */}
              <input
                type="number"
                name="rating"
                placeholder="Rating (0-5)"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="text"
                name="ingredients"
                placeholder="Ingredients (comma separated)"
                value={formData.ingredients}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="text"
                name="estimatedDeliveryTime"
                placeholder="Estimated Delivery Time"
                value={formData.estimatedDeliveryTime}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="text"
                name="chefExperience"
                placeholder="Chef Experience"
                value={formData.chefExperience}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-linear-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMeals;
