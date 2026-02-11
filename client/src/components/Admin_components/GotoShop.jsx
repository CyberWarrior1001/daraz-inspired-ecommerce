import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function GotoShop({store}) {
  const {slug} = useParams()
  const navigate = useNavigate()
    
    
    
  return (
    <div className="w-full min-h-screen bg-gray-50 ">
      
      {/* ================= Banner ================= */}
      <div className="relative w-full h-[30vh] sm:h-[35vh] md:h-[40vh]">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={store?.banner}
          alt="Shop Banner"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Logo */}
        <div className="
          absolute 
          -bottom-12 sm:-bottom-14 md:-bottom-18
          left-1/2 -translate-x-1/2 sm:left-10 sm:translate-x-0
          w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40
          rounded-full border-4 border-white bg-white
          overflow-hidden shadow-xl
        ">
          <img
            src={store?.logo}
            alt="Shop Logo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ================= Shop Info ================= */}
      <div className="mt-20 sm:mt-24 md:mt-32 px-4 sm:px-8 md:px-14">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">

          <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
            {store?.storeName}
          </h1>

          <p className="mt-3 text-gray-600 text-center sm:text-left max-w-3xl">
            {store?.description}
          </p>

          {/* ================= Owner Info ================= */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:items-center">
            <span className="font-semibold text-gray-700">Owner:</span>
            <span className="text-gray-600">{store?.owner.name}</span>
          </div>

          <div className="mt-2 text-gray-600">
            📍 {store?.owner.address || "NA"}
          </div>

          {/* ================= Stats ================= */}
          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div className="bg-gray-100 rounded-xl p-4">
              <h2 className="text-xl font-bold">120+</h2>
              <p className="text-sm text-gray-600">Products</p>
            </div>
            <div className="bg-gray-100 rounded-xl p-4">
              <h2 className="text-xl font-bold">1.5k</h2>
              <p className="text-sm text-gray-600">Orders</p>
            </div>
            <div className="bg-gray-100 rounded-xl p-4">
              <h2 className="text-xl font-bold">4.8⭐</h2>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
          </div>

          {/* ================= Preview Items ================= */}
          <h2 className="mt-10 text-xl font-semibold">
            Popular Items
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src="https://via.placeholder.com/300"
                  alt="item"
                  className="w-full h-32 object-cover"
                />
                <div className="p-3 text-center text-sm font-medium">
                  Item Preview
                </div>
              </div>
            ))}
          </div>

          {/* ================= CTA ================= */}
          <div className="mt-10 flex justify-center sm:justify-end">
            <button
            onClick={()=>{navigate(`/allStores/${slug}/products`)}}
              className="
                px-8 py-3
                bg-black text-white
                rounded-full
                font-semibold
                hover:bg-pink-600
                transition
                shadow-lg
              "
            >
              Go To Shop →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default GotoShop;
