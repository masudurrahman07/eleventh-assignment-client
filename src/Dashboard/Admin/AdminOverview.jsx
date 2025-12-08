// src/pages/Dashboard/Admin/AdminOverview.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import { FaUsers, FaClipboardList, FaCheckCircle } from 'react-icons/fa';

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosSecure.get('/admin/dashboard');
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
  if (!stats) return <p className="text-red-500">Failed to load stats.</p>;

  const cards = [
    { title: 'Total Users', value: stats.totalUsers, icon: <FaUsers size={28} />, color: 'bg-blue-500' },
    { title: 'Pending Orders', value: stats.pendingOrders, icon: <FaClipboardList size={28} />, color: 'bg-yellow-500' },
    { title: 'Delivered Orders', value: stats.deliveredOrders, icon: <FaCheckCircle size={28} />, color: 'bg-green-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, {stats.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className={`flex items-center p-6 rounded-lg shadow-lg text-white ${card.color}`}>
            <div className="mr-4">{card.icon}</div>
            <div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-sm">{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
