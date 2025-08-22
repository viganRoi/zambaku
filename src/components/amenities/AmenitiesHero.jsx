import React from 'react'
import { useTranslation } from "react-i18next";
const AmenitiesHero = () => {
     const { t} = useTranslation();
    return (
        <div className='w-full h-full md:h-screen bg-white flex items-center justify-center relative'>
            <div className="w-11/12 h-full py-12 md:py-40 flex flex-col md:flex-row items-start justify-between">
                <div className='w-full md:w-1/2 h-full flex flex-col items-start justify-start gap-2 md:gap-4'>
                    <h1 className='w-2/3 text-4xl md:text-7xl valky text-primary'>{t('Lifewithinthecomplex')}</h1>
                    <p className='w-1/2 axiforma-thin text-primary'>{t('Lifewithinthecomplexdesc')}</p>
                </div>
                <div className='w-full md:w-1/2 h-full flex flex-col items-end justify-start gap-2 md:gap-4 text-left'>
                    <img src="/assets/images/amenities/4.png" alt="" className='w-full h-48 md:h-2/3 object-cover' />
                    <p className='w-3/4 axiforma-thin text-primary'>{t('Lifewithinthecomplexdesc2')}</p>
                </div>
            </div>
            <img
                src="/assets/images/amenities/humans.png"
                alt=""
                className='absolute h-96 md:h-11/12 top-10 right-0 md:top-auto md:right-auto'
            />
        </div>
    )
}

export default AmenitiesHero