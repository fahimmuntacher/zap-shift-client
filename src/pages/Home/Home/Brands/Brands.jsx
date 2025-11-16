import React from "react";
import amazon from "../../../../assets/brands/amazon.png";
import casio from "../../../../assets/brands/casio.png";
import moonstar from "../../../../assets/brands/moonstar.png";
import randstad from "../../../../assets/brands/randstad.png";
import star from "../../../../assets/brands/star.png";
import start_people from "../../../../assets/brands/start_people.png";

import "swiper/css";
import { Autoplay} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const Brands = () => {
  const brandsLogo = [amazon, casio, moonstar, randstad, star, start_people];
  return (
    <div className="mt-20">
      <Swiper
        slidesPerView={6}
        centeredSlides={true}
        spaceBetween={20}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {brandsLogo.map((logo) => (
          <SwiperSlide>
            <img src={logo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
