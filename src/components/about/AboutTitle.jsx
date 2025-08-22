import React from 'react'
import { IoLogoWhatsapp } from "react-icons/io";

const AboutTitle = ({ image, aboutTitle, aminitiesTitle }) => {
    return (
        <div className={`bg-white w-full h-64 md:h-screen flex flex-col items-center justify-center relative`}>
            <img src={image} alt="" className='h-full w-full object-cover bg-secondary absolute top-0 left-0' />
            <div className={`absolute top-0 left-0 h-full w-full bg-black opacity-50 z-10`}></div>
            <div className='w-11/12 md:w-5/6 text-black text-center flex flex-col items-center justify-center relative gap-4 z-20'>
                <h1 className={`w-1/2 valky text-2xl md:text-7xl text-center text-white`}>
                    {aboutTitle}
                </h1>
                <h1 className={`w-full valky text-3xl md:text-[200px] text-center text-white`}>
                    {aminitiesTitle}
                </h1>
            </div>
                        <button className='absolute bottom-2 md:bottom-10 right-2 md:right-10 m-4 p-4 border border-2 border-secondary bg-transparent hover:bg-secondary text-base md:text-2xl text-secondary hover:text-primary hover:scale-150 duration-300 rounded-full cursor-pointer z-20'>
                            <IoLogoWhatsapp />
                        </button>
        </div>
    )
}

export default AboutTitle