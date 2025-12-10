// src/components/OrderCard.jsx
import React, { useState } from 'react';
import { FaUtensils, FaDollarSign, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(
  'pk_test_51SapLPDjfnmPaFd0rwYIOUj2fSpKIwZOeQEmAJZQScbN9Ynv57TOXxjVdjTZhfV000Q2ZAifPI7pU1RZNP4pcsds00li3lK3FX');

  const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  const displayPaymentStatus = order.paymentStatus || 'Pending';
  const displayOrderStatus = order.orderStatus || 'Pending';

  const isPendingPayment = displayPaymentStatus.toLowerCase() === 'pending';
  const isAccepted = displayOrderStatus.toLowerCase() === 'accepted';

  const chefName = order.chefName || 'N/A';
  const chefId = order.chefId || 'N/A';

  const mealName = order.mealName || order.foodName || 'N/A';
  const deliveryTime = order.estimatedDeliveryTime || 'N/A';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
      <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <FaUtensils className="text-red-500" /> {mealName}</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-700 mb-4">
        <p><span className="font-semibold">Status:</span> {displayOrderStatus}</p>
        <p><span className="font-semibold">Price:</span> ${order.price}</p>

        <p><span className="font-semibold">Quantity:</span> {order.quantity}</p>
        <p><span className="font-semibold">Order Time:</span> {new Date(order.orderTime || order.createdAt).toLocaleString()}</p>
        <p><span className="font-semibold">Chef:</span> {chefName}</p>

        <p><span className="font-semibold">Chef ID:</span> {chefId}</p>
        <p><span className="font-semibold">Chef ID:</span> {chefId}</p>

        <p><span className="font-semibold">Payment Status:</span> {displayPaymentStatus}</p>
        <p><span className="font-semibold">Delivery Time:</span> {deliveryTime}</p>
        
      </div>

      
      {isAccepted && isPendingPayment && !showPayment && (
        <button
          onClick={() => setShowPayment(true)}
          className="mt-2 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition w-full"> Pay Now </button>)}

      
      {showPayment && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              orderId={order._id}
              amount={order.price}
              onPaymentSuccess={() => navigate('/dashboard/payment-success')}/>
          </Elements>
        </div> )}
    </div>
  );
};

export default OrderCard;
