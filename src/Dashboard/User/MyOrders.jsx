// src/pages/Dashboard/User/MyOrders.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useAuth } from '../../../auth/useAuth';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import OrderCard from '../../../components/OrderCard';

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosSecure.get(`/orders/my`); // backend should filter by user email
        setOrders(res.data);
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
    <div className="max-w-5xl mx-auto py-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map(order => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
