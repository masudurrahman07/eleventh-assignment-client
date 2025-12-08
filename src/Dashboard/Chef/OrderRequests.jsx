// src/pages/Dashboard/Chef/OrderRequests.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import  useAuth  from '../../auth/useAuth';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';

const OrderRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders for this chef
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosSecure.get(`/orders/chef/${user.email}`);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to fetch orders', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [axiosSecure, user.email]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map(o => (o._id === orderId ? res.data : o)));
      Swal.fire('Success', `Order status updated to ${newStatus}`, 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update order status', 'error');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Order Requests</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No order requests yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map(order => {
            const isPending = order.orderStatus === 'pending';
            const isAccepted = order.orderStatus === 'accepted';
            const isDelivered = order.orderStatus === 'delivered';
            const isCancelled = order.orderStatus === 'cancelled';

            return (
              <div key={order._id} className="border rounded p-4 shadow space-y-2">
                <h3 className="text-lg font-bold">{order.mealName}</h3>
                <p><strong>Price:</strong> ${order.price}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Order Status:</strong> {order.orderStatus}</p>
                <p><strong>User Email:</strong> {order.userEmail}</p>
                <p><strong>Order Time:</strong> {new Date(order.orderTime).toLocaleString()}</p>
                <p><strong>User Address:</strong> {order.userAddress}</p>
                <p><strong>Payment Status:</strong> {order.paymentStatus}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(order._id, 'cancelled')}
                    disabled={isCancelled || isDelivered || isAccepted}
                    className={`px-3 py-1 rounded text-white ${isCancelled || isDelivered || isAccepted ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => updateStatus(order._id, 'accepted')}
                    disabled={!isPending}
                    className={`px-3 py-1 rounded text-white ${!isPending ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateStatus(order._id, 'delivered')}
                    disabled={!isAccepted}
                    className={`px-3 py-1 rounded text-white ${!isAccepted ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                  >
                    Deliver
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderRequests;
