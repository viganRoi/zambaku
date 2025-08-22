import React, { useRef } from "react";
import { ApartmentCard } from "..";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ApartmentsCarousel = ({ data }) => {
  const { t } = useTranslation()
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center content-center  bg-white">
      <div className="w-full md:w-11/12 flex flex-col items-start justify-center gap-4 bg-white py-12 z-20">
        <h1 className="text-primary text-xl axiforma-thin ml-4">
          {t('similiarresidences')}
        </h1>
        <Swiper
          ref={swiperRef}
          breakpoints={{
            340: {
              slidesPerView: 1.5,
              spaceBetween: 4,
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          modules={[FreeMode]}
          loop={true}
          style={{
            maxWidth: "100%",
          }}
        >
          {data?.slice(0, 8).map((el) => {
            return (
              <SwiperSlide id="swipeslides" key={el.id}>
                <ApartmentCard
                  key={el.id}
                  object={el.apartmentNumber}
                  category={el.category}
                  image={el.name}
                  title={el.name}
                  sqft={el.netoSquare}
                  bedroom={el.rooms}
                  navigateTo={() => navigate(`/apartments/${el.id}`)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ApartmentsCarousel;
