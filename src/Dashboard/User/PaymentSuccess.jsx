
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6">

      <FaCheckCircle className="text-green-500 text-7xl" />
      <h2 className="text-3xl font-bold">Payment Successful!</h2>
      <p className="text-gray-600">Thank you for your order. Your payment has been received.</p>
      <button
        onClick={() => navigate('/dashboard/user/orders')}
        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">Back to My Orders </button>
    </div>)};

export default PaymentSuccess;
