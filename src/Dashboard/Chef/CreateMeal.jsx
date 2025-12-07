// src/pages/Dashboard/Chef/CreateMeal.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useAuth } from '../../../auth/useAuth';
import Swal from 'sweetalert2';

const CreateMeal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const mealData = {
        ...data,
        price: parseFloat(data.price),
        rating: 0,
        userEmail: user.email,
        createdAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post('/meals', mealData);
      Swal.fire('Success', 'Meal created successfully!', 'success');
      reset();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to create meal', 'error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Create New Meal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded shadow">

        <div>
          <label className="block mb-1">Food Name</label>
          <input
            {...register('foodName', { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.foodName && <span className="text-red-500 text-sm">Food Name is required</span>}
        </div>

        <div>
          <label className="block mb-1">Chef Name</label>
          <input
            {...register('chefName', { required: true })}
            className="w-full border px-3 py-2 rounded"
            defaultValue={user.displayName || ''}
            readOnly
          />
        </div>

        <div>
          <label className="block mb-1">Food Image URL</label>
          <input
            {...register('foodImage', { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.foodImage && <span className="text-red-500 text-sm">Image URL is required</span>}
        </div>

        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            {...register('price', { required: true, min: 1 })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.price && <span className="text-red-500 text-sm">Price must be at least 1</span>}
        </div>

        <div>
          <label className="block mb-1">Ingredients (comma separated)</label>
          <input
            {...register('ingredients', { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.ingredients && <span className="text-red-500 text-sm">Ingredients required</span>}
        </div>

        <div>
          <label className="block mb-1">Estimated Delivery Time</label>
          <input
            {...register('estimatedDeliveryTime', { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Chef Experience</label>
          <input
            {...register('chefExperience', { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Chef ID</label>
          <input
            {...register('chefId', { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Assigned by admin"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Meal
        </button>
      </form>
    </div>
  );
};

export default CreateMeal;
