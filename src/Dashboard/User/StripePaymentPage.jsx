// src/Dashboard/User/StripePaymentPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "../../auth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const stripePromise = loadStripe("pk_test_51SapLPDjfnmPaFd0rwYIOUj2fSpKIwZOeQEmAJZQScbN9Ynv57TOXxjVdjTZhfV000Q2ZAifPI7pU1RZNP4pcsds00li3lK3FX");

const CheckoutForm = ({ order, token }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const totalPrice = order.price * order.quantity;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const confirm = await Swal.fire({
      title: `Your total payment is $${totalPrice}.`,
      text: "Do you want to proceed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, pay now",
      cancelButtonText: "Cancel",
      customClass: { popup: "rounded-3xl shadow-xl p-6" },
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch("http://localhost:3000/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Math.round(totalPrice * 100) }),
      });

      const data = await res.json();
      const clientSecret = data.clientSecret;

      const card = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (error) {
        Swal.fire("Payment Error", error.message, "error");
        return;
      }

      if (paymentIntent.status === "succeeded") {
        await fetch(`http://localhost:3000/orders/${order._id}/pay`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paymentStatus: "Paid",
            paymentTime: new Date().toISOString(),
            transactionId: paymentIntent.id,
          }),
        });

        Swal.fire("Success", "Payment completed successfully!", "success").then(() => {
          navigate("/dashboard/user/payment-success");
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment failed", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-xl rounded-3xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
      <p className="text-gray-600">Meal: {order.mealName}</p>
      <p className="text-gray-600">Quantity: {order.quantity}</p>
      <p className="text-gray-600 font-semibold">Total: ${totalPrice}</p>
      <CardElement className="p-4 border border-gray-300 rounded-2xl bg-gray-50" />
      <button type="submit" disabled={!stripe} className="w-full py-3 bg-green-500 text-white font-bold rounded-2xl shadow-lg hover:bg-green-600 transition">
        Pay ${totalPrice}
      </button>
    </form>
  );
};

const StripePaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !token) {
      Swal.fire("Error", "You must be logged in", "error");
      navigate("/login");
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await axiosSecure.get("/orders/my");
        const foundOrder = res.data.find((o) => o._id === orderId);

        if (!foundOrder) {
          Swal.fire("Error", "Order not found", "error");
          navigate("/dashboard/user/orders");
          return;
        }

        if (foundOrder.paymentStatus === "Paid") {
          Swal.fire("Info", "This order is already paid", "info");
          navigate("/dashboard/user/orders");
          return;
        }

        if (foundOrder.orderStatus !== "accepted") {
          Swal.fire("Info", "Order has not been accepted by the chef yet", "info");
          navigate("/dashboard/user/orders");
          return;
        }

        setOrder(foundOrder);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch order", "error");
        navigate("/dashboard/user/orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, user, token, navigate]); // axiosSecure excluded

  if (loading) return <Loading />;

  return order ? (
    <Elements stripe={stripePromise}>
      <CheckoutForm order={order} token={token} />
    </Elements>
  ) : null;
};

export default StripePaymentPage;
