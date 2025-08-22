import React from 'react'
import { IoLogoWhatsapp } from 'react-icons/io'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';
const Banner = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center">
            <video
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/assets/video/banner.mp4"
                autoPlay
                loop
                muted
            />
            <div className={`absolute top-0 left-0 h-full w-full bg-black opacity-50 z-10`}></div>
            <div className='relative h-full w-11/12 text-black text-center flex flex-col justify-center items-center md:items-end relative z-20'>
                <h1 className={`w-2/3 md:w-1/2 valky text-4xl md:text-7xl md:text-right text-white mb-64 md:mb-0`}>
                    {t('homepage')}
                </h1>
                <button
                    onClick={() => navigate('/buildings')}
                    className="absolute top-144 md:top-164 left-24 md:left-[30%] w-24 md:w-44 h-24 md:h-44 transform -translate-x-1/2 -translate-y-1/2
                        bg-[rgba(255,255,255,0.21)] backdrop-blur-sm border border-white rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.1)]
                        text-white text-xs md:text-xl hover:bg-primary duration-300"
                >
                    {t('residents')}
                </button>
            </div>
            <div className='absolute axiforma-thin uppercase bottom-2 md:bottom-4 text-sm md:text-xl opacity-60 text-white w-full z-20 flex flex-col items-center justify-center'>
                <p>{t('location')}</p>
                <p>Montenegro,ulcinj</p>
            </div>
            {/* <button className='absolute bottom-2 md:bottom-10 right-2 md:right-10 m-4 p-4 border border-2 border-secondary bg-transparent hover:bg-secondary text-base md:text-2xl text-secondary hover:text-primary hover:scale-150 duration-300 rounded-full cursor-pointer z-20'>
                <IoLogoWhatsapp />
            </button> */}
        </div>
    )
}

export default Banner