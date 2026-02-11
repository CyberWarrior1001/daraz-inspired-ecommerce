import React, { useRef } from "react";





function getDiscountPercentage(previous, price) {
  if (!previous || previous <= price) return 0;

  const discount = ((previous - price) / previous) * 100;
  return Math.round(discount);
}

function OnSaleCard(products) {
  console.log("this is product");
  console.log(products);


  

  return (
    <div className="bg-white  hover:shadow-sm p-3 ">
      {/* IMAGE */}
      <div className="w-full h-40 flex items-center justify-center mb-2 overflow-hidden">
        <img
          src={products.products.images[0]}
          alt="product"
          className="h-full object-contain hover:scale-105 transition-all duration-700"
        />
      </div>

      {/* DESCRIPTION (2 lines only) */}
      <p className="text-sm   line-clamp-2">{products.products.name}</p>

      {/* PRICE SECTION */}
      <div className="mt-2 flex items-center gap-2">
        <span className="text-gray-400 line-through text-sm">
          Rs. {products.products.previous}
        </span>

        <span className="text-xs font-bold">
          -
          {getDiscountPercentage(
            products.products.previous,
            products.products.price,
          )}
          %
        </span>
      </div>

      {/* DISCOUNT */}
    </div>
  );
}

export default OnSaleCard;
