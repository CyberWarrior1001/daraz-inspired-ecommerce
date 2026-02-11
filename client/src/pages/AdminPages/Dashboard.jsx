import useUIStore from "@/store/uiStore";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const salesData = [
  { name: "Mon", sales: 12000 },
  { name: "Tue", sales: 18000 },
  { name: "Wed", sales: 10000 },
  { name: "Thu", sales: 22000 },
  { name: "Fri", sales: 30000 },
  { name: "Sat", sales: 26000 },
  { name: "Sun", sales: 35000 },
];

const formatNumber = (num) => {
  if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num;
};

function Dashboard() {
  const uid = useUIStore((state) => state.uid)
  const stroeSlug = useUIStore((state) => state.stroeSlug)
    const navigate = useNavigate()
  return (
    <div className="relative min-h-screen bg-gray-100 p-6 md:w-[75%] md:left-[25%] text-gray-800">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>

        <button onClick={()=>{navigate(`/admin/${uid}/${stroeSlug}/dashboard/addproduct`)}} className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg shadow">
          ➕ Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Revenue</p>
          <h2 className="text-2xl font-bold mt-1">
            Rs {formatNumber(520000)}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Orders</p>
          <h2 className="text-2xl font-bold mt-1">
            {formatNumber(1350)}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Messages</p>
          <h2 className="text-2xl font-bold mt-1">
            {formatNumber(98)}
          </h2>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="font-semibold mb-4">Sales Overview</h2>

        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#f97316"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold mb-2">Manage Products</h3>
          <p className="text-sm text-gray-500 mb-4">
            Add, edit or delete your products
          </p>
          <button onClick={()=>{navigate(`/admin/${uid}/${stroeSlug}/dashboard/product`)}} className="text-orange-500 font-semibold">
            Go to Products →
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold mb-2">View Orders</h3>
          <p className="text-sm text-gray-500 mb-4">
            Track and manage customer orders
          </p>
          <button onClick={()=>{navigate(`/admin/${uid}/${stroeSlug}/dashboard/orders`)}} className="text-orange-500 font-semibold">
            View Orders →
          </button>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
