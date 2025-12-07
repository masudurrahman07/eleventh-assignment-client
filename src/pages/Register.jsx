// src/pages/Register.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      await registerUser(
        data.name,
        data.email,
        data.password,
        data.profileImage,
        data.address
      );

      Swal.fire({
        icon: 'success',
        title: 'Account Created!',
        text: 'You can now login to your account',
        timer: 2000,
        showConfirmButton: false,
      });

      navigate('/login');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err.message || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-[95vh] px-4 bg-gray-50">
      <motion.form
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="font-medium">Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="font-medium">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Profile Image */}
        <div className="mb-4">
          <label className="font-medium">Profile Image URL</label>
          <input
            type="text"
            {...register('profileImage', { required: 'Profile image URL is required' })}
            className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          {errors.profileImage && <p className="text-red-500 text-sm">{errors.profileImage.message}</p>}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="font-medium">Address</label>
          <input
            type="text"
            {...register('address', { required: 'Address is required' })}
            className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              })}
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="font-medium">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm password',
              validate: value => value === password || 'Passwords do not match',
            })}
            className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-emerald-600 transition"
        >
          Register
        </button>

        <p className="mt-5 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Register;
