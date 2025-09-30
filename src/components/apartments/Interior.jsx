import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const Interior = ({ images }) => {
    const swiperRef = useRef(null);
    const [swiper, setSwiper] = useState(null);
    const trackRef = useRef(null);
    const handleRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const s = swiper;
        if (!s) return;

        const updateProgress = () => {
            const slidesCount = (s.slides && s.slides.length) || 1;
            const lastIndex = Math.max(slidesCount - 1, 1);
            const idx = typeof s.realIndex === 'number' ? s.realIndex : (typeof s.activeIndex === 'number' ? s.activeIndex : 0);
            setProgress(lastIndex === 0 ? 0 : idx / lastIndex);
        };

        updateProgress();

        s.on && s.on('slideChange', updateProgress);
        s.on && s.on('update', updateProgress);

        return () => {
            s.off && s.off('slideChange', updateProgress);
            s.off && s.off('update', updateProgress);
        };
    }, [swiper]);

    const onHandleClick = () => {
        const s = swiperRef.current || swiper;
        if (!s) return;
        // const slidesCount = Math.max((slides && slides.length) || (s.slides && s.slides.length) || 1, 1);
        const slidesCount = s.slides ? s.slides.length : 1;
        const current = typeof s.realIndex === 'number' ? s.realIndex : (typeof s.activeIndex === 'number' ? s.activeIndex : 0);
        const lastIndex = slidesCount - 1;
        const duration = 600;

        if (s.params && s.params.loop) {
            s.slideNext(duration);
            const next = (current + 1) % slidesCount;
            setProgress(lastIndex === 0 ? 0 : next / lastIndex);
            setCurrentIndex(next);
            return;
        }

        const nextIndex = current >= lastIndex ? 0 : current + 1;
        setProgress(lastIndex === 0 ? 0 : nextIndex / lastIndex);
        setCurrentIndex(nextIndex);
        try {
            s.slideTo(nextIndex, duration);
        } catch (e) {
            try { s.slideTo(nextIndex); } catch (er) { s.slideNext && s.slideNext(); }
        }
    };
    const slides = [
        (
            <div className='w-full h-full flex text-white relative gap-12'>
                <div className='w-1/2 h-full'>
                    <h1 className='text-secondary text-[48px] font-semibold montserrat'>Një Pamje që Flet Vetë</h1>
                    <p className='montserrat text-[24px]'>Galeria e Zambaku Residence sjell në fokus arkitekturën moderne, hapësirat e brendshme elegante dhe ambientin e jashtëm të harmonizuar me natyrën. Çdo fotografi pasqyron stilin e jetesës që ju pret – të bukur, të qetë dhe plot cilësi.</p>
                </div>
                <div className='w-1/2 h-full'>
                    <img
                        className="w-full object-cover h-146"
                        src="/projektet/assets/images/apartments/4.jpg"
                        alt=""
                    />
                </div>
                <img
                    src="/projektet/assets/images/apartments/5.jpg"
                    alt=""
                    className='absolute top-100 left-1/3 w-4/12'
                />
            </div>
        ), (
            <div className='w-full h-full flex items-center justify-end'>
                <div className='w-2/3 h-full flex flex-col justify-start items-start'>
                    <img
                        className="h-96 object-contain"
                        src="/projektet/assets/images/apartments/2.png"
                        alt=""
                    />
                    <div className='w-full h-full text-white'>
                        <h1 className='text-secondary text-[48px] font-semibold montserrat'>Zbuloni elegancën në detaje</h1>
                        <p className='montserrat text-[24px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus harum, reiciendis placeat eos rem tempora praesentium sunt. Corrupti architecto rerum veniam obcaecati mollitia odit tempora culpa, molestias quibusdam, quos suscipit laboriosam dignissimos. Itaque, deleniti? Unde, quas! Accusamus quo quibusdam asperiores.</p>
                    </div>
                </div>
            </div>
        ), (
            <div className='relative w-full h-full flex items-center justify-start'>
                <img
                    className="w-3/4 h-146 object-cover"
                    src="/projektet/assets/images/apartments/3.png"
                    alt=""
                />
                <img
                    className="absolute right-0 w-1/3 h-86 object-cover"
                    src="/projektet/assets/images/apartments/3.png"
                    alt=""
                />
            </div>
        ), (
            <div className='w-full h-full flex items-start justify-end text-white'>
                <div className='w-1/2 h-full'>
                    <h1 className='text-secondary text-[48px] font-semibold montserrat'>Një Pamje që Flet Vetë</h1>
                    <p className='montserrat text-[24px]'>Galeria e Zambaku Residence sjell në fokus arkitekturën moderne, hapësirat e brendshme elegante dhe ambientin e jashtëm të harmonizuar me natyrën. Çdo fotografi pasqyron stilin e jetesës që ju pret – të bukur, të qetë dhe plot cilësi.</p>
                </div>
                <div className='w-1/2 h-full'>
                    <img className="w-full h-full object-cover" src="/projektet/assets/images/apartments/4.jpg" alt="" />
                </div>
            </div>
        ), (
            <div className='w-full h-full flex'>
                <img className="w-full h-156 object-contain" src="/projektet/assets/images/apartments/5.jpg" alt="" />
            </div>
        ),
    ];

    return (
        <div className='w-full h-full flex flex-col items-center justify-center py-36'>
            <div className="base-width flex flex-col gap-6">
                {images &&
                    images.reduce((rows, image, index) => {
                        if (index % 3 === 0) {
                            rows.push([image]);
                        } else if (index % 3 === 1) {
                            rows.push([image, images[index + 1]].filter(Boolean));
                        }
                        return rows;
                    }, []).map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className={`grid gap-6 ${row.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}
                        >
                            {row.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`Project image ${rowIndex + 1}-${i + 1}`}
                                    className="w-full object-cover aspect-[16/9]"
                                />
                            ))}
                        </div>
                    ))}
            </div>
            <div className="relative base-width h-full flex flex-col gap-6 py-24 overflow-hidden">
                <Swiper
                    onSwiper={(s) => { swiperRef.current = s; setSwiper(s); }}
                    navigation
                    breakpoints={{
                        340: {
                            slidesPerView: 1,
                            spaceBetween: 6
                        },
                        700: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        }
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper h-full"
                    style={{
                        maxWidth: "100%",
                        maxHeight: '70vh'
                    }}
                >
                    {slides.map((slideContent, index) => (
                        <SwiperSlide key={index} className="flex items-center justify-center h-[70vh]">
                            {slideContent}
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div
                    ref={trackRef}
                    className="absolute left-1/2 -translate-x-1/2 bottom-6 base-width h-20 flex items-center justify-center pointer-events-auto"
                    style={{ zIndex: 60 }}
                >
                    <div className="relative w-full h-1 bg-white/30 rounded-full">
                        <div
                            style={{ width: `${progress * 100}%` }}
                            className="absolute left-0 top-0 h-full rounded-full bg-secondary"
                        />
                        <div
                            ref={handleRef}
                            role="slider"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Math.round(progress * 100)}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onHandleClick();
                                }
                            }}
                            onClick={onHandleClick}
                            className="absolute top-16/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-secondary shadow-lg flex items-center justify-center cursor-pointer"
                            style={{
                                left: `${progress * 100}%`,
                                transform: 'translate(-50%, -50%)',
                                transition: 'left 600ms ease'
                            }}
                        >
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12.2349L5 12.2349M19 12.2349L13 18.2349M19 12.2349L13 6.23486" stroke="#00345B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Interior