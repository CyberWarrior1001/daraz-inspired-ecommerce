import axios from "axios";
import { FastForward, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function AllStores() {

  const [stores, setStores] = useState()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  useEffect(() => {
    try {
      const getAllStores = async () => {
        setLoading(true)
        const res = await axios.get("http://localhost:3000/api/allUsers/getAllStores")
        
        if(res.data.success){
          setLoading(false)
          console.log(res)
          setStores(res.data.stores)
        }
      }
      getAllStores()
    } catch (error) {
      setLoading(false)
      console.log(error)
      
    }
  }, [])
  if(loading){
    return <div className="min-h-screen bg-gray-100 p-6 text-gray-800 flex justify-center items-center"> <Loader2Icon size={40} className="font-bold text-[50px] text-blue-800 animate-spin"/></div>
  }
  if(!stores){
    return <div className="min-h-screen bg-gray-100 p-6 text-gray-800 flex justify-center items-center"> <h1 className="font-bold text-3xl text-black/50">No Stores Avalible Yet!</h1></div>
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">🏪 Explore Stores</h1>
        <p className="text-gray-600 mt-1">
          Discover trusted sellers and explore their products
        </p>
      </div>

      {/* Stores Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores?.map((store) => (
          <div
            key={store._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* Store Header */}
            <div className="flex items-center gap-4 p-4 border-b">
              <img
                src={store.logo}
                alt={store.storeName}
                className="w-30 h-30 rounded-full object-cover border"
              />
              <div>
                <h2 className="font-bold text-lg">{store.storeName}</h2>
                <p className="text-sm text-gray-500">
                  ⭐ {} / 5
                </p>
              </div>
            </div>

            {/* Store Body */}
            <div className="p-4">
              <p className="text-sm text-gray-600 line-clamp-2 h-10 overflow-hidden">
                {store.description}
              </p>
            </div>

            {/* Action */}
            <div className="p-4 border-t">
              <button
                onClick={() => navigate(`/allStores/${store.storeSlug}`)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
              >
                Go to Store →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllStores;
