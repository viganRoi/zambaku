import React from "react";
import { useTranslation } from 'react-i18next'
const GalleryCard = ({ image, title, openModal }) => {
  const{t} = useTranslation()
  return (
    <div className='bg-secondary w-full h-screen relative flex flex-col md:flex-row items-center justify-center'>
      <div className="w-full md:w-1/2 h-full">
        <img src='/assets/images/hero/bck/1.png' alt="" className='h-full w-full object-cover object-left' />
      </div>
      <div className="w-full md:w-1/2 bg-red-400 h-full">
        <img src={image} alt="" className='h-full w-full object-cover object-right' />
      </div>
      <div className='absolute w-11/12 text-black text-center flex flex-col items-center justify-center'>
        <h1 className='w-full valky text-3xl md:text-9xl text-center text-white'>
          {title}
        </h1>
        <button 
          className="md:mt-[-50px] bg-primary text-white min-w-39 h-39 text-nowrap rounded-full transition"
          onClick={() => openModal(image)}
        >
         {t('seemore')}
        </button>
      </div>
    </div>
  );
};

export default GalleryCard;