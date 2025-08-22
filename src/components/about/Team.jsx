import React, { useRef } from 'react'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { PersonCard } from '../';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import { staff } from '../../utils/server';
import { useTranslation } from 'react-i18next';

const Team = () => {
    const {t} = useTranslation()
    const swiperRef = useRef(null);

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
        <div className={`bg-secondary w-full h-112 md:h-screen flex flex-col items-center justify-center relative`}>
            <img src='/assets/images/hero/banner/2.png' alt="" className='h-full w-full object-cover bg-secondary absolute top-0 left-0' />
            <div className={`absolute top-0 left-0 h-full w-full bg-black opacity-50 z-1`}></div>
            <div className="absolute md:left-[50vw] bottom-14 md:bottom-30 h-0 flex justify-between gap-4 z-10">
                <button onClick={handlePrev} className='bg-secondary text-primary transition-all duration-.3s w-[35px] md:w-[40px] h-[35px] md:h-[40px] radius-50 rounded-[40px] flex items-center justify-center'>
                    <SlArrowLeft />
                </button>
                <button onClick={handleNext} className='bg-secondary text-primary transition-all duration-.3s  w-[35px] md:w-[40px] h-[35px] md:h-[40px] radius-50 rounded-[40px] flex items-center justify-center'>
                    <SlArrowRight />
                </button>
            </div>
            <Swiper
                ref={swiperRef}
                breakpoints={{
                    340: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    700: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    }
                }}
                modules={[FreeMode]}
                loop={true}
                centeredSlides={true}
                loopFillGroupWithBlank={true}
                slidesPerGroup={1}
                style={{
                    maxWidth: "100%",
                }}
            >
                {staff
                    ?.map((el) => {
                        return (
                            <SwiperSlide id='swipeslides' key={el.id}>
                                <PersonCard
                                    key={el.id}
                                    image={el.image}
                                    name={el.name}
                                    surname={el.surname}
                                    position={t(el.position)}
                                />
                            </SwiperSlide>
                        )
                    })}
            </Swiper>
        </div>
    )
}

export default Team