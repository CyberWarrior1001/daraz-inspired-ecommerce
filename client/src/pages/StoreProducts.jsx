import useUIStore from "@/store/uiStore";
import axios from "axios";
import { Loader2Icon, SplineIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

// const categories = ["Electronics", "Fashion", "kids", "Bags & Wallets"];

function StoreProducts() {
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
      "M-Jeans",
      "Pants",
      "Hoodies",
      "Traditional Wear",
      // Women
      "Dresses",
      "Tops",
      "W-Jeans",
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

  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const setAddNumberOfCarts = useUIStore((state) => state.setAddNumberOfCarts);
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const maxPrice = Math.max(...products.map(p => p.price+400));

  useEffect(() => {
    try {
      setLoading(true);
      const getAllStoreProduct = async () => {
        const res = await axios.get(
          `http://localhost:3000/api/allUsers/getStoreBySlug/${slug}/product`,
        );
        console.log(res);
        if (res.data.success) {
          setProducts(res.data.storeProducts);

          setCategories(shopCategories[res.data.storeProducts[0].category]);
        }
      };

      getAllStoreProduct();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow"];

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    categories: [],
    colors: [],
    price: Infinity,
    rating: 0,
  });

  // checkbox handler
  //F.eg type = categories, value = Electronic
  const toggleFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };
 
  const filteredProducts = products?.filter((p) => {
    return (
      (filters.categories.length
        ? filters.categories.includes(p.subCategory)
        : true) &&
      (filters.colors.length
        ? p.colors?.some((color) => filters.colors.includes(color))
        : true) &&
      p.price <= filters.price &&
      (!filters.rating || (p?.rating ?? 0) >= filters.rating)
    );
  });

  console.log(filters.price)

  const addToCart = async (pid) => {
    try {
      setLoadingId(pid);
      const res = await axios.put(
        `http://localhost:3000/api/allUsers/addToCart/${pid}`,
        {},
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
      setLoadingId(null);
    }
  };

  // useEffect(() => {
  //   // Get All Reviews

  //   const getReview = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:3000/api/allUsers/getratedProduct/${productId}`,
  //         { withCredentials: true },
  //       );
  //       console.log(res);
  //       if (res.data.success) {
  //         setReviews(res.data.reviews);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getReview();
  // }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <Loader2Icon size={60} className="text-blue-900 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* ================= FILTER SIDEBAR ================= */}
        <aside className="bg-white rounded-2xl shadow p-5 space-y-6 h-fit sticky top-6">
          <h2 className="font-bold text-lg">Filters</h2>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-2">Categories</h3>

            {categories?.map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => toggleFilter("categories", cat)}
                  className="accent-orange-500"
                />
                {cat}
              </label>
            ))}
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-semibold mb-2">Colors</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => toggleFilter("colors", color)}
                  className={`px-3 py-1 rounded-full text-sm border
                    ${
                      filters.colors.includes(color)
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-gray-100"
                    }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Price Slider */}
          <div>
            <h3 className="font-semibold mb-2">
              Max Price:{" "}
              <span className="text-orange-500">Rs {filters.price}</span>
            </h3>
            <input
              type="range"
              min="500"
              max={maxPrice}
              step="100"
              value={filters.price}
              onChange={(e) =>
                setFilters({ ...filters, price: Number(e.target.value) })
              }
              className="w-full accent-orange-500"
            />
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-semibold mb-2">Rating</h3>
            {[5, 4, 3].map((r) => (
              <label key={r} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === r}
                  onChange={() => setFilters({ ...filters, rating: r })}
                  className="accent-orange-500"
                />
                {r} ⭐ & up
              </label>
            ))}
          </div>

          {/* Clear */}
          <button
            onClick={() =>
              setFilters({
                categories: [],
                colors: [],
                price: 5000,
                rating: 0,
              })
            }
            className="w-full border border-orange-500 text-orange-500 py-2 rounded-lg hover:bg-orange-50"
          >
            Clear Filters
          </button>
        </aside>

        {/* ================= PRODUCTS ================= */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts?.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-93 "
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-48 object-cover"
                />

                {/* Rating badge */}
                <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  ⭐ 5
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col ">
                <h3 className="font-semibold text-sm line-clamp-2 h-5 truncate">{p.name}</h3>

                <p className="text-xs text-gray-500 mt-1">{p.subCategory}</p>
                <p className="font-bold text-gray-500 mt-2 text-lg relative">
                  Rs {p.previous.toLocaleString()}
                  <div className="absolute h-0 w-20 rotate-13 top-1 origin-left inset-0 border border-black"></div>
                </p>

                <p className="font-bold text-orange-500 mt-2 text-lg">
                  Rs {p.price.toLocaleString()}
                </p>

                {/* Buttons */}
                <div className=" flex gap-2 flex-col md:flex-row">
                  <button
                    disabled={loadingId == p._id}
                    onClick={() => addToCart(p._id)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 rounded-lg transition"
                  >
                    {loadingId == p._id ? (
                      <Loader2Icon className="m-auto animate-spin" />
                    ) : (
                      "Add to Cart"
                    )}
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/allStores/${slug}/products/${p._id}`)
                    }
                    className="flex-1 border border-gray-300 hover:bg-gray-100 text-sm py-2 rounded-lg transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!filteredProducts?.length && (
            <p className="col-span-full text-center text-gray-500">
              No products found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoreProducts;
