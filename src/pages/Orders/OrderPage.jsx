// src/pages/Orders/OrderPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../auth/useAuth";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import {
  FaShoppingCart,
  FaUser,
  FaUtensils,
  FaDollarSign,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const OrderPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [meal, setMeal] = useState(state?.meal || null);
  const [loading, setLoading] = useState(!meal);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { quantity: 1, userAddress: "" },
  });

  const quantity = watch("quantity");
  const userAddress = watch("userAddress");

  // Fetch Meal
  useEffect(() => {
    if (!user || !token) {
      Swal.fire("Error", "You must be logged in to place an order", "error");
      navigate("/login");
      return;
    }

    if (!meal) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/meals/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setMeal(res.data))
        .catch(() => Swal.fire("Error", "Failed to fetch meal", "error"))
        .finally(() => setLoading(false));
    }
  }, [id, user, token, navigate, meal]);

  // Handle Submit (RHF)
  const onSubmit = async (data) => {
    const qty = parseInt(data.quantity, 10);
    const address = data.userAddress;

    const totalPrice = meal.price * qty;

    const confirm = await Swal.fire({
      title: `Your total price is $${totalPrice}.`,
      text: "Do you want to confirm the order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
      cancelButtonText: "Cancel",
      customClass: { popup: "rounded-3xl shadow-xl p-6" },
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.post(
        "http://localhost:3000/orders",
        {
          foodId: meal._id,
          mealName: meal.foodName,
          price: meal.price,
          quantity: qty,
          chefId: meal.chefId,
          userEmail: user.email,
          userAddress: address,
          orderStatus: "pending",
          paymentStatus: "Pending",
          orderTime: new Date().toISOString(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Success", "Order placed successfully!", "success").then(() => {
        navigate("/dashboard/user/orders");
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to place order", "error");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-10">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
        Confirm Your Order
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Order Details Cards */}
        <div className="space-y-4">
          {[
            { icon: <FaUtensils className="text-green-500" />, label: "Meal Name", value: meal.foodName },
            { icon: <FaDollarSign className="text-green-500" />, label: "Price", value: `$${meal.price}` },
            { icon: <FaShoppingCart className="text-green-500" />, label: "Quantity", input: true },
            {
              icon: <FaDollarSign className="text-green-500" />,
              label: "Total",
              value: `$${meal.price * parseInt(quantity, 10)}`,
            },
            { icon: <FaUser className="text-green-500" />, label: "Chef ID", value: meal.chefId },
            { icon: <FaEnvelope className="text-green-500" />, label: "User Email", value: user.email },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-3xl p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-4 hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-gray-500 font-medium">{item.label}:</span>
              </div>

              {item.input ? (
                <div className="flex flex-col w-full md:w-32">
                  <input
                    type="number"
                    {...register("quantity", {
                      required: "Quantity is required",
                      min: { value: 1, message: "Minimum quantity is 1" },
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
                  )}
                </div>
              ) : (
                <span className="text-gray-900 font-semibold">{item.value}</span>
              )}
            </div>
          ))}
        </div>

        {/* Delivery Address */}
        <div className="bg-white shadow-lg rounded-3xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaMapMarkerAlt className="text-green-500" />
            <label className="block text-gray-700 font-semibold">Delivery Address</label>
          </div>

          <textarea
            {...register("userAddress", {
              required: "Delivery address is required",
            })}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
            rows="4"
            placeholder="Enter your delivery address"
          />
          {errors.userAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.userAddress.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white font-bold rounded-2xl shadow-lg hover:bg-green-600 transition"
        >
          Confirm & Place Order (${meal.price * parseInt(quantity, 10)})
        </button>
      </form>
    </div>
  );
};

export default OrderPage;
