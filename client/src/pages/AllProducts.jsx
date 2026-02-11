import ProductCatd from "@/components/custom_components/ProductCatd";
import axios from "axios";
import React, { useEffect,  useState } from "react";
import { useLocation } from "react-router-dom";


function AllProducts() {
  
  const [products, setProducts] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get("query");
  const location = useLocation();
 

  useEffect(() => {
    const getAllSearchProducts = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/allUsers/getSearchProduct?searchQuery=${searchQuery || ""}`)
            console.log(res)
            if(res.data.success){
                setProducts(res.data.products)
            }
        } catch (error) {
            console.log(error)
            
        }
        
    }
    getAllSearchProducts()
  }, [location])
  


  return (
    <div className=" min-h-[80vh] m-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {products?.map((product, idx) => (
          <ProductCatd key={idx} product={product} />
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
