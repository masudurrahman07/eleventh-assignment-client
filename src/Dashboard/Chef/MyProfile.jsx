// src/pages/Dashboard/Chef/MyProfile.jsx
import React, { useEffect, useState } from "react";
import useAuth from "../../auth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import { useForm } from "react-hook-form";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {}
  });

  // Fetch user profile ONCE
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        reset({
          name: res.data.name || "",
          email: res.data.email || "",
          address: res.data.address || "",
          profileImage: res.data.profileImage || "",
        });
      } catch (err) {
        console.error(err);
        setMessage("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    // IMPORTANT: run only once to avoid reset loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    setUpdating(true);
    setMessage("");

    try {
      const res = await axiosSecure.put(`/users/${user.email}`, data);
      reset(res.data || data);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Update failed.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>

      {message && <p className="text-green-600 font-semibold">{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* NAME */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Name</label>
          <input
            {...register("name")}
            type="text"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* EMAIL (read only) */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Email (read-only)
          </label>
          <input
            {...register("email")}
            type="email"
            readOnly
            className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* ADDRESS */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Address</label>
          <input
            {...register("address")}
            type="text"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* PROFILE IMAGE */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Profile Image URL
          </label>
          <input
            {...register("profileImage")}
            type="text"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={updating}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg"
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
