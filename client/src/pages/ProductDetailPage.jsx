import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2Icon } from "lucide-react";
import useUIStore from "@/store/uiStore";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { color } from "motion";

function calculateDiscountPercentage(previousPrice, currentPrice) {
  if (previousPrice <= 0) {
    return "Invalid previous price";
  }

  const discount = previousPrice - currentPrice;
  const discountPercentage = (discount / previousPrice) * 100;

  return discountPercentage.toFixed(2); // returns value with 2 decimal places
}

function ProductDetailPage() {
  const [index, setIndex] = useState(0);
  const [reviews, setreviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const isLogedin = useUIStore((state) => state.isLogedin);
  const [user, setuser] = useState(true);
  const { productId } = useParams();
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  const [images, setimages] = useState([]);
  const [selected, setSelected] = useState([]);
  const [colors, setcolors] = useState([]);
  const [isAddToCartLoading, setIsAddToCartLoading] = useState(false);
  const setAddNumberOfCarts = useUIStore((state) => state.setAddNumberOfCarts);
  const [selectColor, setSelectColor] = useState();
  const [refatch, setrefatch] = useState(false);
  // console.log(selectColor)
  const navigate = useNavigate()

  const visibleImages = 4;

  useEffect(() => {
    try {
      const getProduct = async () => {
        const res = await axios.get(
          `http://localhost:3000/api/allUsers/getProductById/${productId}`,
        );
        console.log(res);
        if (res.data.success) {
          setProduct(res.data.product);
          setimages(res.data.product.images);
          setSelected(res?.data?.product?.images[0]);
          setcolors(res?.data?.product?.colors);
        }
      };

      getProduct();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    // Get All Reviews

    const getReview = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/allUsers/getratedProduct/${productId}`,
          { withCredentials: true },
        );
        console.log(res);
        if (res.data.success) {
          setreviews(res.data.reviews);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getReview();
  }, [refatch]);

  const maxIndex = Math.max(images.length - visibleImages, 0);

  const nextSlide = () => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e, rating, comment, setComment, setRating) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/allUsers/rateProduct/${slug}/${productId}`,
        { rating, comment },
        { withCredentials: true },
      );
      console.log(res);
      if (res.data.success) {
        toast(res.data.message);
        setComment("");
        setRating(0);
        setrefatch(true);
      }
      console.log(rating, comment);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (pid, selectColor) => {
    try {
      setIsAddToCartLoading(true);
      const res = await axios.put(
        `http://localhost:3000/api/allUsers/addToCart/${pid}?color=${selectColor}`,
        {}, // empty body
        { withCredentials: true },
      );
      if (res.data.success) {
        setAddNumberOfCarts();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsAddToCartLoading(false);
    }
  };
  return (
    <div className="min-h-[80vh] m-8">
      <div className="w h-full  ">
        <div>
          <h1 className="text-center text-5xl font-bold">Product Detail</h1>
        </div>
        <div>
          <h1 className="text-center mt-3">Store &gt; MY first product</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-5 gap-2 ">
          <div className="col-span-2  m-4 rounded-2xl shadow-md p-6 bg-white">
            {/* Main Image */}
            <div className="flex justify-center items-center h-[380px] w-full bg-gray-100 rounded-2xl mb-6 overflow-hidden">
              <img
                src={selected}
                alt="product"
                className="rounded-3xl h-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Thumbnails */}
            <div className="relative w-full flex items-center">
              {/* LEFT BUTTON */}
              <button
                onClick={prevSlide}
                className="absolute left-0 z-10 bg-white shadow-md rounded-full p-2 hover:scale-110 transition disabled:opacity-30"
                disabled={index === 0}
              >
                <ChevronLeft size={20} />
              </button>

              {/* SLIDER */}
              <div className="overflow-hidden w-full mx-10">
                <div
                  className="flex gap-4 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${index * 96}px)`,
                    // 96px ≈ thumbnail width + gap
                  }}
                >
                  {images.map((img) => (
                    <div
                      key={img}
                      onClick={() => setSelected(img)}
                      className={`cursor-pointer border-2 rounded-xl p-2 flex-shrink-0 transition
                ${
                  selected === img
                    ? "border-black shadow-lg "
                    : "border-transparent hover:border-gray-300"
                }`}
                    >
                      <img
                        src={img}
                        alt="thumbnail"
                        className="h-20 w-20 object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT BUTTON */}
              <button
                onClick={nextSlide}
                className="absolute right-0 z-10 bg-white shadow-md rounded-full p-2 hover:scale-110 transition disabled:opacity-30"
                disabled={index === maxIndex}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="col-span-3 m-4">
            <div className=" rounded-2xl shadow-md p-8 bg-white space-y-6">
              {/* Product Title */}
              <h1 className="text-3xl font-semibold text-gray-900">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-black">
                  PKR {product.price}
                </span>
                <span className="text-gray-400 line-through">
                  PKR {product.previous}
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {calculateDiscountPercentage(product.previous, product.price)}
                  % OFF
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed max-w-xl">
                {product.description}
              </p>

              {/* Color Selection */}
              <div>
                <h3 className="font-semibold mb-2">Color</h3>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectColor(color)}
                      className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition`}
                      // style={{ backgroundColor: color }}
                      style={{ backgroundColor: `${color}` }}
                    />
                    // console.log(color)
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="font-semibold mb-2">Size</h3>
                <div className="flex gap-3">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className="px-4 py-2 border rounded-lg hover:bg-black hover:text-white transition"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock */}
              <p className="text-green-600 font-medium">
                ✔ In Stock — Ready to ship
              </p>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                {/* Add to Cart */}
                <button
                  disabled={isAddToCartLoading}
                  onClick={() => {
                    addToCart(productId, selectColor);
                  }}
                  className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:scale-105 active:scale-95 transition"
                >
                  {isAddToCartLoading ? (
                    <Loader2Icon className="m-auto animate-spin" />
                  ) : (
                    "Add to Cart"
                  )}
                </button>

                {/* Buy Now */}
                <button
                  onClick={() =>
                    navigate("/checkOut", {
                      state: {
                        items: [
                          {productId: productId, productPrice: product.price}
                        ],
                      },
                    })
                  }
                  className="flex-1 border border-black py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 space-y-6">
          {/* Section Title */}
          <h2 className="text-2xl font-semibold">Customer Reviews</h2>
          {reviews?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="font-bold">
                {(
                  reviews.reduce((a, b) => a + b.rating, 0) / reviews.length
                ).toFixed(1)}
              </span>
              <span className="text-yellow-500">★</span>
              <span className="text-gray-500">({reviews.length} reviews)</span>
            </div>
          )}
          {/* Comment Form */}

          <div className="border p-4 rounded-lg bg-gray-50">
            {!isLogedin ? (
              <p className="text-red-500 font-medium">
                {" "}
                Please{" "}
                <a href="/login" className="underline">
                  login
                </a>{" "}
                to leave a review.{" "}
              </p>
            ) : (
              <form
                onSubmit={(e) =>
                  handleSubmit(e, rating, comment, setComment, setRating)
                }
                className="space-y-4"
              >
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <span className="font-medium">Your Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl transition-transform hover:scale-125 ${
                        rating >= star ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                {/* Comment Input */}
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder="Write your review..."
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />

                {/* Submit */}
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded-lg hover:scale-105 transition"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>

          {/* Existing Reviews */}
          <div className="space-y-4">
            {reviews?.map((r) => (
              <div key={r.id} className="border-b pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{r.user.name}</span>
                  <span className="text-yellow-400">
                    {"★".repeat(r.rating)}
                  </span>
                </div>
                <p className="text-gray-700">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
