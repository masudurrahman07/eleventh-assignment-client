// src/pages/Dashboard/Chef/CreateMeal.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../auth/useAuth";
import Swal from "sweetalert2";

const CreateMeal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const foodImageFile = watch("foodImage");

  useEffect(() => {
    if (foodImageFile && foodImageFile[0]) {
      setPreview(URL.createObjectURL(foodImageFile[0]));
    }
  }, [foodImageFile]);
const uploadToBackend = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    // Use Axios to send file as multipart/form-data
    const response = await axiosSecure.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.url; // backend returns { url: ... }
  } catch (err) {
    console.error("Image upload error:", err.response?.data || err.message);
    throw new Error("Image upload failed");
  }
};


  const onSubmit = async (formData) => {
    try {
      setUploading(true);
      const imageFile = formData.foodImage[0];
      const imageUrl = await uploadToBackend(imageFile);

      const mealData = {
        foodName: formData.foodName,
        chefName: formData.chefName,
        foodImage: imageUrl,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating) || 0,
        ingredients: formData.ingredients.split(",").map((i) => i.trim()),
        estimatedDeliveryTime: formData.estimatedDeliveryTime,
        chefExperience: formData.chefExperience,
        chefId: user.chefId || "", // <-- auto-filled
        userEmail: user.email,
        createdAt: new Date().toISOString(),
      };

      await axiosSecure.post("/meals", mealData);

      Swal.fire("Success", "Meal created successfully!", "success");
      reset();
      setPreview("");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to create meal", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Create New Meal</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        {/* Food Name */}
        <div>
          <label className="block mb-1">Food Name</label>
          <input
            {...register("foodName", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.foodName && (
            <span className="text-red-500 text-sm">Food Name is required</span>
          )}
        </div>

        {/* Chef Name */}
        <div>
          <label className="block mb-1">Chef Name</label>
          <input
            {...register("chefName", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Type chef's name"
          />
          {errors.chefName && (
            <span className="text-red-500 text-sm">Chef Name is required</span>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            {...register("price", { required: true, min: 0 })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter price in USD"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">Price is required</span>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block mb-1">Rating</label>
          <input
            type="number"
            {...register("rating", { min: 0, max: 5 })}
            className="w-full border px-3 py-2 rounded"
            placeholder="0 - 5"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block mb-1">Ingredients (comma separated)</label>
          <input
            {...register("ingredients", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.ingredients && (
            <span className="text-red-500 text-sm">Ingredients required</span>
          )}
        </div>

        {/* Estimated Delivery Time */}
        <div>
          <label className="block mb-1">Estimated Delivery Time</label>
          <input
            {...register("estimatedDeliveryTime", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Chef Experience */}
        <div>
          <label className="block mb-1">Chef Experience</label>
          <input
            {...register("chefExperience", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Chef ID */}
        <div>
          <label className="block mb-1">Chef ID</label>
          <input
            value={user.chefId || ""}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* User Email */}
        <div>
          <label className="block mb-1">User Email</label>
          <input
            value={user.email}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Food Image */}
        <div>
          <label className="block mb-1">Upload Food Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("foodImage", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.foodImage && (
            <span className="text-red-500 text-sm">Image is required</span>
          )}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-48 h-48 object-cover rounded border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {uploading ? "Uploading Image..." : "Create Meal"}
        </button>
      </form>
    </div>
  );
};

export default CreateMeal;
