import logo from "../../images/mini logo.avif";
import bgImage from "../../images/cssbg.png";
import qrcodepic from "../../images/qrcode.avif";
import appstore from "../../images/appstore.png";
import playstore from "../../images/googleplay.png";
import stare from "../../images/img.avif";
import freeshoping from "../../images/freeshoping.avif";
import vouchers from "../../images/vouchers.avif";

function Slidersider() {
  return (
    <div className="col-span-1 md:col-span-1 w-full  bg-[linear-gradient(90deg,#fff,hsla(0,0%,100%,0)),linear-gradient(179.27deg,#ffedd6_0.83%,#ffc3e3_46.78%,#fff_99.57%),linear-gradient(0deg,#fff,#fff)] p-2 rounded-lg h-95">

      {/* HEADER */}
      <div className="flex justify-center items-center gap-4 text-[#6c1d00] font-bold text-[12px] sm:text-[14px]">
        <img className="w-6" src={logo} alt="" />
        <span>TRY DARAZ APP</span>
      </div>

      {/* BANNER */}
      <div
        className="bg-no-repeat  bg-center bg-cover mt-2 rounded-xl p-3 h-40 sm:h-50"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="flex items-center gap-1 text-white font-bold text-[10px]">
          <img className="h-3" src={stare} alt="" />
          <span>4.8 Rated</span>
        </div>

        <p className="text-white text-center text-[11px] sm:text-[12px] font-bold mt-2">
          Download the App now
        </p>

        <div className="mt-3 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-white">
            <img className="h-8" src={freeshoping} alt="" />
            <span className="text-[11px] font-bold">Free Delivery</span>
          </div>

          <div className="flex items-center gap-3 text-white">
            <img className="h-8" src={vouchers} alt="" />
            <span className="text-[11px] font-bold">Exclusive Vouchers</span>
          </div>
        </div>
      </div>

      {/* QR + STORES */}
      <div className="mt-3 flex flex-col lg:flex-row  items-center gap-3">
        <img className="h-15" src={qrcodepic} alt="" />

        <div className="flex gap-2 lg:flex-col">
          <img className="h-6 " src={appstore} alt="" />
          <img className="h-6 " src={playstore} alt="" />
        </div>
      </div>

      <p className="mt-2 text-center text-[#2e3346] text-[10px]">
        Download the App Now!
      </p>
    </div>
  );
}

export default Slidersider;
