import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper";

import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/autoplay";

import "../styles/product-detail/product-gallery.css";

const ProductGallery = ({ images }) => {
  return (
    <div className='product-gallery-container'>
      <Swiper
        className='gallery'
        loop={true}
        slidesPerView={1}
        autoplay={{
          delay: 3000
        }}
        pagination={{
          type: "fraction",
        }}
        effect={"slide"}
        modules={[Autoplay, Navigation, Pagination]}
      >
        {
          images.map(
            (img, i) => {
              return (
                <SwiperSlide
                  role="img" aria-label={img.title}
                  key={`img-mob-${img.idImage}`}
                  style={{ backgroundImage: `url(${img.url})` }} >
                </SwiperSlide>
              )
            }
          )
        }
      </Swiper>
    </div>
  )
}

export default ProductGallery;
