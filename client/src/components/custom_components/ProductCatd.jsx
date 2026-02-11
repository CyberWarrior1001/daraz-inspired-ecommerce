import React from "react";
import prod from "../../images/product1.avif";
import { useNavigate } from "react-router-dom";

// This Function will get The persentage
function getDiscountPercentage(previous, price) {
  if (!previous || previous <= price) return 0;

  const discount = ((previous - price) / previous) * 100;
  return Math.round(discount);
}

function ProductCatd({ product }) {
  const navigate = useNavigate();

  const fullStars = Math.floor(product?.averageRating); // 4
  // const hasHalfStar = product?.averageRating % 1 >= 0.5; // optional later
  const emptyStars = 5 - Math.ceil(product?.averageRating);

  return (
    <div
      onClick={() =>
        navigate(
          `/allStores/${product.store.storeSlug}/products/${product._id}`,
        )
      }
      className="bg-[#ffffff] rounded-lg shadow-sm  hover:shadow-md transition rounded-lg overflow-hidden cursor-pointer"
    >
      {/* Product Image */}
      <div className="w-full  flex items-center justify-center h-[230px] rounded-2xl ">
        <img
          src={product?.images[0]} // replace with your image
          alt="Product"
          className="w-full h-full object-cover rounded-2xl  hover:scale-105 transition-all duration-700"
        />
      </div>

      {/* Product Title */}
      <p className="text-[13px] text-gray-800 mt-2 line-clamp-2 px-3 ">
        {product?.name}
      </p>

      {/* Price + Discount */}
      <div className="flex items-center gap-2 mt-1 px-3 ">
        <span className="text-[#f57224] font-bold text-[16px]">
          Rs. {product?.price}
        </span>
        <span className="text-black text-[12px]">
          -{getDiscountPercentage(product?.previous, product?.price)}%
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-1 px-3  pb-3">
        {/* Stars */}
        <div className="flex text-[#faca51] text-[14px]">
          {/* Full */}
          {"★".repeat(fullStars)}

          {/* Empty */}
          {"☆".repeat(emptyStars)}
        </div>

        {/* Rating Count */}
        <span className="text-gray-500 text-[12px]">({product?.totalReviews})</span>
      </div>
    </div>
  );
}

export default ProductCatd;
