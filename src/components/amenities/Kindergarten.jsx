import React from 'react'
import { useTranslation } from 'react-i18next'
const Kindergarten = () => {
    const { t} = useTranslation();
  return (
    <div className='relative bg-white w-full h-146 md:h-screen flex items-start justify-center'>
      <h1 className='valky text-4xl md:text-9xl text-primary mt-8 md:mt-20 uppercase'>{t('kindergarten')}</h1>
      <img src="/assets/images/amenities/children.png" alt="" className='absolute h-64 md:h-2/3 top-8 md:top-20 md:left-3/8 object-contain' />
      <div className="absolute bottom-0 md:left-3/5">
        <div className="w-full md:w-5/6 text-center p-6 md:p-12 text-primary">
          <p className='text-base md:text-lg axiforma-thin uppercase text-left'>{t('kindergartendesc')}</p>
        </div>
      </div>
    </div>
  )
}

export default Kindergarten