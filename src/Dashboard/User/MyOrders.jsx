
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useTheme } from "../../contexts/ThemeContext";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const MyOrders = () => {
  const { user, token } = useAuth();
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !token) {
      Swal.fire("Error", "You must be logged in", "error");
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axiosSecure.get("/orders/my");
        setOrders(res.data);}
         catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch orders", "error");}
         finally {
        setLoading(false);}};

    fetchOrders();

  }, [user, token, navigate]);

  if (loading) return <Loading />;

  if (!orders.length) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
          color: theme === 'dark' ? '#9ca3af' : '#6b7280'
        }}>
        <div className="text-center">
          <p className="text-xl">You have no orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-6 px-4"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
        color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
      }} >
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 
          className="text-3xl font-bold text-center mb-8"
          style={{ color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}>
          My Orders
        </h2>

        {orders.map((order) => (
          <div
            key={order._id}
            className="shadow-lg rounded-lg p-6 flex flex-col md:flex-row md:justify-between md:items-center"
            style={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              border: theme === 'dark' ? '1px solid #374151' : 'none'
            }}>
            <div className="space-y-1">
              <p style={{ color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                <span className="font-semibold">Meal:</span> {order.mealName || order.foodName || "Meal information unavailable"}
              </p>
              <p style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                <span className="font-semibold">Quantity:</span> {order.quantity}
              </p>
              <p style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                <span className="font-semibold">Price:</span> ${order.price}
              </p>
              <p style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                <span className="font-semibold">Total:</span> ${order.price * order.quantity}
              </p>
              <p style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                <span className="font-semibold">Chef:</span> {order.chefName}
              </p>
              <p style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                <span className="font-semibold">Chef ID:</span> {order.chefId}
              </p>
              <p style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                <span className="font-semibold">Delivery Time:</span> {order.estimatedDeliveryTime || "To be confirmed"}
              </p>
              <p style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                <span className="font-semibold">Order Status:</span> {order.orderStatus}
              </p>
              <p style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                <span className="font-semibold">Payment Status:</span> {order.paymentStatus}
              </p>
            </div>

            {order.orderStatus.toLowerCase() === "accepted" && order.paymentStatus.toLowerCase() === "pending" && (
              <button
                onClick={() => navigate(`/dashboard/user/pay/${order._id}`)}
                className="mt-4 md:mt-0 px-6 py-2 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition">
                Pay Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
