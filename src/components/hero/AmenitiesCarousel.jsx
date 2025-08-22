import { useRef, useState } from "react";
import { AmenitiesCard, AmenitiesModal } from "..";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { amenities } from "../../utils/server";
import { useTranslation } from "react-i18next";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl"


const AmenitiesCarousel = () => {
    const { t } = useTranslation();
    const swiperRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAmenity, setSelectedAmenity] = useState(null);

    const handleOpenModal = (amenity) => {
        setSelectedAmenity(amenity);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedAmenity(null);
    };
    const slidePrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const slideNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center content-center py-16 md:py-42 bg-white">
            <div className="w-full md:w-11/12 flex flex-col items-center justify-center text-center gap-4 md:gap-12">
                <h1 className="text-primary text-2xl md:text-5xl valky">
                    {t('premiumAmenities')}
                </h1>
                <div className="absolute w-full left-0 h-0 flex justify-between px-6 md:px-20 z-10">
                    <button
                        onClick={slidePrev}
                        className="bg-primary opacity-80 transition-all duration-300 hover:opacity-100 w-[35px] md:w-[50px] h-[35px] md:h-[50px] rounded-[50px] flex items-center justify-center"
                    >
                        <SlArrowLeft color='#fff' />
                    </button>
                    <button
                        onClick={slideNext}
                        className="bg-primary opacity-80 transition-all duration-300 hover:opacity-100 w-[35px] md:w-[50px] h-[35px] md:h-[50px] rounded-[50px] flex items-center justify-center"
                    >
                        <SlArrowRight color='#fff' />
                    </button>
                </div>
                <Swiper
                    ref={swiperRef}
                    breakpoints={{
                        340: {
                            slidesPerView: 1.5,
                            spaceBetween: 10,
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
                    {amenities?.slice(0, 8).map((el) => {
                        return (
                            <SwiperSlide id="swipeslides" key={el.id}>
                                <AmenitiesCard
                                    key={el.id}
                                    image={el.image}
                                    title={t(el.title)}
                                    desc={t(el.desc)}
                                    onClick={() => handleOpenModal(el)}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <AmenitiesModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    amenity={selectedAmenity}
                />
            </div>
        </div>
    )
}

export default AmenitiesCarousel