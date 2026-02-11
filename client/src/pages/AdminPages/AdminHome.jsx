import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import NoShop from '@/components/Admin_components/NoShop'
import useUIStore from '@/store/uiStore'
import Shop from '@/components/Admin_components/Shop'
import axios from 'axios'

function AdminHome() {
    const [shop, setShop] = useState()
    
    const {setisStoreCreated, setStoreSlug} = useUIStore()
    
    useEffect(() => {
      const getShop = async () => {
        try {
          const res = await axios.get("http://localhost:3000/api/admin/getShop", {withCredentials: true})
          console.log("this is res")
          console.log(res)
          if(res.data.success){
            setisStoreCreated()
            setShop(res.data)
            setStoreSlug(res.data.store.storeSlug)
          }
        } catch (error) {
          console.log(error)
          
        }
        
      }
      getShop()
     
    }, [])
    
  return (
    
    <div className='relative min-h-screen bg-gray-100 overflow-hidden text-gray-800 right-0 md:w-[75%] md:left-[25%]'>
        {shop ? <Shop shop={shop}/> : <NoShop />}
    </div>
  )
}

export default AdminHome
