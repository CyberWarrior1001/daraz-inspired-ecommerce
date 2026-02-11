import React, { useEffect, useState } from 'react'

function BackToTop() {
    const [show, setshow] = useState(false)

    useEffect(() => {
        const onScroll = () =>{
            setshow(window.scrollY > 300);
        }
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    },)

    const scrollTop =()=>{
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        })
    }
    
  return (
    show && (

    <button onClick={scrollTop} className='flex top-20 right-6 w-12 h-12 rounded-full bg text-green-400 border border-green-500 shadow-[0_0_15px_#22c55e] hover:shadow-[0_0_30px_#22c55e] hover:-translate-y-1 transition-all duration-300 z-50 justify-center items-center'>
        ↑
    </button>
    )
  )
}

export default BackToTop
