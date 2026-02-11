import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import slide1 from "../../images/daraz_slider1.avif";
import slide2 from "../../images/daraz_slider2.avif";
import slide3 from "../../images/daraz_slider3.avif";
import slide4 from "../../images/daraz_slider4.avif";
import slide5 from "../../images/daraz_slider5.avif";
import slide6 from "../../images/daraz_slider6.avif";
import slide7 from "../../images/daraz_slider7.avif";
import slide8 from "../../images/daraz_slider8.avif";
import slide9 from "../../images/daraz_slider9.avif";

function Slider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation={false}     // hide arrows on mobile
      grabCursor={true}
      touchRatio={1.2}
      className="w-full h-40 sm:h-70 md:h-95  overflow-hidden"
    >
      {[slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9].map(
        (img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt={`slide-${i}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        )
      )}
    </Swiper>
  );
}

export default Slider;
