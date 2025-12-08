// src/Dashboard/Admin/MyProfile.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import useAuth from "../../auth/useAuth";
import { useForm } from "react-hook-form";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, watch, formState: { isSubmitting } } = useForm({
    defaultValues: {}
  });

  // Watch profileImage for live preview
  const profileImage = watch("profileImage");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        reset({
          fullName: res.data.fullName || "",
          name: res.data.name || "",
          email: res.data.email || "",
          address: res.data.address || "",
          profileImage: res.data.profileImage || "",
        });
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load profile", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    // run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.put(`/users/${user.email}`, data);
      reset(res.data || data); // update form with latest
      Swal.fire("Success", "Profile updated successfully", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={profileImage || "https://via.placeholder.com/150"}
            alt="Profile Preview"
            className="w-32 h-32 rounded-full object-cover mb-4 border"
          />
          <input
            type="text"
            placeholder="Profile Image URL"
            {...register("profileImage")}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="font-semibold mb-1 block">Full Name</label>
          <input
            type="text"
            {...register("fullName", { required: true })}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Username */}
        <div>
          <label className="font-semibold mb-1 block">Username</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-semibold mb-1 block">Email</label>
          <input
            type="email"
            {...register("email")}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {/* Address */}
        <div>
          <label className="font-semibold mb-1 block">Address</label>
          <textarea
            {...register("address")}
            rows={3}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
