// src/pages/Dashboard/Chef/OrderRequests.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../auth/useAuth";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  delivered: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
};

const OrderRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
       const res = await axiosSecure.get('/orders/chef'); // no email param
setOrders(res.data);
      } catch (err) {
        Swal.fire("Error", "Failed to fetch orders", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [axiosSecure, user.email]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/orders/${orderId}/status`, {
        status: newStatus,
      });
      setOrders(orders.map((o) => (o._id === orderId ? res.data : o)));
      Swal.fire("Success", `Order updated to ${newStatus}`, "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
        Order Requests
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders yet.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {orders.map((order) => {
            const status = order.orderStatus;
            const isPending = status === "pending";
            const isAccepted = status === "accepted";

            return (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 flex flex-col"
              >
                {/* Gradient header */}
                <div className="px-6 py-4 bg-linear-to-r from-emerald-400 to-teal-500 text-white">
                  <h3 className="text-xl font-bold">{order.mealName}</h3>
                  <span
                    className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[status]}`}
                  >
                    {status.toUpperCase()}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  {/* Order details */}
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <strong>Price:</strong> ${order.price}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {order.quantity}
                    </p>
                    <p>
                      <strong>User Email:</strong> {order.userEmail}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.userAddress}
                    </p>
                    <p>
                      <strong>Payment:</strong> {order.paymentStatus}
                    </p>
                    <p>
                      <strong>Order Time:</strong>{" "}
                      {new Date(order.orderTime).toLocaleString()}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 mt-6">
                    <button
                      onClick={() => updateStatus(order._id, "cancelled")}
                      disabled={!isPending}
                      className={`flex-1 py-2 rounded-xl font-semibold text-white transition ${
                        !isPending
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => updateStatus(order._id, "accepted")}
                      disabled={!isPending}
                      className={`flex-1 py-2 rounded-xl font-semibold text-white transition ${
                        !isPending
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => updateStatus(order._id, "delivered")}
                      disabled={!isAccepted}
                      className={`flex-1 py-2 rounded-xl font-semibold text-white transition ${
                        !isAccepted
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      Deliver
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderRequests;
