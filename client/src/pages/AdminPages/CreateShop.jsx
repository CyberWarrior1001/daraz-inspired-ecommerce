import WelcomeAnimation from '@/components/Admin_components/WelcomeAnimation'
import React, { useEffect, useState } from 'react'
import CreateStoreForm from '@/components/Admin_components/CreateStoreForm'
import axios from 'axios'
import DefaultProfilePic from '../../images/defaultprofilepic.jpg'

function CreateShop() {
    const [user, setUser] = useState()
    useEffect(() => {
        const getProfileInfo = async () => {
            
            const res = await axios.get("http://localhost:3000/api/users/getProfile",
                { withCredentials: true }
             )
             console.log(res.data.user)
             setUser(res.data.user)
        }

        getProfileInfo()

    }, [])
    console.log(user)
    
  return (
    <div className='relative min-h-screen w-screen bg-gray-100 overflow-hidden text-gray-800 right-0 md:w-[75%] md:left-[25%]'>
         <h1 className='text-3xl text-center '>Welcome {user?.name}</h1>
        <div className='flex flex-col md:flex-row gap-12 justify-center'>
            <div className='w-full md:w-[30%] justify-center items-center'>
                <img className='rounded-full' src={user?.profilePic || DefaultProfilePic} alt="" />
            </div>
            <div className=' flex w-[70%] justify-center items-center'>
               
                <div className='flex justify-center pt-4 flex-col items-start'>
                    <div className='flex flex-nowrap gap-5 items-center '>
                        <span className='font-bold text-2xl'>Name:</span>
                        <h1 className='font-bold text-1xl hover:underline text-blue-900 cursor-pointer'>{user?.name}</h1>
                    </div>
                     <div className='flex flex-nowrap gap-5 items-center '>
                        <span className='font-bold text-2xl'>Email:</span>
                        <h1 className='font-bold text-1xl hover:underline text-blue-900 cursor-pointer'>{user?.email}</h1>
                    </div>
                     <div className='flex flex-nowrap gap-5 items-center '>
                        <span className='font-bold text-2xl'>PhNo:</span>
                        <h1 className='font-bold text-1xl hover:underline text-blue-900 cursor-pointer'>{user?.phonenumber}</h1>
                    </div>

                     <div className='flex flex-nowrap gap-5 items-center '>
                        <span className='font-bold text-2xl'>Address:</span>
                        <h1 className='font-bold text-1xl hover:underline text-blue-900 cursor-pointer'>{user?.address}</h1>
                    </div>


                     <div className='flex flex-nowrap gap-5 items-center '>
                        <span className='font-bold text-2xl'>Gender:</span>
                        <h1 className='font-bold text-1xl hover:underline text-blue-900 cursor-pointer'>{user?.gender}</h1>
                    </div>

                     <div className='flex flex-nowrap gap-5 items-center '>
                        <span className='font-bold text-2xl'>Role:</span>
                        <h1 className='font-bold text-1xl hover:underline text-blue-900 cursor-pointer'>{user?.role}</h1>
                    </div>

                     
                </div>
            </div>
        </div>
        {/* Creating shop */}
        <div className='w-full p-7'>
            <div>
                <CreateStoreForm user={user}/>
            </div>
        </div>
    </div>
  )
}

export default CreateShop
