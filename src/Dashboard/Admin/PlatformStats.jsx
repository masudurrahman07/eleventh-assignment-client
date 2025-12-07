// src/pages/Dashboard/Admin/PlatformStats.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const PlatformStats = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosSecure.get('/dashboard/stats');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [axiosSecure]);

  if (loading) return <Loading />;

  if (!stats) return <p className="text-center text-gray-500">No data available.</p>;

  const chartData = [
    { name: 'Payments', value: stats.totalPayments },
    { name: 'Users', value: stats.totalUsers },
    { name: 'Pending Orders', value: stats.pendingOrders },
    { name: 'Delivered Orders', value: stats.deliveredOrders },
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Platform Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-bold mb-2">Total Numbers</h3>
          <ul className="space-y-2 text-gray-700">
            <li>Total Payments: <span className="font-semibold">{stats.totalPayments}</span></li>
            <li>Total Users: <span className="font-semibold">{stats.totalUsers}</span></li>
            <li>Pending Orders: <span className="font-semibold">{stats.pendingOrders}</span></li>
            <li>Delivered Orders: <span className="font-semibold">{stats.deliveredOrders}</span></li>
          </ul>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-bold mb-2">Visual Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3182ce" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PlatformStats;
