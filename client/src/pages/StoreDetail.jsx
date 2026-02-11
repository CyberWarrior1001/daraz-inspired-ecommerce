import GotoShop from '@/components/Admin_components/GotoShop'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function StoreDetail() {
    const {slug} = useParams()
    const [store, setStore] = useState()
    useEffect(() => {
      const getStore = async () => {
        const res = await axios.get(`http://localhost:3000/api/allUsers/getStoreBySlug/${slug}`)
        console.log(res)
        if(res.data.success){
            setStore(res.data.store)
            
        }
        
      }
      getStore()
    }, [])
    

  return (
    <div className='pb-10'>
       <GotoShop store={store}/>
       
    </div>
  )
}

export default StoreDetail
