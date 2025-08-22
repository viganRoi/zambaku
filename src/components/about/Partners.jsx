import React, { useRef } from "react";
import { PartnerCard } from "..";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { partners } from "../../utils/server";
import { useTranslation } from "react-i18next";
const Partners = () => {
    const swiperRef = useRef(null);
    const { t } = useTranslation()

    return (
        <div className="relativew-full h-full flex flex-col items-center justify-center content-center py-6 md:py-12 bg-white">
            <div className="absolute h-full w-full bg-gradient-to-t from-[#D4BDA8] to-transparent">
            </div>
            <div className="w-full md:w-11/12 flex flex-col items-start justify-center gap-2 md:gap-4 bg-white">
                <h1 className="ml-6 md:ml-0 text-primary text-lg md:text-xl axiforma-thin">
                    {t('partners')}
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
                    {partners?.slice(0, 8).map((el) => {
                        return (
                            <SwiperSlide id="swipeslides" key={el.id}>
                                <PartnerCard
                                    key={el.id}
                                    title={el.title}
                                    text={el.text}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}

export default Partners 