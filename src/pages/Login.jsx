import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; 

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      Swal.fire("Success", "Logged in successfully!", "success");
      navigate(from, { replace: true });}
       catch (err) {
      Swal.fire("Error", err.message || "Invalid email or password", "error");}
    };

  return (
    <div className="flex justify-center items-center h-[90vh] px-4">
      <motion.form
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border">

        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        
        <div className="mb-5">
          <label className="font-medium">Email</label>

          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-3 border rounded-lg mt-1"/>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}</div>

        
        <div className="mb-5">

          <label className="font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 border rounded-lg mt-1" />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600">

              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">Login </button>

        <p className="mt-5 text-center"> Don't have an account?{" "}

          <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
        </p>
        
      </motion.form>
    </div>
  );
};

export default Login;
