
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const MyOrders = () => {
  const { user, token } = useAuth();
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
      <div className="text-center mt-10 text-gray-500"> You have no orders yet. </div>
    );}

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {orders.map((order) => (

        <div
          key={order._id}
          className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row md:justify-between md:items-center">

          <div className="space-y-1">
            <p><span className="font-semibold">Meal:</span> {order.mealName || order.foodName || "N/A"}</p>
            <p><span className="font-semibold">Quantity:</span> {order.quantity}</p>

            <p><span className="font-semibold">Price:</span> ${order.price}</p>
            <p><span className="font-semibold">Total:</span> ${order.price * order.quantity}</p>

            <p><span className="font-semibold">Chef:</span> {order.chefName}</p>
            <p><span className="font-semibold">Chef ID:</span> {order.chefId}</p>

            <p><span className="font-semibold">Delivery Time:</span> {order.estimatedDeliveryTime || "N/A"}</p>
            <p><span className="font-semibold">Order Status:</span> {order.orderStatus}</p>

            <p><span className="font-semibold">Payment Status:</span> {order.paymentStatus}</p>

          </div>

          {order.orderStatus.toLowerCase() === "accepted" && order.paymentStatus.toLowerCase() === "pending" && (
            <button
              onClick={() => navigate(`/dashboard/user/pay/${order._id}`)}
              className="mt-4 md:mt-0 px-6 py-2 bg-green-500 text-white rounded-2xl shadow hover:bg-green-600 transition">Pay Now</button>)}
        </div>))}
    </div>
  );
};

export default MyOrders;
