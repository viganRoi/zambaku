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
    const [progress, setProgress] = useState(0); // 0..1

    // Attach listeners when swiper instance becomes available
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

    // Advance-only button behavior: on click, advance to next slide; if last slide, go to start
    const onHandleClick = () => {
        const s = swiperRef.current || swiper;
        if (!s) return;
        const slidesCount = Math.max(images?.length || (s.slides && s.slides.length) || 1, 1);
        const current = typeof s.realIndex === 'number' ? s.realIndex : (typeof s.activeIndex === 'number' ? s.activeIndex : 0);
        const lastIndex = slidesCount - 1;
        const duration = 600;

        if (s.params && s.params.loop) {
            // loop mode: just call slideNext
            s.slideNext(duration);
            // optimistic progress update
            const next = (current + 1) % slidesCount;
            setProgress(lastIndex === 0 ? 0 : next / lastIndex);
            return;
        }

        const nextIndex = current >= lastIndex ? 0 : current + 1;
        setProgress(lastIndex === 0 ? 0 : nextIndex / lastIndex);
        // prefer slideTo for exact positioning
        try {
            s.slideTo(nextIndex, duration);
        } catch (e) {
            // fallback
            try { s.slideTo(nextIndex); } catch (er) { s.slideNext && s.slideNext(); }
        }
    };

    // derive slides from images prop; fallback to a small default set when images is empty
    const fallbackSlides = [
        '/projektet/assets/images/apartments/1.png',
        '/projektet/assets/images/apartments/3.png',
        '/projektet/assets/images/apartments/4.jpg',
    ];
    const slideSources = (images && images.length) ? images : fallbackSlides;

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
            <div className="relative base-width h-screen flex flex-col gap-6 py-12 overflow-x-hidden">
                <Swiper
                    onSwiper={(s) => { swiperRef.current = s; setSwiper(s); }}
                    onProgress={() => { /* handled via effect */ }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {slideSources.map((src, index) => (
                        <SwiperSlide key={index}>
                            {typeof src === 'string' ? (
                                <div>
                                    <img src={src} alt={`Slide ${index + 1}`} className="w-full object-cover" />
                                </div>
                            ) : (
                                // if images array contains react nodes or objects, render directly
                                src
                            )}
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
                                // allow Enter/Space to activate the advance behavior
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onHandleClick();
                                }
                            }}
                            onClick={onHandleClick}
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-secondary shadow-lg flex items-center justify-center cursor-pointer"
                            // style={{ 
                            //     left: `${progress * 100}%`, 
                            //     transform: 'translate(-50%, -50%)',
                            //      transition: 'left 600ms cubic-bezier(0.22,0.9,0.35,1)' 
                            //    }}
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