import useUIStore from "@/store/uiStore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sampleOrders = [
  {
    id: "ORD-1001",
    customer: "Ali Khan",
    phone: "0301-1234567",
    total: 5400,
    status: "Pending",
    date: "2026-01-20",
  },
  {
    id: "ORD-1002",
    customer: "Ayesha Noor",
    phone: "0312-9876543",
    total: 12999,
    status: "Shipped",
    date: "2026-01-21",
  },
  {
    id: "ORD-1003",
    customer: "Usman Ahmad",
    phone: "0333-5558899",
    total: 3200,
    status: "Delivered",
    date: "2026-01-22",
  },
];

function ViewOrders() {
  const uid = useUIStore((state) => state.uid)
  const stroeSlug = useUIStore((state) => state.stroeSlug)
    const navigate = useNavigate()
  const [orders, setOrders] = useState(sampleOrders);

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const statusColor = (status) => {
    switch (status) {
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

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:w-[75%] md:left-[25%] md:absolute text-gray-800">
      <h1 className="text-3xl font-bold mb-6">📦 Orders</h1>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Total</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.phone}</td>
                <td className="p-4 font-semibold">Rs {order.total}</td>
                <td className="p-4">{order.date}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2 justify-center">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-xs"
                  >
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>

                  <button onClick={()=>{navigate(`/admin/${uid}/${stroeSlug}/dashboard/orders/details`)}} className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewOrders;
