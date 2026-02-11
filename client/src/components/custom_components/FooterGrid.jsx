import React from "react";
import Flogo from '../../images/FooterLogo.png'
import pay1 from '../../images/pay1.png'
import pay2 from '../../images/pay2.png'
import pay3 from '../../images/pay3.png'
import pay4 from '../../images/pay4.png'
import pay5 from '../../images/pay5.png'
import pay6 from '../../images/pay6.png'
import pay7 from '../../images/pay7.png'
import pay8 from '../../images/pay8.png'
import verifipay from '../../images/verifiedby.png'
import appstore from '../../images/footerplaystore.png'
import googleplay from '../../images/footerappstore.png'
import appgerally from '../../images/footerappgeraly.png'


function FooterGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 z-50">
      <div>
        <div className="text-[15px] font-bold text-800 text-[#2d307f] mb-2">
          Customer Care
        </div>
        <ul className="text-[14px] text-700 text-[#2d307f]">
          <li className="hover:underline cursor-pointer text-[12px]">
            Help Center
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            How to Buy
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            Corporate & Bulk Purchasing
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            Returns & Refunds
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            Daraz Shop
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            Contact Us
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            Purchase Protection
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            Daraz Pick up Points
          </li>
        </ul>
      </div>
      <div>
        <div className="text-[15px] font-bold text-800 text-[#2d307f] mb-2">
          Daraz
        </div>
        <ul className="text-[14px] text-700 text-[#2d307f]">
          <li className="hover:underline cursor-pointer text-[12px]">
            About Us
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            Digital Payments
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            Daraz Donates
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            Daraz Blog
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            Terms & Conditions
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            Privacy Policy
          </li>

          <li className="cursor-default text-[12px]">NTN Number : 4012118-6</li>
          <li className="cursor-default text-[12px]">
            STRN Number : 1700401211818
          </li>

          <li className="hover:underline cursor-pointer text-[12px]">
            Online Shopping App
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            Online Grocery Shopping
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            Daraz Exclusive
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            Daraz University
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            Sell on Daraz
          </li>
          <li className="hover:underline cursor-pointer text-[12px]">
            Join Daraz Affiliate Program
          </li>
        </ul>
      </div>
      <div>
        {/* this is the third div */}
        <div className="flex justify-center items-center gap-5">
          <div><img className="w-10.5" src={Flogo} alt="FooterLogo" /></div>
          <div className="flex flex-col">
            <span className="text-[#f36f36] text-[16px]">Happy Shopping</span>
            <span className="text-[#0f136d] text-[14px]">Download App</span>
          </div>
        </div>
        <div>
          <div className="flex justify-center items-center pt-6 text-[#183544] text-[16px] ">Payment Methods</div>
          <div className="flex flex-wrap gap-2 pt-4">
            <span><img className="h-6.75" src={pay1} alt="payimg" /></span>
            <span><img className="h-6.75" src={pay2} alt="payimg" /></span>
            <span><img className="h-6.75" src={pay3} alt="payimg" /></span>
            <span><img className="h-6.75" src={pay4} alt="payimg" /></span>
            <span><img className="h-6.75" src={pay5} alt="payimg" /></span>
            <span><img className="h-6.75" src={pay6} alt="payimg" /></span>
            <span><img className="h-6.75" src={pay7} alt="payimg" /></span>
            <span><img className="h-6.75" src={pay8} alt="payimg" /></span>
            
          </div>
        </div>

        <div>
          <div className="flex justify-center items-center pt-6 text-[#183544] text-[16px] ">Verified by</div>
          <div className="pt-4">
            <span><img className="h-6.75" src={verifipay} alt="payimg" /></span>
          </div>
        </div>

      </div>
      <div>
        <div className="flex flex-wrap gap-2">
          <span><img src={googleplay} alt="storimg" /></span>
          <span><img src={appstore} alt="storimg" /></span>
          <span><img src={appgerally} alt="storimg" /></span>
        </div>
      </div>
    </div>
  );
}

export default FooterGrid;
