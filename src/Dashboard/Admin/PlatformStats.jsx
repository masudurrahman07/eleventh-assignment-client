// src/pages/Dashboard/Admin/PlatformStats.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { FaUsers, FaMoneyBillWave, FaShoppingCart, FaCheckCircle } from 'react-icons/fa';

const PlatformStats = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!axiosSecure) return;
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const res = await axiosSecure.get('/admin/dashboard');
        const orders = await axiosSecure.get('/orders/my');
        const totalPayments = orders.data.reduce((sum, o) => sum + Number(o.price || 0), 0);

        if (isMounted) {
          setStats({ ...res.data, totalPayments });
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStats();
    return () => { isMounted = false; };
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
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Platform Statistics</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 hover:shadow-2xl transition">
          <FaMoneyBillWave className="text-green-500 text-3xl" />
          <div>
            <p className="text-gray-500">Total Payments</p>
            <p className="text-xl font-bold text-green-600">{stats.totalPayments}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 hover:shadow-2xl transition">
          <FaUsers className="text-blue-500 text-3xl" />
          <div>
            <p className="text-gray-500">Total Users</p>
            <p className="text-xl font-bold text-blue-600">{stats.totalUsers}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 hover:shadow-2xl transition">
          <FaShoppingCart className="text-yellow-500 text-3xl" />
          <div>
            <p className="text-gray-500">Pending Orders</p>
            <p className="text-xl font-bold text-yellow-600">{stats.pendingOrders}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 hover:shadow-2xl transition">
          <FaCheckCircle className="text-green-400 text-3xl" />
          <div>
            <p className="text-gray-500">Delivered Orders</p>
            <p className="text-xl font-bold text-green-700">{stats.deliveredOrders}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition">
        <h3 className="text-lg font-bold mb-4 text-gray-700">Visual Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3182ce" barSize={40} radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PlatformStats;
