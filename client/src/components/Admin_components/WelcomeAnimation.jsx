import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import store from '/images/Store.png'
import storecycle from '/images/StoreCycle.png'
import storebag from '/images/StoreBag.png'

function WelcomeAnimation() {
  const text = "WELCOME";
  const textGradients = [
  "bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent",
  "bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent",
  "bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent",
  "bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent",
  "bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent",
  "bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent",
  "bg-gradient-to-r from-rose-500 to-red-500 bg-clip-text text-transparent",
];



  useGSAP(()=>{
    let tl = gsap.timeline({})
    tl.from(".mainPage", {
        y:"-200%",
        duration: 2
    })
    tl.from(".char", {
        y: "-300%",
        stagger: 0.1, 
        delay: 1,
        duration: 2,
        ease: "bounce.out",

    })
    tl.from(".store", {
        y: "-800%",
        ease: "bounce.out",
        duration: 2
    })

     tl.from(".storecycle, .storebag", {
        y: "-700%",
        ease: "bounce.out",
        duration: 2
    })
    tl.to(".mainPage", {
        y:"-200%",
        duration: 2
    })
  })

  return (
    <div>
      <div className="mainPage h-screen w-screen flex justify-center items-center flex-col overflow-y-hidden overflow-x-hidden bg-[#0b0b0f] ">
        <div className="flex gap-7">
            <img className="storecycle w-20 md:w-full" src={storecycle} alt="" />
            <img className="store w-20 md:w-full" src={store} alt="" />
            <img className="storebag w-20 md:w-full" src={storebag} alt="" />
        </div>
         <div className="absolute w-[700px] h-[700px] bg-pink-500/20 blur-[180px] rounded-full -z-0"></div>
        <h1 className="md:text-[170px] text-[50px] leading-82 font-bold md:font-stretch-ultra-expanded md:leading-82">
          {text.split("").map((char, i) => (
            <span key={i} className={`char inline-block ${textGradients[i]} custom-cartoon-text`}>
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}

export default WelcomeAnimation;
