import React from 'react'
import { useTranslation } from 'react-i18next'
const StaticBannerAbout = () => {
  const { t } = useTranslation()
  return (
    <div className='bg-secondary w-full h-screen flex flex-col items-center justify-center relative'>
      {/* <img src="/assets/images/hero/banner/7.png" alt="" className='absolute top-0 left-0 h-full w-full object-cover' /> */}
      <video
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/assets/video/otrantBg1.mp4"
        autoPlay
        loop
        muted
      />
      <h1 className='absolute z-20 valky text-4xl md:text-8xl text-primary'>{t('longestbeachside')}</h1>
      <div className='absolute w-full h-2/3 flex flex-col items-center justify-center p-4 gap-1 bg-gradient-to-t from-white to-transparent bottom-0 left-0'>
        {/* <p className='hidden md:block pl-14 w-1/2 axiforma-thin tracking-widest md:text-2xl text-white'>{t('longestbeachsidedesc')}</p> */}
      </div>
    </div>
  )
}

export default StaticBannerAbout