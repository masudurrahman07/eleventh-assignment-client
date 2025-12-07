// src/pages/Dashboard/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../src/hooks/useAxiosSecure';
import Loading from '../../../src/components/Loading';

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axiosSecure.get('/admin/dashboard');
        setAdminData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, [axiosSecure]);

  if (loading) return <Loading />;

  if (!adminData) return <p className="text-center text-gray-500">No data available.</p>;

  return (
    <div className="max-w-7xl mx-auto py-6 space-y-6">
      <h2 className="text-2xl font-bold">Welcome, {adminData.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="p-4 bg-white rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{adminData.totalUsers}</p>
        </div>
        <div className="p-4 bg-white rounded shadow text-center">
          <h3 className="text-lg font-semibold">Pending Orders</h3>
          <p className="text-2xl font-bold">{adminData.pendingOrders}</p>
        </div>
        <div className="p-4 bg-white rounded shadow text-center">
          <h3 className="text-lg font-semibold">Delivered Orders</h3>
          <p className="text-2xl font-bold">{adminData.deliveredOrders}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
