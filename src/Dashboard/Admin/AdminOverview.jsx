
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import { FaUsers, FaClipboardList, FaCheckCircle } from 'react-icons/fa';

const AdminOverview = () => {
  const { theme } = useTheme();
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

  if (!stats) 
    return (
      <p 
        className="text-center mt-6"
        style={{ color: theme === 'dark' ? '#fca5a5' : '#dc2626' }}>
        Failed to load stats.
      </p>
    );

  const cards = [
    { title: 'Total Users', value: stats.totalUsers, icon: <FaUsers size={28} />, color: 'bg-blue-500' },
    { title: 'Pending Orders', value: stats.pendingOrders, icon: <FaClipboardList size={28} />, color: 'bg-yellow-500' },
    { title: 'Delivered Orders', value: stats.deliveredOrders, icon: <FaCheckCircle size={28} />, color: 'bg-green-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1 
        className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left"
        style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}>
        Welcome, {stats.name}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`flex flex-col sm:flex-row items-center sm:items-start p-6 rounded-lg shadow-lg text-white ${card.color} transition-transform hover:scale-105`}>
            <div className="mb-3 sm:mb-0 sm:mr-4 shrink-0">{card.icon}</div>

            <div className="text-center sm:text-left">
              <p className="text-2xl sm:text-3xl font-bold">{card.value}</p>
              <p className="text-sm sm:text-base">{card.title}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
