// src/components/OrderCard.jsx
import React from 'react';
import { FaUserTie, FaDollarSign, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const OrderCard = ({ order, onCancel, onAccept, onDeliver }) => {
  // Helper to determine badge color based on status
  const statusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const paymentColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-50 text-yellow-700';
      case 'paid': return 'bg-green-50 text-green-700';
      case 'failed': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{order.mealName}</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(order.orderStatus)}`}>
          {order.orderStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <FaUserTie className="text-gray-500" />
          <span className="text-gray-700">{order.chefName} (ID: {order.chefId})</span>
        </div>
        <div className="flex items-center gap-2">
          <FaDollarSign className="text-gray-500" />
          <span className="text-gray-700">${order.price} x {order.quantity} = <strong>${order.price * order.quantity}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-gray-500" />
          <span className="text-gray-700">{new Date(order.orderTime).toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-gray-500" />
          <span className="text-gray-700">{order.userAddress}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentColor(order.paymentStatus)}`}>
          Payment: {order.paymentStatus}
        </span>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700">
          User: {order.userEmail}
        </span>
      </div>

      <div className="flex flex-wrap gap-3 mt-2">
        <button
          onClick={() => onCancel(order._id)}
          disabled={order.orderStatus !== 'pending'}
          className={`px-4 py-2 rounded-xl text-white font-semibold transition-colors duration-200 
            ${order.orderStatus !== 'pending' ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-400'}`}
        >
          Cancel
        </button>
        <button
          onClick={() => onAccept(order._id)}
          disabled={order.orderStatus !== 'pending'}
          className={`px-4 py-2 rounded-xl text-white font-semibold transition-colors duration-200
            ${order.orderStatus !== 'pending' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400'}`}
        >
          Accept
        </button>
        <button
          onClick={() => onDeliver(order._id)}
          disabled={order.orderStatus !== 'accepted'}
          className={`px-4 py-2 rounded-xl text-white font-semibold transition-colors duration-200
            ${order.orderStatus !== 'accepted' ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-400'}`}
        >
          Deliver
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
