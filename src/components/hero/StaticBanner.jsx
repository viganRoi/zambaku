import React from 'react'
import { useTranslation } from 'react-i18next'
const StaticBanner = () => {
  const {t} = useTranslation()
  return (
    <div className='bg-secondary w-full h-screen flex flex-col items-center justify-center relative'>
      {/* <img src="/assets/images/hero/banner/7.png" alt="" className='absolute top-0 left-0 h-full w-full object-cover' /> */}
      <video
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/assets/video/otrantBg2.mp4"
                autoPlay
                loop
                muted
            />
      <div className='absolute w-full h-full flex flex-col items-start justify-center p-4 gap-1 bg-gradient-to-t from-[#D4BDA8] to-transparent bottom-0 left-0'>
        <h1 className='pl-14 valky text-4xl md:text-8xl text-white'>{t('longestbeachside')}</h1>
        <p className='hidden md:block pl-14 w-1/2 axiforma-thin tracking-widest md:text-2xl text-white'>{t('longestbeachsidedesc')}</p>
      </div>
    </div>
  )
}

export default StaticBanner