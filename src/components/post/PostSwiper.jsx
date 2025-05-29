import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./swiper.css";

export default function PostSwiper({ images }) {
  return (
    <Swiper
      pagination={true}
      modules={[Pagination]}
      className="mySwiper w-full"
    >
      {images.map((i) => (
        <SwiperSlide className="bg-secondary-500/5 rounded-lg">
          <img src={i} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
