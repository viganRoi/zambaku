import React from 'react';
import { useTranslation } from 'react-i18next';
const Contact = () => {
    const { t } = useTranslation();

    return (
        <div className="relative w-full h-[120vh] md:h-[200vh] bg-gray-100 flex flex-col items-center justify-center p-4 ">
            <img src="/assets/images/hero/1.png" alt="" className='absolute w-full h-full object-cover' />
            <div className='absolute w-full h-full bg-gradient-to-b from-[#D4BDA8] to-transparent'>

            </div>
            <div className="relative w-11/12 md:w-3/5 md:min-h-screen bg-white p-6 md:p-24 rounded-lg shadow-md text-center text-primary ">
                <div className='flex items-center justify-between'>
                    <h1 className="hidden md:block valky text-4xl text-left">{t('trustusto')}<br />{t('guideyou')}</h1>
                    <h1 className="hidden md:block valky text-4xl text-right">{t('toyour')}<br />{t('futurehome')}</h1>
                    <h1 className='md:hidden valky text-4xl'>TRUST US TO GUIDE YOU</h1>
                </div>
                <div className='flex items-center justify-center my-12 md:my-16'>
                    <p className="text-primary axiforma-thin text-sm md:text-lg">
                        {t('specialistdesc')}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className='flex flex-col md:flex-row gap-4 w-full'>
                    <input type="text" name="" id="" className='w-full border border-primary h-12 md:h-24 uppercase flex items-center justify-center text-center p-4' placeholder={t('emri')} />
                    <input type="text" name="" id="" className='w-full border border-primary h-12 md:h-24 uppercase flex items-center justify-center text-center p-4' placeholder={t('mbiemri')} />
                    </div>
                    <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" className='w-full border border-primary h-12 md:h-24 uppercase flex items-center justify-center text-center p-4' placeholder={t('phone')} />
                    <input type="email" id="email" name="email" className='w-full border border-primary h-12 md:h-24 uppercase flex items-center justify-center text-center p-4' placeholder={t('email')} />
                    <textarea id='message' className='w-full border border-primary h-24 uppercase flex items-center justify-center text-center p-4' placeholder={t('message')} />
                    <button className="relative uppercase inline-flex items-center justify-center w-full px-12 py-3 overflow-hidden axiforma-thin text-white bg-primary rounded-lg group">
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-tertiary rounded-full group-hover:w-full group-hover:h-56"></span>
                        <span className="relative">{t('request')}</span>
                    </button>
                </div>
                <div className="my-12 md:my-16 flex items-center justify-center">
                    <p className="md:w-2/3 text-sm axiforma-thin text-dark">
                      {t('formdesc')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;