// src/pages/Dashboard/Chef/MyMeals.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import  useAuth  from '../../auth/useAuth';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';

const MyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setMeals(meals.filter(m => m._id !== mealId));
        Swal.fire('Deleted!', 'Meal has been deleted.', 'success');
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to delete meal', 'error');
      }
    }
  };

  // Update a meal
  const handleUpdate = async (mealId) => {
    const { value: formValues } = await Swal.fire({
      title: 'Update Meal Price',
      html: `<input type="number" id="price" class="swal2-input" placeholder="Enter new price">`,
      focusConfirm: false,
      preConfirm: () => {
        const price = document.getElementById('price').value;
        if (!price) Swal.showValidationMessage('Price is required');
        return { price: parseFloat(price) };
      },
    });

    if (formValues) {
      try {
        const res = await axiosSecure.put(`/meals/${mealId}`, formValues);
        setMeals(meals.map(m => (m._id === mealId ? res.data : m)));
        Swal.fire('Updated!', 'Meal updated successfully.', 'success');
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to update meal', 'error');
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">My Meals</h2>

      {meals.length === 0 ? (
        <p className="text-gray-500">You haven't created any meals yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {meals.map(meal => (
            <div key={meal._id} className="border rounded p-4 shadow space-y-2">
              <img src={meal.foodImage} alt={meal.foodName} className="w-full h-40 object-cover rounded" />
              <h3 className="text-lg font-bold">{meal.foodName}</h3>
              <p><strong>Price:</strong> ${meal.price}</p>
              <p><strong>Rating:</strong> {meal.rating}</p>
              <p><strong>Ingredients:</strong> {meal.ingredients.join(', ')}</p>
              <p><strong>Estimated Delivery:</strong> {meal.estimatedDeliveryTime}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(meal._id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(meal._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyMeals;
