
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../auth/useAuth";
import { useTheme } from "../../contexts/ThemeContext";
import Swal from "sweetalert2";
import { Upload, Image, User, DollarSign, Star, Clock, Award } from "lucide-react";

const CreateMeal = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },} = useForm();

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

    
    const response = await axiosSecure.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },});

    return response.data.url; }
     catch (err) {
    console.error("Image upload error:", err.response?.data || err.message);
    throw new Error("Image upload failed");
  }};


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
        chefId: user.chefId || "", 
        userEmail: user.email,
        createdAt: new Date().toISOString(),};

      await axiosSecure.post("/meals", mealData);

      Swal.fire("Success", "Meal created successfully!", "success");
      reset();
      setPreview("");}
       catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to create meal", "error");}
       finally {
      setUploading(false);}
  };

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
        color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
      }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 
            className="text-4xl font-bold mb-2"
            style={{ color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}>
            Create New Meal
          </h2>
          <p 
            className="text-lg"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
            Share your culinary masterpiece with the world
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-8 rounded-2xl shadow-xl"
          style={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb'
          }}>
      
          <div className="space-y-2">
            <label 
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
              <Award className="w-4 h-4" />
              Food Name
            </label>
            <input
              {...register("foodName", { required: true })}
              className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
              }}
              placeholder="Enter meal name" />
            {errors.foodName && (
              <span className="text-red-500 text-sm flex items-center gap-1">
                Food Name is required
              </span>
            )}
          </div>

          
          <div className="space-y-2">
            <label 
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
              <User className="w-4 h-4" />
              Chef Name
            </label>
            <input
              {...register("chefName", { required: true })}
              className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
              }}
              placeholder="Chef name"
            />
            {errors.chefName && (
              <span className="text-red-500 text-sm">Chef Name is required</span>
            )}
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label 
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
                <DollarSign className="w-4 h-4" />
                Price (USD)
              </label>
              <input
                type="number"
                {...register("price", { required: true, min: 0 })}
                className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                  borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                  color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
                }}
                placeholder="0.00"/>
              {errors.price && (
                <span className="text-red-500 text-sm">Price is required</span>
              )}
            </div>

            <div className="space-y-2">
              <label 
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
                <Star className="w-4 h-4" />
                Rating (0-5)
              </label>
              <input
                type="number"
                {...register("rating", { min: 0, max: 5 })}
                className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                  borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                  color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
                }}
                placeholder="4.5"
              />
            </div>
          </div>

    
          <div className="space-y-2">
            <label 
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
              Ingredients (comma separated)
            </label>
            <textarea
              {...register("ingredients", { required: true })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              style={{
                backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
              }}
              placeholder="tomatoes, onions, garlic, herbs"/>
            {errors.ingredients && (
              <span className="text-red-500 text-sm">Ingredients are required</span>
            )}
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label 
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
                <Clock className="w-4 h-4" />
                Estimated Delivery Time
              </label>
              <input
                {...register("estimatedDeliveryTime", { required: true })}
                className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                  borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                  color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
                }}
                placeholder="30-40 minutes"/>
            </div>

            <div className="space-y-2">
              <label 
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
                Chef Experience
              </label>
              <input
                {...register("chefExperience", { required: true })}
                className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                  borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                  color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
                }}
                placeholder="Professional cooking experience"/>
            </div>
          </div>

     
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label 
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                Chef ID
              </label>
              <input
                value={user.chefId || ""}
                readOnly
                className="w-full px-4 py-3 rounded-xl border-2 cursor-not-allowed"
                style={{
                  backgroundColor: theme === 'dark' ? '#4b5563' : '#f3f4f6',
                  borderColor: theme === 'dark' ? '#6b7280' : '#d1d5db',
                  color: theme === 'dark' ? '#9ca3af' : '#6b7280'
                }}
              />
            </div>

            <div className="space-y-2">
              <label 
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                User Email
              </label>
              <input
                value={user.email}
                readOnly
                className="w-full px-4 py-3 rounded-xl border-2 cursor-not-allowed"
                style={{
                  backgroundColor: theme === 'dark' ? '#4b5563' : '#f3f4f6',
                  borderColor: theme === 'dark' ? '#6b7280' : '#d1d5db',
                  color: theme === 'dark' ? '#9ca3af' : '#6b7280'
                }}/>
            </div>
          </div>

     
          <div className="space-y-4">
            <label 
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
              <Image className="w-4 h-4" />
              Upload Food Image
            </label>
            
            <div 
              className="border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 hover:border-blue-400"
              style={{
                borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb'
              }}>
              <input
                type="file"
                accept="image/*"
                {...register("foodImage", { required: true })}
                className="hidden"
                id="foodImage"/>
              <label 
                htmlFor="foodImage" 
                className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-blue-500" />
                <span 
                  className="text-sm font-medium"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                  Click to upload or drag and drop
                </span>
                <span 
                  className="text-xs"
                  style={{ color: theme === 'dark' ? '#6b7280' : '#9ca3af' }}>
                  PNG, JPG, GIF up to 10MB
                </span>
              </label>
            </div>
            
            {errors.foodImage && (
              <span className="text-red-500 text-sm">Image is required</span>
            )}
            
            {preview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-xl border-2 shadow-lg"
                  style={{ borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb' }}
                />
              </div>
            )}
          </div>


          <div className="pt-6">
            <button
              type="submit"
              disabled={uploading}
              className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{
                background: uploading 
                  ? (theme === 'dark' ? '#4b5563' : '#9ca3af')
                  : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'}}>
                    
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading Image...
                </span>
              ) : (
                "Create Meal"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMeal;
