import ImageUploadLoader from "@/components/custom_components/ImageUploadLoader";
import useUIStore from "@/store/uiStore";
import axios from "axios";
import { Loader2, Upload } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const shopCategories = {
  Electronics: [
    "Mobile Phones",
    "Tablets",
    "Laptops",
    "Desktops",
    "Computer Accessories",
    "Gaming Consoles",
    "Headphones & Earbuds",
    "Smart Watches",
    "Power Banks",
    "Chargers & Cables",
    "Cameras",
    "Custom",
  ],

  Fashion: [
    // Men
    "Shirts",
    "T-Shirts",
    "Jeans",
    "Pants",
    "Hoodies",
    "Traditional Wear",
    // Women
    "Dresses",
    "Tops",
    "Jeans",
    "Abayas",
    "Scarves",
    "Handbags",
    // Kids
    "Boys Clothing",
    "Girls Clothing",
    "School Wear",
    "Shoes & Footwear",
    "Bags & Wallets",
    "Jewelry & Accessories",
    "Watches",
    "Custom",
  ],

  Home: [
    "Beds",
    "Sofas",
    "Chairs",
    "Tables",
    "Wardrobes",
    "Kitchen Appliances",
    "Cookware",
    "Dinner Sets",
    "Storage Containers",
    "Wall Art",
    "Curtains",
    "Carpets",
    "Clocks",
    "Lamps",
    "Tools & Hardware",
    "Garden & Outdoor",
    "Cleaning Supplies",
    "Custom",
  ],

  Sports: [
    "Gym Equipment",
    "Dumbbells",
    "Yoga Mats",
    "Sports Wear",
    "Cricket Gear",
    "Football Gear",
    "Outdoor Gear",
    "Bikes & Accessories",
    "Fitness Accessories",
    "Custom",
  ],

  Grocery: [
    "Rice & Grains",
    "Cooking Oil",
    "Spices",
    "Pulses",
    "Sugar & Salt",
    "Snacks",
    "Beverages",
    "Tea & Coffee",
    "Bakery Items",
    "Meat & Seafood",
    "Organic Food",
    "Custom",
  ],

  Automotive: [
    "Car Accessories",
    "Bike Accessories",
    "Auto Spare Parts",
    "Tyres & Wheels",
    "Helmets",
    "Gloves",
    "Car Covers",
    "Seat Covers",
    "Dash Cameras",
    "Lights",
    "Custom",
  ],

  Beauty: [
    "Makeup",
    "Skincare",
    "Haircare",
    "Perfumes",
    "Grooming Kits",
    "Vitamins & Supplements",
    "Medical Devices",
    "Face Masks",
    "Thermometers",
    "Custom",
  ],

  Books: [
    "School Books",
    "University Books",
    "Novels",
    "Notebooks",
    "Stationery",
    "Educational Material",
    "Custom",
  ],

  DigitalProducts: [
    "Software",
    "Mobile Apps",
    "Website Templates",
    "UI Kits",
    "Source Code",
    "Online Courses",
    "Programming",
    "Ethical Hacking",
    "Web Development",
    "Graphic Design",
    "Digital Marketing",
    "Custom",
  ],

  Services: [
    "Freelancing",
    "Web Development",
    "App Development",
    "Graphic Design",
    "Repair Services",
    "Digital Services",
    "Custom",
  ],

  Gifts: [
    "Personalized Gifts",
    "Handmade Crafts",
    "Greeting Cards",
    "Gift Boxes",
    "Custom",
  ],

  Wholesale: [
    "Wholesale Products",
    "Bulk Items",
    "Second-Hand Mobiles",
    "Used Laptops",
    "Custom",
  ],

  Other: ["Custom"],
};

const colorsList = ["Red", "Blue", "Green", "Black", "White", "Yellow"];

function AddProduct() {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadImgIconHide, setIsUploadImgIconHide] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const uid = useUIStore((state) => state.uid);
  const stroeSlug = useUIStore((state) => state.stroeSlug);

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    previous: "",
    category: "",
    subCategory: "",
    customCategory: "",
    stock: "",
    images: [],
    colors: [],
    flashSale: false,
  });

  const uploadProductImages = async () => {
    setIsUploadImgIconHide(true);
    setIsUploading(true);
    setUploadDone(false);
    setUploadProgress(0);

    const formData = new FormData();
    images.forEach((img) => {
      formData.append("productImages", img);
    });
    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/upload/productImages",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setUploadProgress(percent);
          },
        },
      );
      console.log(res);
      if (res.data.success) {
        toast.success("Images Uploaded successfully!");
        setProduct((prev) => ({
          ...prev,
          images: res.data.images.map(
            (img) => `http://localhost:3000/${img.path}`,
          ),
        }));

        setUploadDone(true);
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
      setImagePreviews(false);
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle main category selection
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setProduct({
      ...product,
      category: selected,
      subCategory: "", // reset sub category
      customCategory: "",
    });
  };

  // Handle sub-category selection
  const handleSubCategoryChange = (e) => {
    const selected = e.target.value;
    setProduct({ ...product, subCategory: selected });
  };

  // Handle colors checkbox
  const handleColorChange = (color) => {
    const colors = product.colors.includes(color)
      ? product.colors.filter((c) => c !== color)
      : [...product.colors, color];
    setProduct({ ...product, colors });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product);
    try {
      setIsLoading(true);
      const res = await axios.put(
        "http://localhost:3000/api/admin/addProduct",
        product,
        { withCredentials: true },
      );

      console.log(res);
      if (res.data.success) {
        setIsLoading(false);
        toast.success(res.data.message);
        navigate(`/admin/${uid}/${stroeSlug}/dashboard/product`);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something Went Wrong!");
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden text-gray-800 right-0 md:w-[75%] md:left-[25%]">
      <h1 className="text-3xl font-bold mb-6">➕ Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 shadow-md max-w-4xl mx-auto space-y-6"
      >
        {/* Product Name */}
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Write product description"
            className="w-full border rounded-lg px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1">Price (Rs)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Prevous Price (Rs)</label>
          <input
            type="number"
            name="previous"
            value={product.previous}
            onChange={handleChange}
            placeholder="Enter previous"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>
        {/* Stock */}
        <div>
          <label className="block font-semibold mb-1">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Enter available stock"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleCategoryChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            >
              <option value="">Select category</option>
              {Object.keys(shopCategories).map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sub-Category / Custom */}
          <div>
            <label className="block font-semibold mb-1">Sub-Category</label>
            {product.category ? (
              <select
                name="subCategory"
                value={product.subCategory}
                onChange={handleSubCategoryChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              >
                <option value="">Select sub-category</option>
                {shopCategories[product.category].map((sub, idx) => (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-gray-400 text-sm">Select category first</p>
            )}

            {/* Custom category input */}
            {product.subCategory === "Custom" && (
              <input
                type="text"
                name="customCategory"
                value={product.customCategory}
                onChange={handleChange}
                placeholder="Enter custom sub-category"
                className="w-full border rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            )}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block font-semibold mb-1">Available Colors</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {colorsList.map((color, idx) => (
              <label
                key={idx}
                className={`px-3 py-1 rounded-lg cursor-pointer border ${
                  product.colors.includes(color)
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-800"
                }`}
              >
                <input
                  type="checkbox"
                  value={color}
                  checked={product.colors.includes(color)}
                  onChange={() => handleColorChange(color)}
                  className="hidden"
                />
                {color}
              </label>
            ))}
          </div>
        </div>

        {/* Images Upload */}
        <div>
          <label className="block font-semibold mb-2">Product Images</label>
          <div className="flex justify-between items-center">
            <input
              type="file"
              accept="image/*"
              multiple
              name="productImages"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setImages(files);

                const previews = files.map((file) => URL.createObjectURL(file));
                console.log(previews);
                setImagePreviews(previews);
              }}
              className="cursor-pointer"
            />
            <div
              onClick={() => {
                uploadProductImages();
              }}
            >
              <Upload className={isUploadImgIconHide ? "hidden" : "block"} />
            </div>
            <div>
              {isUploading || uploadDone ? (
                <ImageUploadLoader
                  progress={uploadProgress}
                  done={uploadDone}
                />
              ) : null}
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-wrap gap-3 mt-3">
            {imagePreviews.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`preview-${idx}`}
                className="w-24 h-24 object-cover rounded-lg border"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <label className="block font-semibold mb-2">Flash for sale</label>
          <input
            type="Checkbox"
            checked={product.flashSale}
            onChange={(e) =>
              setProduct({ ...product, flashSale: e.target.checked })
            }
            className="mb-3"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 w-full rounded-lg shadow "
          >
            {isLoading ? (
              <Loader2 className="animate-spin m-auto" />
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
