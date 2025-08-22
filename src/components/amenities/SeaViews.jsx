import React from 'react'
import { useTranslation } from 'react-i18next'
const SeaViews = () => {
  const{t} = useTranslation()
  return (
    <div className='w-full h-full bg-white flex items-end justify-center relative'>
      <div className="w-11/12 h-full py-8 md:py-20 flex flex-col justify-end items-end">
        <img src="/assets/images/amenities/8.png" alt="" className='w-full md:w-2/3 h-full md:h-148 object-cover' />
        <div className='flex flex-col w-full md:w-1/2 py-4 md:py-12 gap-4'>
          <div className='flex items-center gap-4 h-20'>
            <svg width="70" height="70" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M59.7566 34.0148C58.7876 24.0744 49.2588 13.3574 35.0465 14.2893C21.3186 15.0659 13.7279 26.0936 13.2434 34.0148H59.7566ZM17.927 15.3766C22.6106 11.6489 27.7788 9.62977 33.7544 9.00849V0H39.0841V9.00849C45.0597 9.62977 50.2279 11.6489 54.9115 15.3766C57.0111 13.2021 59.2721 11.0276 61.3717 9.00849C62.6637 10.251 63.9557 11.4936 65.2478 12.7361C63.1482 14.7553 60.8872 16.7744 58.7876 18.9489C62.5022 23.4531 64.6018 28.4233 65.2478 34.1701H73V39.2957H0V34.1701H7.59071C8.23672 28.4233 10.4978 23.4531 14.2124 19.1042C11.9513 16.9297 9.69026 14.9106 7.59071 12.7361C8.88274 11.4936 10.1748 10.251 11.4668 9.00849C13.5664 11.0276 15.8274 13.2021 17.927 15.3766Z" fill="#0F3752" />
              <path d="M64.9238 50.7896H8.07422V45.6641H64.9238V50.7896Z" fill="#0F3752" />
              <path d="M55.396 62.438H16.1504V57.4678H55.396V62.438Z" fill="#0F3752" />
              <path d="M49.2579 73H23.7402V67.8745H49.2579V73Z" fill="#0F3752" />
            </svg>
            <h1 className='valky text-2xl md:text-4xl text-primary'>{t('seaviews')}</h1>
          </div>
          <p className='md:text-lg axiforma-thin text-primary md:tracking-widest'>{t('seaviewsdesc')}</p>
        </div>
      </div>
      <img src="/assets/images/amenities/9.png" alt="" className='hidden md:block absolute left-40 bottom-20 h-3/4' />
    </div>
  )
}

export default SeaViews