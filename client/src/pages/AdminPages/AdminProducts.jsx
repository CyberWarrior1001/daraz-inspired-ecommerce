import useUIStore from "@/store/uiStore";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AdminProducts() {
  const navigate = useNavigate();
  const [product, setProducts] = useState();
  const uid = useUIStore((state) => state.uid)
  const stroeSlug = useUIStore((state) => state.stroeSlug)
  const [isLoading, setIsLoading] = useState(false)
  const [refatch, setrefatch] = useState(false)
  

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get("http://localhost:3000/api/admin/getAllProduct", {withCredentials: true})
        console.log(res)
        if(res.data.success){
          setProducts(res.data.products)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
      
        setIsLoading(false)  
      }
    }
    getAllProduct()
  }, [refatch])

  // Delete product handler
  const handleDelete = async (id) => {
    
    try {
      setIsLoading(true)
      const res = await axios.delete(`http://localhost:3000/api/admin/deleteProduct/${id}`, {withCredentials: true})

      if(res.data.success){
        setIsLoading(false)
        toast.success(res.data.message)
        setrefatch(true)

      }
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong!")
      setIsLoading(false)
    }
  };

  
  if(isLoading){
    return (
      <div className="relative min-h-screen bg-gray-100 overflow-hidden text-gray-800 right-0 md:w-[75%] md:left-[25%] flex justify-center items-center">
        <Loader2 size={90} className="animate-spin text-blue-700"/>
      </div>
    )
  }
  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden text-gray-800 right-0 md:w-[70%] md:left-[25%] m-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <button
          onClick={() => navigate(`/admin/${uid}/${stroeSlug}/dashboard/addproduct`)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg shadow"
        >
          ➕ Add Product
        </button>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {product?.map((prod) => (
          <div
            key={prod._id}
            className="bg-white rounded-xl shadow-md overflow-hidden relative hover:shadow-lg transition"
          >
            {/* Product Image */}
            <img
              src={prod.images[0]}
              alt={prod.name}
              className="w-full h-40 object-cover"
            />

            {/* Product Details */}
            <div className="p-4 space-y-2">
              <h2 className="font-semibold text-lg">{prod.name}</h2>
              <p className="text-gray-500 text-sm">{prod.category}</p>
              <p className="text-gray-700 font-medium">Rs {prod.price}</p>
              <p className="text-gray-500 text-sm">Stock: {prod.stock}</p>
            </div>

            {/* Edit & Delete Buttons */}
            <div className="flex justify-between px-4 pb-4">
              <button
                onClick={() => navigate(`/admin/${uid}/${stroeSlug}/dashboard/product/${prod._id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(prod._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;
