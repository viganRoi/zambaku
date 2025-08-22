import React from 'react';
import { AiFillTikTok } from 'react-icons/ai';
import { FaFacebook, FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa';
import { ImLinkedin } from 'react-icons/im';
import { RiInstagramFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
const ContactHero = () => {
    const {t} = useTranslation()
    return (
        <div className="w-full h-full md:h-screen flex font-serif flex-col md:flex-row">
            <div className="relative w-full md:w-3/5 bg-secondary text-primary flex flex-col justify-between">
                <img src='/assets/images/hero/bck/1.png' alt="" className='h-full w-full object-cover absolute z-1' />
                <div className='w-full flex z-2 p-4 md:p-20 flex-col'>
                    <div>
                        <p className="uppercase md:text-lg mb-1 axiforma-thin">{t('contact')}</p>
                        <p className="text-sm md:text-base axiforma-thin text-dark">Sales Office</p>
                    </div>
                </div>
                <div className='w-full flex z-2 flex-col items-center justify-center md:ml-60 md:mb-40'>
                        <h1 className="text-xl md:text-7xl valky">+383 49 100 109</h1>
                        <p className="md:text-xl valky">info@otrantreef.com</p>
                </div>
                <div className='z-2 p-4 md:p-20'>
                    <div className="">
                        <p className="uppercase md:text-lg mb-1 axiforma-thin">{t('monfri')}</p>
                        <p className="text-sm md:text-base axiforma-thin text-dark">10:00–19:00</p>
                        <p className="uppercase md:text-lg mt-4 mb-1 axiforma-thin">{t('sat')}</p>
                        <p className="text-sm md:text-base axiforma-thin text-dark">10:00–18:00</p>
                        <p className="uppercase md:text-lg mt-4 mb-1 axiforma-thin">{t('sun')}</p>
                        <p className="text-sm md:text-base axiforma-thin text-dark">{t('byappointment')}</p>
                    </div>
                    <div className="w-full flex gap-4 justify-center">
                        <a href="#" className="text-primary text-2xl opacity-40 hover:opacity-90 duration-300">
                            <FaFacebook />
                        </a>
                        <a href="#" className="text-primary text-2xl opacity-40 hover:opacity-90 duration-300">
                            <RiInstagramFill />
                        </a>
                        <a href="#" className="text-primary text-2xl opacity-40 hover:opacity-90 duration-300">
                            <ImLinkedin />
                        </a>
                        <a href="#" className="text-primary text-2xl opacity-40 hover:opacity-90 duration-300">
                            <AiFillTikTok />
                        </a>
                        <a href="#" className="text-primary text-2xl opacity-40 hover:opacity-90 duration-300">
                            <FaYoutube />
                        </a>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-2/5 h-full">
                <img
                    src="/assets/images/hero/banner/5.png"
                    alt="Architectural View"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default ContactHero;
