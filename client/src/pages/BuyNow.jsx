import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function BuyNow() {
  const [status, setStatus] = useState("");
  const [carts, setCarts] = useState([]);
   const location = useLocation();
   const items = location.state?.items || [];

 
    

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const res = axios.post("http://localhost:3000/api/allUsers/orderProduct", {}, {withCredentials:true})

    } catch (error) {
      console.log(error)
      
    }
  };
  console.log(items)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handlePayment}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Payment Gateway</h2>

        {/* Amount */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amount (PKR)</label>
          <span className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">{}</span>
        </div>

        {/* Card Number */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Card Number</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Expiry + CVV */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-gray-700 mb-2">Expiry</label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 mb-2">CVV</label>
            <input
              type="text"
              placeholder="123"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Name on Card */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Name on Card</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Pay Now
        </button>

        {/* Status */}
        {status && (
          <p className="mt-4 text-center text-green-600 font-medium">
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
