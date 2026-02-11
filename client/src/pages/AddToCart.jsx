import useUIStore from "@/store/uiStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function findSubTotal(carts) {
  const numOfProductInCart = carts.length;
  let total = 0;
  for (let i = 0; i < numOfProductInCart; i++) {
    const cart = carts[i];
    const cartPrice = cart.product.price;
    const cartQuantity = cart.quantity;
    const OneCartTotal = cartPrice * cartQuantity;
    total += OneCartTotal;
  }
  return total;
}
function findTotal(carts) {
  const subTotal = findSubTotal(carts);
  return subTotal + 200 + carts[0]?.product.store.shippingFee;
}

function AddToCart() {
  const [carts, setCarts] = useState([]);
  const { setRemoveNumberOfCarts } = useUIStore();

  useEffect(() => {
    const getAddedProduct = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/allUsers/getCartProduct",
          { withCredentials: true },
        );
        if (res.data.success) {
          console.log(res);
          setCarts(res.data.carts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAddedProduct();
  }, []);

  const increaseQty = async (productId) => {
    // ✅ Save old cart for rollback
    const oldCart = carts;
    // ✅ Optimistic Update (instant UI)

    setCarts((prev) =>
      prev.map((item) =>
        item.product === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );

    try {
      // ✅ Background API
      const res = await axios.patch(
        "http://localhost:3000/api/allUsers/cart/quantity",
        {
          productId,
          action: "inc",
        },
        { withCredentials: true },
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      // ❌ Rollback if failed
      setCarts(oldCart);
      console.log("Failed to update quantity");
    }
  };

  const decreaseQty = async (productId) => {
    const oldCart = carts;
    setCarts((prev) =>
      prev.map((item) =>
        item.product === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
    try {
      // ✅ Background API
      const res = await axios.patch(
        "http://localhost:3000/api/allUsers/cart/quantity",
        {
          productId,
          action: "dec",
        },
        { withCredentials: true },
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      setCarts(oldCart);
    }
  };

  const removeItem = async (productId) => {
    // backup (for rollback if API fails)
    const previousCart = carts;
    // optimistic update
    setCarts((prev) => prev.filter((item) => item._id !== productId));
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/allUsers/cart/delete/${productId}`,
        { withCredentials: true },
      );

      if (res.data.success) {
        setRemoveNumberOfCarts(carts?.length - 1);
        toast.success(res.data.message);
      }
    } catch (error) {
      // rollback if something breaks
      setCarts(previousCart);

      console.log("Delete failed");
    }
  };
  console.log(carts);

  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] m-8">
      <div className="w h-full  ">
        <div>
          <h1 className="text-center text-5xl font-bold">Shopping Cart</h1>
        </div>
        <div>
          <h1 className="text-center mt-3">Shop &gt; Shopping Cart</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* PAGE GRID */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT — CART */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

            {/* Cart Item */}

            {carts?.map((cart) => (
              <div
                key={cart._id}
                className="grid grid-cols-[auto_100px_1fr_1fr_1fr] items-center gap-4 p-4 mb-4 bg-white rounded-xl shadow-sm"
              >
                <button
                  onClick={() => {
                    removeItem(cart._id);
                  }}
                  className="text-gray-400 hover:text-red-500 text-xl font-bold"
                >
                  ✕
                </button>

                <div className="w-24 h-24">
                  <img
                    src={cart.product.images[0]}
                    className="w-full h-full object-cover rounded-lg"
                    alt=""
                  />
                </div>

                <div>
                  <span className="text-gray-500 text-sm font-medium">
                    {cart.product.category}
                  </span>

                  <h2 className="font-semibold text-lg">{cart.product.name}</h2>

                  <p className="text-gray-600 text-sm">Size: M</p>
                </div>

                {/* Quantity */}
                <div className="flex justify-center">
                  <div className="flex border w-30 items-center rounded-2xl justify-center">
                    <button
                      onClick={() => {
                        decreaseQty(cart.product);
                      }}
                      className={`px-3 py-1 rounded-xl text-lg font-semibold "hover:bg-gray-100"}`}
                    >
                      -
                    </button>
                    <span className="px-4">{cart.quantity}</span>
                    <button
                      onClick={() => increaseQty(cart.product)}
                      className={`px-3 py-1 rounded-xl text-lg font-semibold "opacity-30 cursor-not-allowed"  "hover:bg-gray-100"}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="font-semibold text-lg w-20 text-right">
                  PKR {cart.product.price}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — CHECKOUT */}
          <div className="bg-white  rounded-xl shadow-sm p-6 h-fit sticky top-50">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            {/* Row */}
            <div className="flex justify-between mb-3 text-gray-600">
              <span>Subtotal</span>
              <span>PKR {findSubTotal(carts)}</span>
            </div>

            <div className="flex justify-between mb-3 text-gray-600">
              <span>Shipping</span>
              {carts[0]?.product.store.shippingFee ? (
                <span className="text-black font-medium">
                  {carts[0]?.product.store.shippingFee}
                </span>
              ) : (
                <span className="text-green-600 font-medium">Free</span>
              )}
            </div>

            <div className="flex justify-between mb-3 text-gray-600">
              <span>Tax</span>
              <span>PKR 300</span>
            </div>

            <hr className="my-4" />

            {/* TOTAL */}
            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total</span>
              <span>PKR {findTotal(carts) || "0"}</span>
            </div>

            {/* CHECKOUT BUTTON */}
            <button
              onClick={() =>
                navigate("/proceedToCheckOut")
              }
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
