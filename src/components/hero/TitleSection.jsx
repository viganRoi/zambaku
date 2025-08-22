import React from 'react'
import { useTranslation } from 'react-i18next'

const TitleSection = ({ image, title, subtitle, content }) => {
    const {t} = useTranslation()
    return (
        <div className={`bg-white w-full h-64 md:h-96 flex flex-col items-center justify-center relative`}>
            <div className={`absolute top-0 left-0 h-64 md:h-96 w-full`}>
                <img src={image} alt="" className='h-full w-full object-cover bg-white' />
            </div>
            <div className='w-11/12 md:w-5/6 text-black text-center flex flex-col items-center justify-center relative gap-2 md:gap-4'>
                <p className='axiforma text-sm md:text-lg text-center text-primary'>
                    {subtitle}
                </p>
                <h1 className='w-4/6 valky text-3xl md:text-5xl text-center text-primary'>
                    {title}
                </h1>
                <p className='axiforma-thin text-sm md:text-lg text-center text-primary'>
                    {content}
                </p>
            </div>
        </div>
    )
}

export default TitleSection