import React, { useEffect, useRef, useState } from 'react'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { GalleryCard } from '../';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import { gallery } from '../../utils/server';
import ImageModal from '../cards/ImageModal';
import { useTranslation } from 'react-i18next';

const Gallery = () => {
    const {t} = useTranslation()
    const swiperRef = useRef(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [isModalOpen]);

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

    // Collect all images from gallery data
    const allImages = gallery.map(el => el.image);

    // Function to open modal with selected image
    const openModal = (image) => {
        setSelectedImage(image);
        setModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center">
            <div className="relative w-full h-full flex justify-center items-center">
                <div className="absolute w-full left-0 h-0 flex justify-between px-4 z-10">
                    <button onClick={handlePrev} className='bg-primary transition-all duration-.3s hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center'>
                        <SlArrowLeft color='#fff' />
                    </button>
                    <button onClick={handleNext} className='bg-primary transition-all duration-.3s  hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center'>
                        <SlArrowRight color='#fff' />
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
                    {gallery
                        ?.map((el) => {
                            return (
                                <SwiperSlide id='swipeslides' key={el.id}>
                                    <GalleryCard
                                        key={el.id}
                                        image={el.image}
                                        title={t(el.title)}
                                        openModal={openModal} // Pass openModal to GalleryCard
                                    />
                                </SwiperSlide>
                            )
                        })}
                </Swiper>
            </div>

            {isModalOpen && (
                <ImageModal
                    images={allImages}
                    selectedImage={selectedImage}
                    closeModal={closeModal}
                />
            )}
        </div>
    )
}

export default Gallery