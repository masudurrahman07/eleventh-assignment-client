// src/pages/Dashboard/User/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure(); // secure axios instance
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Example API: get all orders of logged-in user
        const res = await axiosSecure.get('/orders/my'); 
        const orders = res.data;

        const pending = orders.filter(o => o.orderStatus === 'pending').length;
        const delivered = orders.filter(o => o.orderStatus === 'delivered').length;

        setUserStats({ totalOrders: orders.length, pending, delivered });
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to fetch your orders', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [axiosSecure]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Total Orders</p>
          <p className="text-xl font-semibold">{userStats.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Pending Orders</p>
          <p className="text-xl font-semibold">{userStats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Delivered Orders</p>
          <p className="text-xl font-semibold">{userStats.delivered}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
