import React from 'react'
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Thumbs, FreeMode } from "swiper";
import CloseIcon from '../../resources/close_menu.svg';

import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/thumbs";

import "../styles/product-detail/product-gallery-desktop.css";

const ProductGalleryDesktop = ({ images }) => {
  const [isModal, setIsModal] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <div className={`product-gallery-container modal ${isModal ? 'modal-open' : ''}`} >
        < Swiper
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
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs, Autoplay, Navigation, Pagination]}
        >
          {
            images.map(
              (img, i) => {
                return (
                  <SwiperSlide
                    role="img" aria-label={img.title}
                    key={`photo-${img.idImage}`}
                    style={{ backgroundImage: `url(${img.url})` }} >
                  </SwiperSlide>
                )
              }
            )
          }
        </Swiper >
        < Swiper
          watchSlidesProgress={true}
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={20}
          slidesPerView={4}
          freeMode={true}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {
            images.map(
              (img, i) => {
                return (
                  <SwiperSlide
                    key={`thumb-${img.idImage}`}>
                    <img src={img.url} alt={img.title} />
                  </SwiperSlide>
                )
              }
            )
          }

        </Swiper >
        <button className='close-modal-btn' onClick={() => setIsModal(!isModal)}><img src={CloseIcon} alt="close button" /></button>
      </div >

      <div className='collage'>
        {
          images.map(
            (img, i) => {
              return (
                <div className='collage-item'
                  key={`img-desk-${img.idImage}`}>
                  <img src={img.url} alt={img.title} />
                </div>
              )
            }
          )
        }
        <button className='view-more-btn' onClick={() => setIsModal(!isModal)}>Ver mas...</button>
      </div>
    </>
  )
}

export default ProductGalleryDesktop;
