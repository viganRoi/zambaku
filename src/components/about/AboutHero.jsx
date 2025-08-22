import React from 'react'
import { useTranslation } from "react-i18next";
import { IoLogoWhatsapp } from 'react-icons/io';

const AboutHero = () => {
    const { t } = useTranslation();
    return (
        <div className='h-full w-full bg-white flex flex-col items-center justify-center relative'>
            <img src="/assets/images/hero/1.png" alt="" className='hidden md:block h-full md:h-196 w-2/6 z-22 absolute object-cover object-center md:object-left' />
            <div className='bg-white w-full h-screen flex flex-col items-center justify-center relative'>
                <video
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src="/assets/video/banner.mp4"
                    autoPlay
                    loop
                    muted
                />
                <div className={`absolute top-0 left-0 h-full w-full bg-black opacity-50 z-10`}></div>
                <div className='w-11/12 md:w-5/6 text-black text-center flex flex-col items-center justify-center relative gap-4 z-20'>
                    <h1 className={`w-1/2 valky text-2xl md:text-7xl text-center text-white`}>
                        {t('beautyofMontengero')}
                    </h1>
                </div>
                <button className='hidden md:flex absolute bottom-2 md:bottom-10 right-2 md:right-10 m-4 p-4 border border-2 border-secondary bg-transparent hover:bg-secondary text-base md:text-2xl text-secondary hover:text-primary hover:scale-150 duration-300 rounded-full cursor-pointer z-20'>
                    <IoLogoWhatsapp />
                </button>
            </div>
            <div className='hidden md:flex h-124 md:h-164 w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-10'>
                <h1 className='valky text-primary text-2xl md:text-5xl'>{t('designedwith')}</h1>
                <div className='w-full md:w-2/5 h-64 md:h-full relative'>
                    {/* <img src="/assets/images/hero/1.png" alt="" className='h-full md:h-196 w-full z-1 absolute object-cover object-center md:object-left' /> */}
                </div>
                <h1 className='valky text-primary text-2xl md:text-5xl'>{t('youinmind')}</h1>
            </div>
            <div className='relative h-146 md:h-screen w-full flex items-center justify-center '>
                <h1 className='w-1/2 md:w-1/3 absolute top-30 text-white text-xl md:text-7xl valky text-center'>{t('ulcinjhistory')}</h1>
                <img src="/assets/images/about/ulqBck.png" alt="" className='w-full h-full object-cover' />
                <div className='absolute bottom-0 w-full md:w-1/2 h-auto md:h-1/2 p-4 md:p-20 flex items-center justify-center bg-[#CBB79E] text-center'>
                    <p className="text-primary axiforma-thin uppercase text-center text-sm md:text-2xl">
                        {t('ulcinjhistorydesc')}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutHero