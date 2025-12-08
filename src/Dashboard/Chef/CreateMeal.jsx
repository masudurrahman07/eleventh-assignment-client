// src/pages/Dashboard/Chef/CreateMeal.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../auth/useAuth";
import Swal from "sweetalert2";

const CreateMeal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(""); // ⭐ image preview

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // Watch the file input for live preview
  const foodImageFile = watch("foodImage");
  React.useEffect(() => {
    if (foodImageFile && foodImageFile[0]) {
      const file = foodImageFile[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [foodImageFile]);

  // Upload image to imgbb
  const uploadToImgbb = async (file) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.data.url;
  };

  const onSubmit = async (formData) => {
    try {
      setUploading(true);

      const imageFile = formData.foodImage[0];
      const imageUrl = await uploadToImgbb(imageFile);

      const mealData = {
        foodName: formData.foodName,
        chefName: formData.chefName,
        price: parseFloat(formData.price),
        ingredients: formData.ingredients,
        estimatedDeliveryTime: formData.estimatedDeliveryTime,
        chefExperience: formData.chefExperience,
        chefId: formData.chefId,
        foodImage: imageUrl,
        rating: 0,
        userEmail: user.email,
        createdAt: new Date().toISOString(),
      };

      await axiosSecure.post("/meals", mealData);

      Swal.fire("Success", "Meal created successfully!", "success");
      reset();
      setPreview(""); // reset preview after submit
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
            defaultValue={user.displayName || ""}
            readOnly
          />
        </div>

        {/* Food Image Upload */}
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

          {/* ⭐ Live Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-48 h-48 object-cover rounded border"
            />
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            {...register("price", { required: true, min: 1 })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">Price must be at least 1</span>
          )}
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
            {...register("chefId", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Assigned by admin"
          />
        </div>

        {/* Submit */}
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
