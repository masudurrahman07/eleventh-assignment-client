
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useTheme } from '../../contexts/ThemeContext';
import Loading from '../../components/Loading';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { FaUsers, FaMoneyBillWave, FaShoppingCart, FaCheckCircle } from 'react-icons/fa';


const PlatformStats = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!axiosSecure) return;
    let isMounted = true;

    const fetchStats = async () => {
      try {
        
        const res = await axiosSecure.get('/admin/dashboard');

      
        const paymentRes = await axiosSecure.get('/admin/payments');
        const totalPayments = paymentRes.data.totalPayments || 0;

        if (isMounted) {
          setStats({
            ...res.data,
            totalPayments,});} }
             catch (err) {
        console.error("ADMIN STATS ERROR:", err);}
         finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, [axiosSecure]);

  if (loading) return <Loading />;

  if (!stats) return (
    <p 
      className="text-center"
      style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
      No data available.
    </p>
  );

  const chartData = [
    { name: 'Payments', value: stats.totalPayments },
    { name: 'Users', value: stats.totalUsers },
    { name: 'Pending Orders', value: stats.pendingOrders },
    { name: 'Delivered Orders', value: stats.deliveredOrders },];

  const statCards = [
    {
      title: 'Total Payments',
      value: `$${stats.totalPayments.toLocaleString()}`,
      icon: <FaMoneyBillWave className="text-green-500 text-3xl" />,
      color: 'text-green-600',
    },

    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <FaUsers className="text-blue-500 text-3xl" />,
      color: 'text-blue-600',
    },

    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: <FaShoppingCart className="text-yellow-500 text-3xl" />,
      color: 'text-yellow-600',
    },

    {
      title: 'Delivered Orders',
      value: stats.deliveredOrders,
      icon: <FaCheckCircle className="text-green-400 text-3xl" />,
      color: 'text-green-700',
    },];

  return (
    <div 
      className="min-h-screen py-6 px-4"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
        color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
      }}>
      <div className="max-w-7xl mx-auto space-y-6">
        <h2 
          className="text-3xl font-bold mb-4 text-center md:text-left"
          style={{ color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}>
          Platform Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {statCards.map((card, idx) => (
            <div
              key={idx}
              className="shadow-lg rounded-xl p-5 flex items-center gap-4 hover:shadow-2xl transition transform hover:-translate-y-1"
              style={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                border: theme === 'dark' ? '1px solid #374151' : 'none'
              }} >
              {card.icon}
              <div>
                <p 
                  className="font-medium"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                  {card.title}
                </p>
                <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        
        <div 
          className="shadow-lg rounded-xl p-5 hover:shadow-2xl transition overflow-x-auto"
          style={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            border: theme === 'dark' ? '1px solid #374151' : 'none'
          }}>
          <h3 
            className="text-lg font-bold mb-4"
            style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
            Visual Overview
          </h3>
          <div className="w-full" style={{ minWidth: '300px' }}>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: theme === 'dark' ? '#d1d5db' : '#6b7280' }}/>
                <YAxis 
                  tick={{ fill: theme === 'dark' ? '#d1d5db' : '#6b7280' }}/>
                <Tooltip 
                  formatter={(v) => v.toLocaleString()}
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                    border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb',
                    borderRadius: '8px',
                    color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
                  }} />
                <Bar
                  dataKey="value"
                  fill="#3182ce"
                  barSize={40}
                  radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformStats;
