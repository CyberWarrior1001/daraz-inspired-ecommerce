import useUIStore from '@/store/uiStore';
import axios from 'axios';
import React, { useState } from 'react'

function LoginComp() {
    const { authModalOpen, authType, closeAuth, openSignup, logedIn, setUname, setUid} = useUIStore();
    const isOpen = authModalOpen && authType === "login";
    const [isLoading, setisLoading] = useState(false)
    const [error, seterror] = useState()
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
   
    
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setisLoading(true)
        const res = await axios.post(
            "http://localhost:3000/api/users/login",
            formData,
            {withCredentials: true}
        )
        setisLoading(false)
        console.log(res)
        setUname(res.data.username)
        setUid(res.data.uid)
        logedIn()

    }
   
  return (
    <div className={`w-full max-w-md p-6 rounded-xl bg-white transform transition-all duration-300 ease-out absolute   ${isOpen 
      ? "translate-y-0 opacity-100 scale-100" 
      : "translate-y-20 opacity-0 scale-95 pointer-events-none"}`}>

        <button
          onClick={closeAuth}
          className="absolute right-3 top-3 text-gray-400"
        >
          ✕
        </button>

        <h2 className="text-2xl text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} method='POST' className="space-y-4">
          <input name="email" onChange={handleChange} type='email' className="w-full p-3 rounded bg-white border-2 border-gray-400" placeholder="Email" />
          <input name="password" onChange={handleChange} type="password" className="w-full p-3 rounded bg-white border-2 border-gray-400" placeholder="Password" />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            disabled={isLoading}
            className="w-full bg-blue-600 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
          <span className='text-gray-700 text-[12px]'>Already have an Account <button onClick={openSignup} className='text-blue-900 text-[12px]'>Sign Up</button></span>
      </div>
  )
}

export default LoginComp
