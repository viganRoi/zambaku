import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const Interior = ({ images }) => {
    const swiperRef = useRef(null);
    const trackRef = useRef(null);
    const handleRef = useRef(null);
    const [progress, setProgress] = useState(0); // 0..1

    useEffect(() => {
        const swiper = swiperRef.current;
        if (!swiper) return;

        const updateProgress = () => {
            // determine logical slide count (real slides) - prefer realIndex if available
            const realCount = swiper.slides && swiper.slides.length ? (swiper.slides.length) : 1;
            const total = Math.max(realCount - 1, 1);
            const idx = typeof swiper.realIndex === 'number' ? swiper.realIndex : (typeof swiper.activeIndex === 'number' ? swiper.activeIndex : 0);
            setProgress(total === 0 ? 0 : idx / total);
        };

        // initial
        updateProgress();

        swiper.on('slideChange', updateProgress);
        swiper.on('update', updateProgress);

        return () => {
            if (swiper && swiper.off) {
                swiper.off('slideChange', updateProgress);
                swiper.off('update', updateProgress);
            }
        };
    }, [swiperRef.current]);

    // Advance-only button behavior: on click, advance to next slide; if last slide, go to start
    const onHandleClick = () => {
        const swiper = swiperRef.current;
        if (!swiper) return;
        const totalSlides = Math.max(swiper.slides.length, 1);
        const current = typeof swiper.realIndex === 'number' ? swiper.realIndex : (typeof swiper.activeIndex === 'number' ? swiper.activeIndex : 0);
        const lastIndex = totalSlides - 1;
        const duration = 600;
        // If loop is enabled, slideNext handles wrap automatically; otherwise, wrap manually
        if (swiper.params && swiper.params.loop) {
            // optimistic UI: move progress to next visual index (realIndex + 1)
            const next = current + 1;
            const pct = lastIndex === 0 ? 0 : (next % totalSlides) / lastIndex;
            setProgress(pct);
            swiper.slideNext(duration);
        } else {
            const nextIndex = current >= lastIndex ? 0 : current + 1;
            const pct = lastIndex === 0 ? 0 : nextIndex / lastIndex;
            setProgress(pct);
            // use slideNext when possible for smoother behavior
            if (typeof swiper.slideNext === 'function') {
                swiper.slideNext(duration);
                // if we wrapped to 0, ensure slideTo(0) when current was last
                if (current >= lastIndex) {
                    // small timeout ensures animation sequencing
                    setTimeout(() => { try { swiper.slideTo(0, duration); } catch (e) {} }, duration + 10);
                }
            } else {
                try { swiper.slideTo(nextIndex, duration); } catch (e) { swiper.slideTo(nextIndex); }
            }
        }
    };

    const slides = [
        (<div><img src="/projektet/assets/images/apartments/1.png" alt="" /></div>),
        (<div><img src="/projektet/assets/images/apartments/2.png" alt="" /></div>),
        (<div><img src="/projektet/assets/images/apartments/3.png" alt="" /></div>),
        (<div><img src="/projektet/assets/images/apartments/4.jpg" alt="" /></div>),
        (<div><img src="/projektet/assets/images/apartments/5.jpg" alt="" /></div>),
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
                                    // src={`${API_URL}${img}`}
                                    src={img}
                                    alt={`Project image ${rowIndex + 1}-${i + 1}`}
                                    className="w-full object-cover aspect-[16/9]"
                                />
                            ))}
                        </div>
                    ))}
            </div>
            <div className="relative base-width h-screen flex flex-col gap-6 py-12">
                <Swiper
                    onSwiper={(s) => { swiperRef.current = s; }}
                    onProgress={() => { /* handled via effect */ }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {slides.map((slideContent, index) => (
                        <SwiperSlide key={index}>
                            {slideContent}
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div
                    ref={trackRef}
                    className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[90%] h-20 flex items-center justify-center pointer-events-auto"
                    style={{ zIndex: 60 }}
                >
                    <div className="relative w-full h-4 bg-white/50 rounded-full">
                        <div
                            style={{ width: `${progress * 100}%` }}
                            className="absolute left-0 top-0 h-full rounded-full bg-transparent"
                        />
                        <div
                            ref={handleRef}
                            role="slider"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Math.round(progress * 100)}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                // allow Enter/Space to activate the advance behavior
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onHandleClick();
                                }
                            }}
                            onClick={onHandleClick}
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer"
                            style={{ left: `${progress * 100}%`, transform: 'translate(-50%, -50%)', transition: 'left 600ms cubic-bezier(0.22,0.9,0.35,1)' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Interior