// src/pages/Dashboard/Chef/ChefDashboard.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../src/hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';

const ChefDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [chefData, setChefData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChefData = async () => {
      try {
        const res = await axiosSecure.get('/chef/dashboard');
        setChefData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChefData();
  }, [axiosSecure]);

  if (loading) return <Loading />;

  if (!chefData) return <p className="text-center text-gray-500">No data available.</p>;

  return (
    <div className="max-w-7xl mx-auto py-6 space-y-6">
      <h2 className="text-2xl font-bold">Welcome, {chefData.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="p-4 bg-white rounded shadow text-center">
          <h3 className="text-lg font-semibold">My Meals</h3>
          <p className="text-2xl font-bold">{chefData.totalMeals}</p>
          <Link to="/dashboard/chef/my-meals" className="text-blue-500 mt-2 inline-block">View Meals</Link>
        </div>

        <div className="p-4 bg-white rounded shadow text-center">
          <h3 className="text-lg font-semibold">Order Requests</h3>
          <p className="text-2xl font-bold">{chefData.orderRequests}</p>
          <Link to="/dashboard/chef/order-requests" className="text-blue-500 mt-2 inline-block">View Orders</Link>
        </div>

        <div className="p-4 bg-white rounded shadow text-center">
          <h3 className="text-lg font-semibold">Profile</h3>
          <p className="text-2xl font-bold">{chefData.name}</p>
          <Link to="/dashboard/chef/profile" className="text-blue-500 mt-2 inline-block">Edit Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;
