// src/pages/Dashboard/User/MyOrders.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../auth/useAuth';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import OrderCard from '../../components/OrderCard';

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderStats, setOrderStats] = useState({ total: 0, pending: 0, delivered: 0 });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosSecure.get('/orders/my');
        const ordersData = Array.isArray(res.data) ? res.data : [];
        setOrders(ordersData);

        const pending = ordersData.filter(o => o.orderStatus === 'pending').length;
        const delivered = ordersData.filter(o => o.orderStatus === 'delivered').length;
        setOrderStats({ total: ordersData.length, pending, delivered });
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to fetch orders', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [axiosSecure]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Orders</h2>

      {/* Order Summary */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow text-center hover:shadow-xl transition">
          <p className="text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-gray-800">{orderStats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center hover:shadow-xl transition">
          <p className="text-gray-500">Pending Orders</p>
          <p className="text-2xl font-bold text-yellow-500">{orderStats.pending}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center hover:shadow-xl transition">
          <p className="text-gray-500">Delivered Orders</p>
          <p className="text-2xl font-bold text-green-500">{orderStats.delivered}</p>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">You have no orders yet.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map(order => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
