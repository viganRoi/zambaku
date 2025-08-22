import React from 'react'

const TitleSectionScreen = ({ image, title, subtitle, content }) => {
    return (
        <div className={`bg-white w-full h-[60vh] md:h-[120vh] flex flex-col items-center justify-center relative`}>
            <div className={`absolute top-0 left-0 h-full md:h-[120vh]  w-full`}>
                <img src={image} alt="" className='h-full w-full object-cover bg-white' />
            </div>
            <div className='w-11/12 md:w-5/6 text-black text-center flex flex-col items-center justify-center relative gap-4'>
                <p className='axiforma-thin text-sm md:text-lg text-center text-primary'>
                    {subtitle}
                </p>
                <h1 className='md:w-1/2 valky text-xl md:text-4xl text-center text-primary'>
                    {title}
                </h1>
                <p className='axiforma-thin text-sm md:text-lg text-center text-primary'>
                    {content}
                </p>
            </div>
        </div>
    )
}

export default TitleSectionScreen