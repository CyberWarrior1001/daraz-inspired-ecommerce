import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const sampleOrder = {
  id: "ORD-1001",
  date: "2026-01-20",
  status: "Pending",
  customer: {
    name: "Ali Khan",
    phone: "0301-1234567",
    email: "ali@gmail.com",
  },
  shipping: {
    address: "House 12, Street 4",
    city: "Mardan",
    country: "Pakistan",
  },
  items: [
    {
      id: 1,
      name: "Smart Watch",
      price: 2500,
      quantity: 2,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      price: 3200,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
  ],
};

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(sampleOrder);

  const updateStatus = (status) => {
    setOrder({ ...order, status });
  };

  const statusColor = () => {
    switch (order.status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingFee = 300;
  const total = subtotal + shippingFee;

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:w-[75%] md:left-[25%] md:absolute text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:underline"
        >
          ← Back to Orders
        </button>
      </div>

      {/* Order Info */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-gray-500 text-sm">Order ID</p>
          <p className="font-semibold">{order.id}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Order Date</p>
          <p className="font-semibold">{order.date}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Status</p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor()}`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Customer & Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold mb-3">Customer Info</h2>
          <p>{order.customer.name}</p>
          <p className="text-sm text-gray-600">{order.customer.email}</p>
          <p className="text-sm text-gray-600">{order.customer.phone}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold mb-3">Shipping Address</h2>
          <p>{order.shipping.address}</p>
          <p>{order.shipping.city}</p>
          <p>{order.shipping.country}</p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="font-bold mb-4">Ordered Products</h2>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4 last:border-b-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Rs {item.price} × {item.quantity}
                </p>
              </div>
              <p className="font-semibold">
                Rs {item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary & Status Update */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold mb-3">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>Rs {subtotal}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Rs {shippingFee}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>Rs {total}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold mb-3">Update Order Status</h2>
          <select
            value={order.status}
            onChange={(e) => updateStatus(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
