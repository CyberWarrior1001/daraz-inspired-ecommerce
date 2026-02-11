import React from "react";

import { Store, } from "lucide-react";
import { Link } from "react-router-dom";
import useUIStore from "@/store/uiStore";

export default function NoShop() {
  

  const uid = useUIStore((state) => state.uid)
  return (
    <div >
      <div className="flex flex-col items-center justify-center min-h-[80vh] ">
        {/* Animated headline */}
        <span className="font-bold text-5xl text-gray-800 p-3.5 text-center">
          Please Create Your Store First
        </span>

        {/* Store icon + button */}
        <div className="flex flex-col items-center mt-20">
          {/* Icon popup */}
          <div className="flex flex-col justify-center items-center relative  group">
            <Store
              size={100}
              className="text-pink-500 drop-shadow-lg group absolute top-0  group-hover:-top-25 transition-all duration-500 ease-out"
            />
          <Link to={`/admin/${uid}/creat_shop`}>
            
            <button className=" relative overflow-hidden  top-0  px-12 py-10 rounded-4xl font-semibold whitespace-nowrap cursor-pointer  hover:shadow-lg bg-black text-white group  shadow-[10px_10px_20px_#111] border-2 border-black">
              <span className="absolute inset-0 bg-pink-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>

              {/* button text */}
              <span className="relative z-10 text-4xl">Lets Create</span>
            </button>
            </Link>
          </div>

          {/* Animated button */}
        </div>
      </div>
    </div>
  );
}
