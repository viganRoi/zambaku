import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { TfiClose } from 'react-icons/tfi';
import './button.css';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

const ImageModal = ({ images, selectedImage, closeModal }) => {
    const initialSlide = images.indexOf(selectedImage);
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
        <div className="fixed inset-0 bg-bckModal flex justify-center items-center overflow-auto z-[999]">
            <div className="relative h-[90%] w-[80%] flex justify-center items-center">
                <button
                    className="absolute top-5 right-5 cursor-pointer text-white bg-transparent flex items-center justify-center rounded-full h-10 w-10 z-[999999] text-xl md:text-3xl"
                    onClick={closeModal}
                >
                    <TfiClose color="#fff" />
                </button>
                <Swiper
                    ref={swiperRef}
                    initialSlide={initialSlide}
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image}
                                alt={`Slide ${index}`}
                                className="w-full h-[90vh] object-contain object-center"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="absolute w-full h-[0px] flex justify-center items-center z-1">
                    <div className="absolute w-11/12 h-0 flex justify-between px-4">
                        <button onClick={handlePrev} className='bg-gold cursor-pointer z-[99999] transition-all duration-.3s hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center'>
                            <SlArrowLeft color='var(--brand-color)' />
                        </button>
                        <button onClick={handleNext} className='bg-gold cursor-pointer z-[99999] transition-all duration-.3s  hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center'>
                            <SlArrowRight color='var(--brand-color)' />
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ImageModal;
