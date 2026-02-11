import BackToTop from "@/components/custom_components/BackToTop";
import CategoriesCard from "@/components/custom_components/CategoriesCard";
import FlashSals from "@/components/custom_components/FlashSals";
import FooterGrid from "@/components/custom_components/FooterGrid";
import ProductCatd from "@/components/custom_components/ProductCatd";
import Slider from "@/components/custom_components/Slider";
import Slidersider from "@/components/custom_components/Slidersider";
import AuthPage from "./AuthPage";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const getAllProducts = async ({
  skip,
  LIMIT,
  setProducts,
  setSkip,
  setHasMore,
}) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/allUsers/getAllPorduct?skip=${skip}&limit=${LIMIT}`,
    );
    
    if (res.data.success) {
      setProducts((prev) => [...prev, ...res.data.allProducts]);
      setSkip((prev) => prev + LIMIT);
      setHasMore(res.data.hasMore);
    }
  } catch (error) {
    console.log(error);
  }
};
function Home() {
  const hasFetched = useRef(false);
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 10;
  const [categories, setCategories] = useState()
  

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    getAllProducts({
      skip,
      LIMIT,
      setProducts,
      setSkip,
      setHasMore,
    });

    try {
      const getAllCategories = async () => {
        const res2 = await axios.get(
          "http://localhost:3000/api/allUsers/getAllCategories",
        );
       
        if(res2.data.success){
          setCategories(res2.data.stores)

        }
      };

      getAllCategories()
    } catch (error) {
      console.log(error);
    }
  }, []);
  const RandomProduct =  [...products].sort(() => 0.5 - Math.random());
  const fiveRandomProduct = RandomProduct.slice(0, 5);

 
  return (
    <div className=" min-h-[80vh]">
      <AuthPage />
      <div className=" grid grid-cols-1  lg:grid-cols-6  gap-1 ">
        <div className="col-span-1  md:col-span-5 ">
          <Slider />
        </div>
        <div>
          <Slidersider />
        </div>
      </div>
      {/* product container */}
      <div className="m-10">
        {/* Flash sals */}
        <div>
          <span className="text-[22px]">Flash Sale</span>
          <FlashSals products={fiveRandomProduct} />
        </div>
        {/* Categories */}
        <div className="mt-8">
          <span className="text-[22px]">Categories</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8">
            {
              categories?.map((categorie, idx)=>(

                <CategoriesCard key={idx} categorie={categorie} />
              ))
            }
            
          </div>
        </div>

        {/* Product */}
        <div className="mt-8">
          <span className="text-[22px]">Just For You</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {products?.map((product, idx) => (
              <ProductCatd key={idx} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => {
                getAllProducts({
                  skip,
                  LIMIT,
                  setProducts,
                  setSkip,
                  setHasMore,
                });
              }}
              className={`${hasMore ? "block" : "hidden"} border-2 border-[#1d9db9] text-[#1d9db9] py-2 w-100 `}
            >
              LOAD MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
