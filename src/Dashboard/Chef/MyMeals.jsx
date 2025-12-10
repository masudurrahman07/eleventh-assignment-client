// src/pages/Dashboard/Chef/MyMeals.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../auth/useAuth";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";

const MyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(null);

  const [formData, setFormData] = useState({
    foodName: "",
    chefName: "",
    foodImage: "",
    price: "",
    ingredients: "",
    estimatedDeliveryTime: "",
    chefExperience: "",
    rating: "",
  });

  // Fetch meals created by logged-in chef
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axiosSecure.get("/meals/chef"); // ✅ fixed
        setMeals(res.data);
      } catch (err) {
        Swal.fire("Error", "Failed to fetch meals", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [axiosSecure]);

  // Delete Meal
  const handleDelete = async (mealId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This meal will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/meals/${mealId}`);
        setMeals(meals.filter((m) => m._id !== mealId));
        Swal.fire("Deleted!", "Meal has been deleted.", "success");
      } catch {
        Swal.fire("Error", "Failed to delete meal", "error");
      }
    }
  };

  // Open modal and load data
  const openUpdateModal = (meal) => {
    setCurrentMeal(meal);
    setFormData({
      foodName: meal.foodName,
      chefName: meal.chefName,
      foodImage: meal.foodImage,
      price: meal.price,
      ingredients: meal.ingredients.join(", "),
      estimatedDeliveryTime: meal.estimatedDeliveryTime,
      chefExperience: meal.chefExperience || "",
      rating: meal.rating || 0,
    });
    setIsModalOpen(true);
  };

  // Form input update
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!currentMeal) return;

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      ingredients: formData.ingredients.split(",").map((i) => i.trim()),
    };

    try {
      const res = await axiosSecure.put(`/meals/${currentMeal._id}`, payload);
      setMeals(
        meals.map((m) => (m._id === currentMeal._id ? res.data : m))
      );
      setIsModalOpen(false);
      Swal.fire("Updated!", "Meal updated successfully!", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update meal", "error");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center">My Meals</h2>

      {meals.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven't created any meals yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meals.map((meal) => (
            <div
              key={meal._id}
              className="bg-white border rounded-xl shadow-lg hover:shadow-2xl transition p-4"
            >
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="w-full h-48 object-cover rounded-lg"
              />

              <h3 className="text-xl font-semibold mt-3">{meal.foodName}</h3>

              <p className="text-gray-700">
                <strong>Chef Name:</strong> {meal.chefName}
              </p>
              <p className="text-gray-700">
                <strong>Chef ID:</strong> {meal.chefId}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 rounded-full bg-linear-to-r from-green-400 to-green-600 text-white">
                  ${meal.price}
                </span>
                <span className="px-3 py-1 rounded-full bg-linear-to-r from-yellow-400 to-yellow-600 text-white">
                  Rating: {meal.rating || 0}
                </span>
                <span className="px-3 py-1 rounded-full bg-linear-to-r from-blue-400 to-blue-600 text-white">
                  {meal.estimatedDeliveryTime}
                </span>
              </div>

              <p className="mt-2 text-gray-600 text-sm">
                <strong>Ingredients:</strong> {meal.ingredients.join(", ")}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openUpdateModal(meal)}
                  className="flex-1 px-4 py-2 rounded-lg text-white bg-linear-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(meal._id)}
                  className="flex-1 px-4 py-2 rounded-lg text-white bg-linear-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Soft transparent background */}
          <div
            className="absolute inset-0 bg-white/20 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-6 z-10">
            <h3 className="text-2xl font-semibold mb-4">Update Meal</h3>

            <form className="space-y-3" onSubmit={handleUpdateSubmit}>
              <input
                name="foodName"
                value={formData.foodName}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Food Name"
              />
              <input
                name="chefName"
                value={formData.chefName}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Chef Name"
              />
              <input
                name="foodImage"
                value={formData.foodImage}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Food Image URL"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Price"
              />
              <input
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Ingredients (comma separated)"
              />
              <input
                name="estimatedDeliveryTime"
                value={formData.estimatedDeliveryTime}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Estimated Delivery Time"
              />

              <input
                name="chefExperience"
                value={formData.chefExperience}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Chef Experience"
              />

              {/* ⭐ Rating Field Added */}
              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Rating (0–5)"
              />

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-white bg-linear-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700"
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
