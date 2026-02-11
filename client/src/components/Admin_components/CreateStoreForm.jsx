import useUIStore from "@/store/uiStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateStoreForm = (props) => {
  const [error, setError] = useState(false);
  const [recommendedSlug, setRecommendedSlug] = useState("");
  const navigate = useNavigate();
  const { setisStoreCreated } = useUIStore();
  const uid = useUIStore((state) => state.uid);

  const [storeData, setStoreData] = useState({
    storeName: "",
    storeSlug: "",
    category: "",
    description: "",
    logo: "",
    banner: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethods: [],
    bankDetails: "",
    shippingArea: "",
    shippingFee: "",
    visibility: "public",
    returnPolicy: "",
    terms: false,
  });

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[_\s]+/g, "-") // spaces & underscores → dash
      .replace(/[^a-z0-9-]/g, "") // remove special chars
      .replace(/-+/g, "-"); // remove duplicate dashes
  };

  const isValidSlug = (slug) => {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  };

  const handleFileUpload = async (name, formData) => {
    console.log(name);
    try {
      if (name == "logo") {
        const res = await axios.post(
          "http://localhost:3000/api/admin/upload/logo",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        setStoreData({
          ...storeData,
          logo: `http://localhost:3000/${res.data.path}`,
        });
      } else if (name == "banner") {
        const res = await axios.post(
          "http://localhost:3000/api/admin/upload/banner",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        setStoreData({
          ...storeData,
          banner: `http://localhost:3000/${res.data.path}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox" && name === "paymentMethods") {
      let updated = [...storeData.paymentMethods];
      if (checked) {
        updated.push(value);
      } else {
        updated = updated.filter((item) => item !== value);
      }
      setStoreData({ ...storeData, paymentMethods: updated });
    } else if (type === "checkbox") {
      setStoreData({ ...storeData, [name]: checked });
    } else if (type === "file") {
      const file = files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append(name, file);
      console.log(formData);
      handleFileUpload(name, formData);
    } else {
      if (name === "storeSlug") {
        const cleanedSlug = generateSlug(value);
        const valid = isValidSlug(value);

        setRecommendedSlug(generateSlug(storeData.storeName));
        setError(!valid);
        setStoreData({ ...storeData, [name]: value });
      } else {
        setStoreData({ ...storeData, [name]: value });
      }
    }
  };

  useEffect(() => {
    if (props) {
      console.log("This is props");
      setStoreData((prev) => ({
        ...prev,
        ownerName: props.user?.name,
        email: props.user?.email,
        phone: props.user?.phonenumber,
        address: props.user?.address,
      }));
    }
  }, [props]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(storeData);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/create_shop",
        storeData,
        { withCredentials: true },
      );

      console.log(res);
      if (res.data.success) {
        setisStoreCreated();
        navigate(`/admin/${uid}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl  p-8 rounded-xl shadow-lg space-y-8"
      >
        <h1 className="text-3xl font-bold text-center text-sky-400">
          Create Your Store
        </h1>

        {/* STORE INFO */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">
            Store Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label htmlFor="storeName">Your Store Name: </label>
              <input
                name="storeName"
                value={storeData.storeName}
                onChange={handleChange}
                className="input border "
                placeholder="Store Name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="storeSlug">Your Store Slug:</label>
              <input
                name="storeSlug"
                value={storeData.storeSlug}
                onChange={handleChange}
                className="input border"
                placeholder="Store Username (URL)"
                required
              />
              {error && (
                <span className="text-[12px] text-red-700">
                  Invalud Slug Formate Recommemded Slug:{" "}
                  <span
                    onClick={() => {
                      setStoreData({
                        ...storeData,
                        storeSlug: recommendedSlug,
                      });
                    }}
                    className="cursor-pointer hover:underline"
                  >
                    {recommendedSlug}
                  </span>
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="category">Your Store Category:</label>
              <select
                name="category"
                value={storeData.category}
                onChange={handleChange}
                className="input border"
                required
              >
                <option value="">Select Category</option>

                <option>Electronics</option>
                <option>Mobiles & Tablets</option>
                <option>Mobile Accessories</option>
                <option>Computers & Laptops</option>
                <option>Computer Accessories</option>
                <option>Gaming & Consoles</option>
                <option>Smart Home Devices</option>
                <option>Networking Equipment</option>

                <option>Clothing</option>
                <option>Men Fashion</option>
                <option>Women Fashion</option>
                <option>Kids Fashion</option>
                <option>Shoes & Footwear</option>
                <option>Bags & Wallets</option>
                <option>Jewelry & Accessories</option>
                <option>Watches</option>

                <option>Home & Kitchen</option>
                <option>Furniture</option>
                <option>Home Decor</option>
                <option>Lighting</option>
                <option>Office Supplies</option>
                <option>Tools & Hardware</option>
                <option>Garden & Outdoor</option>
                <option>Cleaning Supplies</option>

                <option>Beauty & Personal Care</option>
                <option>Health & Wellness</option>
                <option>Skincare</option>
                <option>Hair Care</option>
                <option>Medical Equipment</option>

                <option>Grocery</option>
                <option>Organic Food</option>
                <option>Snacks & Beverages</option>
                <option>Bakery Items</option>
                <option>Meat & Seafood</option>

                <option>Sports & Fitness</option>
                <option>Gym Equipment</option>
                <option>Outdoor Sports</option>

                <option>Automotive</option>
                <option>Car Accessories</option>
                <option>Bike Accessories</option>
                <option>Auto Spare Parts</option>
                <option>Tyres & Wheels</option>

                <option>Toys & Games</option>
                <option>Baby Products</option>
                <option>Pet Supplies</option>

                <option>Books & Stationery</option>
                <option>Online Courses</option>
                <option>Educational Material</option>
                <option>Digital Products</option>
                <option>Software</option>
                <option>Subscriptions</option>

                <option>Services</option>
                <option>Freelance Services</option>
                <option>Repair & Maintenance</option>
                <option>Digital Services</option>

                <option>Gifts & Personalized Items</option>
                <option>Handmade & Crafts</option>
                <option>Religious Products</option>
                <option>Wholesale & Bulk</option>
                <option>Second-Hand / Used Items</option>
                <option>Local Store Products</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="description">Your Store description:</label>
              <textarea
                name="description"
                value={storeData.description}
                onChange={handleChange}
                className="input border"
                rows="3"
                placeholder="Store Description"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="logo">Your Store logo:</label>
              <input
                type="file"
                name="logo"
                onChange={handleChange}
                className="file-input border"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="banner">Your Store banner:</label>
              <input
                type="file"
                name="banner"
                onChange={handleChange}
                className="file-input border"
              />
            </div>
          </div>
        </div>

        {/* OWNER INFO */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">
            Owner Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label htmlFor="ownerName">Your Name: </label>
              <input
                name="ownerName"
                value={storeData.ownerName}
                onChange={handleChange}
                className="input border"
                placeholder="Owner Name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Your email: </label>
              <input
                name="email"
                value={storeData.email}
                onChange={handleChange}
                className="input border"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone">Your phone Number: </label>
              <input
                name="phone"
                value={storeData.phone}
                onChange={handleChange}
                className="input border"
                placeholder="Phone Number"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="address">Your Address: </label>
              <textarea
                name="address"
                value={storeData.address}
                onChange={handleChange}
                className="input border"
                rows="2"
                placeholder="Address"
              />
            </div>
          </div>
        </div>

        {/* PAYMENT & SHIPPING */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">
            Payment & Shipping
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label htmlFor="paymentMethods">
                Select Your Payment Method:{" "}
              </label>
              {["COD", "Bank", "EasyPaisa", "JazzCash"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={method}
                    name="paymentMethods"
                    checked={storeData.paymentMethods.includes(method)}
                    onChange={handleChange}
                    className="accent-sky-400"
                  />
                  {method}
                </label>
              ))}
            </div>

            <div className="flex flex-col">
              <label htmlFor="bankDetails">Enter Your BankDetails: </label>
              <input
                name="bankDetails"
                value={storeData.bankDetails}
                onChange={handleChange}
                className="input border"
                placeholder="Bank Details (Optional)"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="shippingArea">Select Your shippingArea: </label>
              <select
                name="shippingArea"
                value={storeData.shippingArea}
                onChange={handleChange}
                className="input border"
              >
                <option value="">Shipping Area</option>
                <option>City Only</option>
                <option>Province</option>
                <option>Nationwide</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="shippingFee">Your shippingFee: </label>
              <input
                name="shippingFee"
                value={storeData.shippingFee}
                onChange={handleChange}
                className="input border"
                type="number"
                placeholder="Shipping Fee (PKR)"
              />
            </div>
          </div>
        </div>

        {/* STORE SETTINGS */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">Store Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label htmlFor="visibility">Your Visibility</label>
              <select
                name="visibility"
                value={storeData.visibility}
                onChange={handleChange}
                className="input border"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="returnPolicy">Your ReturnPolicy?</label>
              <textarea
                name="returnPolicy"
                value={storeData.returnPolicy}
                onChange={handleChange}
                className="input border"
                rows="2"
                placeholder="Return Policy"
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="terms"
                checked={storeData.terms}
                onChange={handleChange}
                required
                className="accent-sky-400"
              />
              I agree to the Terms & Conditions
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-sky-400 text-black font-semibold rounded-lg hover:bg-sky-500 transition"
        >
          Create Store
        </button>
      </form>
    </div>
  );
};

export default CreateStoreForm;
