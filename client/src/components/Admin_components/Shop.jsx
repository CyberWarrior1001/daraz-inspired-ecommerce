import axios from "axios";
import React, { useEffect, useState } from "react";
import DefaultProfilePic from '../../images/defaultprofilepic.jpg'
import DefaultBanner from '../../images/DefaultBanner.jpeg'
import { PencilIcon, ShipIcon } from "lucide-react";

function GotoShop({shop}) {
  console.log(shop)

  // It will formate our number
  const formatNumber = (num) => {
    if (num >= 10000000) return (num / 10000000).toFixed(1) + " Cr";
    if (num >= 100000) return (num / 100000).toFixed(1) + " Lakh";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num;
  };

  useEffect(() => {
    const getStore = async () => {
      const res = await axios.get("http://loclahost:3000/api/admin/getShop", {
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        setShop(res.data);
      }
    };
    getStore();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* ================= Banner ================= */}
      <div className="relative w-full h-[30vh] sm:h-[35vh] md:h-[40vh]">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={shop?.store.banner || DefaultBanner}
          alt="Shop Banner"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Logo */}
        <div
          className="
          absolute
          -bottom-12 sm:-bottom-14 md:-bottom-18
          left-1/2 -translate-x-1/2 sm:left-10 sm:translate-x-0
          w-30 h-30 sm:w-32 sm:h-32 md:w-40 md:h-40
          rounded-full border-4 border-white bg-white
          overflow-hidden shadow-xl 
        "
        >
          <img
            src={shop?.store.logo || DefaultProfilePic}
            alt="Shop Logo"
            className="w-full h-full object-cover "
          />
        <div className="group absolute text-white inset-0 w-full h-full flex justify-center items-center hover:bg-black/50 ">

          <PencilIcon size={34}  className="hidden group-hover:block"/>
        </div>
        
        </div>
      </div>

      {/* ================= Shop Info ================= */}
      <div className="mt-20 sm:mt-24 md:mt-32 px-4 sm:px-8 md:px-14">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
            {shop?.store.storeName}
          </h1>

          <p className="mt-3 text-gray-600 text-center sm:text-left max-w-3xl">
            {shop?.store.description}
          </p>

          {/* ================= Owner Info ================= */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:items-center">
            <span className="font-semibold text-gray-700">Owner:</span>
            <span className="text-gray-600">{shop?.store.owner.name}</span>
          </div>

          <div className="mt-2 text-gray-600">📍 {shop?.store.owner.address}</div>

          {/* ================= Stats ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-center">
            {/* Revenue */}
            <div className="bg-gray-100 rounded-xl p-4">
              <h2 className="text-2xl font-bold text-green-600">
                Rs {formatNumber(500000)}
              </h2>
              <p className="text-sm text-gray-600">Revenue</p>
            </div>

            {/* Orders */}
            <div className="bg-gray-100 rounded-xl p-4">
              <h2 className="text-2xl font-bold text-blue-600">
                {formatNumber(1240)}
              </h2>
              <p className="text-sm text-gray-600">Orders</p>
            </div>

            {/* Messages */}
            <div className="bg-gray-100 rounded-xl p-4">
              <h2 className="text-2xl font-bold text-purple-600">
                {formatNumber(320)}
              </h2>
              <p className="text-sm text-gray-600">Messages</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default GotoShop;
