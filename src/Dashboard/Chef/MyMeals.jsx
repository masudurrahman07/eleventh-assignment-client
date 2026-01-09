
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../auth/useAuth";
import { useTheme } from "../../contexts/ThemeContext";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";

const MyMeals = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
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


  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axiosSecure.get("/meals/chef"); 
        setMeals(res.data);
      } catch (err) {
        Swal.fire("Error", "Failed to fetch meals", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [axiosSecure]);


  const handleDelete = async (mealId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This meal will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",});

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/meals/${mealId}`);
        setMeals(meals.filter((m) => m._id !== mealId));
        Swal.fire("Deleted!", "Meal has been deleted.", "success");}
         catch { Swal.fire("Error", "Failed to delete meal", "error");}}};

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
      rating: meal.rating || 0,});
    setIsModalOpen(true);};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });};


  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!currentMeal) return;

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      ingredients: formData.ingredients.split(",").map((i) => i.trim()),};

    try {
      const res = await axiosSecure.put(`/meals/${currentMeal._id}`, payload);
      setMeals(
        meals.map((m) => (m._id === currentMeal._id ? res.data : m))
      );
      setIsModalOpen(false);
      Swal.fire("Updated!", "Meal updated successfully!", "success");}
       catch (err) {
      Swal.fire("Error", "Failed to update meal", "error");}};

  if (loading) return <Loading />;

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
        color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
      }}>
      <div className="max-w-7xl mx-auto space-y-8">
        <h2 
          className="text-3xl font-bold text-center"
          style={{ color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}>
          My Meals
        </h2>

        {meals.length === 0 ? (
          <p 
            className="text-center text-lg"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
            You haven't created any meals yet.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meals.map((meal) => (
              <div
                key={meal._id}
                className="border rounded-xl shadow-lg hover:shadow-2xl transition p-4"
                style={{
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                }}>
                <img
                  src={meal.foodImage}
                  alt={meal.foodName}
                  className="w-full h-48 object-cover rounded-lg"/>

                <h3 
                  className="text-xl font-semibold mt-3"
                  style={{ color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                  {meal.foodName}
                </h3>

                <p style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                  <strong>Chef Name:</strong> {meal.chefName}
                </p>

                <p style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                  <strong>Chef ID:</strong> {meal.chefId}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 rounded-full text-white" style={{ background: 'linear-gradient(to right, #4ade80, #16a34a)' }}>
                    ${meal.price}
                  </span>
                  <span className="px-3 py-1 rounded-full text-white" style={{ background: 'linear-gradient(to right, #facc15, #ca8a04)' }}>
                    Rating: {meal.rating || 0}
                  </span>
                  <span className="px-3 py-1 rounded-full text-white" style={{ background: 'linear-gradient(to right, #60a5fa, #2563eb)' }}>
                    {meal.estimatedDeliveryTime}
                  </span>
                </div>

                <p 
                  className="mt-2 text-sm"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
                >
                  <strong>Ingredients:</strong> {meal.ingredients.join(", ")}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openUpdateModal(meal)}
                    className="flex-1 px-4 py-2 rounded-lg text-white transition"
                    style={{ background: 'linear-gradient(to right, #facc15, #ca8a04)' }}
                    onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #eab308, #a16207)'}
                    onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #facc15, #ca8a04)'}>
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="flex-1 px-4 py-2 rounded-lg text-white transition"
                    style={{ background: 'linear-gradient(to right, #ef4444, #dc2626)' }}
                    onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #dc2626, #b91c1c)'}
                    onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #ef4444, #dc2626)'}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 backdrop-blur-sm"
              style={{ backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.2)' }}
              onClick={() => setIsModalOpen(false)} />

            <div 
              className="relative rounded-xl shadow-xl max-w-lg w-full p-6 z-10 mx-4"
              style={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                border: theme === 'dark' ? '1px solid #374151' : 'none'
              }} >
              <h3 
                className="text-2xl font-semibold mb-4"
                style={{ color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }} >
                Update Meal
              </h3>

              <form className="space-y-3" onSubmit={handleUpdateSubmit}>
                <input
                  name="foodName"
                  value={formData.foodName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                    borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                    color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
                  }}
                  placeholder="Food Name" />

                <input
                  name="chefName"
                  value={formData.chefName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                    borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                    color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
                  }}
                  placeholder="Chef Name" />

                <input
                  name="foodImage"
                  value={formData.foodImage}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                    borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                    color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
                  }}
                  placeholder="Food Image URL" />

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                    borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                    color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
                  }}
                  placeholder="Price" />

                <input
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                    borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                    color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
                  }}
                  placeholder="Ingredients (comma separated)" />

                <input
                  name="estimatedDeliveryTime"
                  value={formData.estimatedDeliveryTime}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                    borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                    color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
                  }}
                  placeholder="Estimated Delivery Time"  />

                <input
                  name="chefExperience"
                  value={formData.chefExperience}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                    borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                    color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
                  }}
                  placeholder="Chef Experience"/>

                <input
                  type="number"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                    borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                    color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
                  }}
                  placeholder="Rating (0–5)" />

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg hover:opacity-80 transition"
                    style={{
                      backgroundColor: theme === 'dark' ? '#4b5563' : '#e5e7eb',
                      color: theme === 'dark' ? '#f3f4f6' : '#374151'}} >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-white transition"
                    style={{ background: 'linear-gradient(to right, #facc15, #ca8a04)' }}
                    onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #eab308, #a16207)'}
                    onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #facc15, #ca8a04)'}>
                    Update </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMeals;
