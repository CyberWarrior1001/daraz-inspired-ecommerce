import React from "react";
import OnSaleCard from "./OnSaleCard";
import { useNavigate } from "react-router-dom";

function FlashSals({products}) {
  
  const navigate = useNavigate()


  return (
    <div className="bg-white shadow-sm  w-full ">
      {/* HEADER */}
      <div className="flex justify-between items-center p-5 flex-col gap-1.5 md:flex-row ">
        <h3 className="text-[#f78f51] font-bold text-sm cursor-pointer ">
          On Sale Now
        </h3>

        <button onClick={()=>{navigate("/products")}} className="border border-[#f78f51] text-[#f78f51] text-[14px] font-bold p-2.5 bg-white  cursor-pointer">
          SHOP ALL PRODUCT
        </button>
      </div>

      {/* DIVIDER */}
      <hr className=" border-gray-200" />

      {/* BODY (empty for now) */}
      <div className="min-h-25 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 py-2 gap-4 ">
        {
          products.map((product, idx)=>(

            <OnSaleCard key={idx} products={product}/>
          ))
        }
        
      </div>
    </div>
  );
}

export default FlashSals;
