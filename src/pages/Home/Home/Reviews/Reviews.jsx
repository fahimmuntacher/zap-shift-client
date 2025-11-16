import React from "react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviews }) => {
  const reviewsData = reviews;
  // console.log(reviewsData);
  return (
    <div className="mt-20">
      <div>
        <h1 className="text-3xl text-center font-bold">Our Client Reviews</h1>
      </div>

      <div className="mt-20">
        <Swiper
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={1.2} 
          spaceBetween={20}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 150,
            scale: 0.85,
            modifier: 1.2,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, EffectCoverflow, Pagination]}
          className="mySwiper w-full max-w-6xl py-10"
          breakpoints={{
            480: {
              slidesPerView: 1.3,
            },
            640: {
              slidesPerView: 1.6,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2.5,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
        >
          {reviewsData.map((review) => (
            <SwiperSlide key={review.id} className="pb-10">
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
