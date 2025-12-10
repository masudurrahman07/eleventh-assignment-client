
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import axios from 'axios';


const CheckoutForm = ({ orderId, amount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
    
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
        amount: Math.round(amount * 100), }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,},
        });

      const clientSecret = data.clientSecret;

      
      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {payment_method: { card: cardElement },
      });

      if (paymentResult.error) {
        Swal.fire('Payment Failed', paymentResult.error.message, 'error');
        setLoading(false);
        return;}

      if (paymentResult.paymentIntent.status === 'succeeded') {
        
        await axios.patch(`${import.meta.env.VITE_API_URL}/orders/${orderId}/pay`, {
          paymentStatus: 'paid',}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },});

        Swal.fire('Payment Successful', 'Your order has been paid.', 'success');
        onPaymentSuccess();}} 
        catch (err) {
      console.error(err);
      Swal.fire('Error', 'Something went wrong with the payment.', 'error');} 
      finally {
      setLoading(false);
      }};

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg mt-4 bg-gray-50">

      <CardElement className="p-2 border rounded mb-4" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
        {loading ? 'Processing...' : `Pay $${amount}`}</button>
    </form>
  );
};

export default CheckoutForm;
