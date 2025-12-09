// src/pages/Dashboard/User/MyOrders.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../auth/useAuth";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // new state: all, pending, delivered
  const [orderStats, setOrderStats] = useState({ total: 0, pending: 0, delivered: 0 });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosSecure.get("/orders/my");
        const ordersData = Array.isArray(res.data) ? res.data : [];
        setOrders(ordersData);

        const pending = ordersData.filter((o) => o.orderStatus === "pending").length;
        const delivered = ordersData.filter((o) => o.orderStatus === "delivered").length;
        setOrderStats({ total: ordersData.length, pending, delivered });
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch orders", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [axiosSecure]);

  const handlePay = (orderId) => {
    navigate(`/dashboard/user/stripe-payment/${orderId}`);
  };

  if (loading) return <Loading />;

  // Filtered orders
  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.orderStatus === filter);

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Orders</h2>

      {/* Order Summary */}
      <div className="grid md:grid-cols-3 gap-6 mb-8 cursor-pointer">
        <div
          onClick={() => setFilter("all")}
          className={`bg-white p-6 rounded-2xl shadow text-center hover:shadow-xl transition ${
            filter === "all" ? "ring-2 ring-green-500" : ""
          }`}
        >
          <p className="text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-gray-800">{orderStats.total}</p>
        </div>
        <div
          onClick={() => setFilter("pending")}
          className={`bg-white p-6 rounded-2xl shadow text-center hover:shadow-xl transition ${
            filter === "pending" ? "ring-2 ring-yellow-500" : ""
          }`}
        >
          <p className="text-gray-500">Pending Orders</p>
          <p className="text-2xl font-bold text-yellow-500">{orderStats.pending}</p>
        </div>
        <div
          onClick={() => setFilter("delivered")}
          className={`bg-white p-6 rounded-2xl shadow text-center hover:shadow-xl transition ${
            filter === "delivered" ? "ring-2 ring-green-500" : ""
          }`}
        >
          <p className="text-gray-500">Delivered Orders</p>
          <p className="text-2xl font-bold text-green-500">{orderStats.delivered}</p>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <p className="text-gray-500 text-center">No {filter} orders found.</p>
      ) : (
        <div className="grid gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-xl transition"
            >
              <div>
                <p><strong>Meal:</strong> {order.mealName}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Price:</strong> ${order.price}</p>
                <p><strong>Status:</strong> {order.orderStatus}</p>
                <p><strong>Payment:</strong> {order.paymentStatus}</p>
              </div>
              {order.orderStatus === "accepted" && order.paymentStatus === "Pending" && (
                <button
                  onClick={() => handlePay(order._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-2xl hover:bg-green-600 transition"
                >
                  Pay
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
