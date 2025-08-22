import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay'
import { FreeMode, Autoplay } from 'swiper/modules'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

const GalleryCarousel = ({ gallery }) => {
  const swiperRef = useRef(null);
  const isSmallDev = window.innerWidth < 700;


  const handleNext = () => {
    if (swiperRef.current !== null) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current !== null) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className='w-full h-full bg-white flex flex-col items-center justify-center content-center py-10 md:py-0'>
      <div className='relative w-full flex flex-col align-center items-center justify-center'>
        <div className="absolute w-11/12 h-0 flex justify-between p-4 z-10">
          <button
            onClick={handlePrev}
            className="bg-primary transition-all duration-.3s hover:opacity-80 w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
          >
            <SlArrowLeft color="#fff" />
          </button>
          <button
            onClick={handleNext}
            className="bg-primary transition-all duration-.3s  hover:opacity-80 w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
          >
            <SlArrowRight color="#fff" />
          </button>
        </div>
        <Swiper
          ref={swiperRef}
          modules={[FreeMode, Autoplay]}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          centeredSlides={true}
          loopFillGroupWithBlank={true}
          slidesPerGroup={1}
          breakpoints={{
            340: {
              slidesPerView: 1.2,
              spaceBetween: 6
            },
            700: {
              slidesPerView: 1.4,
              spaceBetween: 20
            }
          }}
          style={{ maxWidth: "100%" }}
        >
          {gallery?.map((el) => (
            <SwiperSlide key={el.id}>
              <div className="w-full h-64 md:h-[80vh] relative overflow-hidden shadow-lg">
                <img
                  src={el.image}
                  alt={el.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default GalleryCarousel;
