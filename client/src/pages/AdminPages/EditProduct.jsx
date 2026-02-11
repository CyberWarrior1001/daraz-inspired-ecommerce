import useUIStore from "@/store/uiStore";
import axios from "axios";
import { Loader2, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const shopCategories = {
  Electronics: ["Mobile", "Laptop", "Accessories", "Custom"],
  Fashion: ["Men", "Women", "Kids", "Custom"],
  Home: ["Furniture", "Kitchen", "Decor", "Custom"],
  Sports: ["Fitness", "Outdoor", "Custom"],
};

const colorsList = ["Red", "Blue", "Green", "Black", "White", "Yellow"];

function EditProduct() {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const uid = useUIStore((state) => state.uid);
  const stroeSlug = useUIStore((state) => state.stroeSlug);
  const [isPageLoading, setIsPageLoading] = useState(false)

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

  useEffect(() => {
    const getProductById = async () => {
      try {
        setIsPageLoading(true)
        const res = await axios.get(
          `http://localhost:3000/api/admin/getProductById/${productId}`,
          { withCredentials: true },
        );
        console.log(res);
        setIsPageLoading(false)
        setProduct({
          name: res.data.products?.name || "",
          description: res.data.products?.description || "",
          price: res.data.products?.price || "",
          previous: res.data.products?.previous || "",
          category: res.data.products?.category || "",
          subCategory: res.data.products?.subCategory || "",
          customCategory: res.data.products?.customCategory || "",
          stock: res.data.products?.stock || "",
          colors: res.data.products?.colors || [],
          flashSale: res.data.products?.flashSale || false,
        });
        
      } catch (error) {
        console.log(error);
        setIsPageLoading(false)
      }
    };
    getProductById();
  }, []);

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
    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:3000/api/admin/editProduct/${productId}`,
        product,
        { withCredentials: true },
      );
      console.log(res);
      if (res.data.success) {
        setIsLoading(false);
        toast.success("Product Edit Successfully!");
        navigate(`/admin/${uid}/${stroeSlug}/dashboard/product`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("something went wront!");
    }
  };


  if(isPageLoading){
      return (
        <div className="relative min-h-screen bg-gray-100 overflow-hidden text-gray-800 right-0 md:w-[75%] md:left-[25%] flex justify-center items-center">
          <Loader2 size={90} className="animate-spin text-blue-700"/>
        </div>
      )
    }

  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden text-gray-800 right-0 md:w-[75%] md:left-[25%]">
      <h1 className="text-3xl font-bold mb-6">➕ Edit Product</h1>

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
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 w-full rounded-lg shadow"
          >
            {isLoading ? (
              <Loader2 className="animate-spin m-auto" />
            ) : (
              "Edit Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
