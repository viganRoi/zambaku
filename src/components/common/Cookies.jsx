import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
const Cookies = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const {t} = useTranslation();
  
  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
    localStorage.setItem('cookiesAccepted', 'true');
  };

  return (
    <div
      className={`fixed w-full h-32 md:h-24 bg-secondary z-999 rounded-t-4xl flex items-center justify-center transition-all duration-300 shadow-2xl
        ${isVisible ? 'bottom-0' : '-bottom-32 md:-bottom-24'}`}
    >
      <div className='w-11/12 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4'>
        <p className='text-primary md:uppercase axiforma-thin'>{t('cookies')}</p>
        <div className='flex justify-between gap-4'>
          <button
            onClick={() => navigate('/terms')}
            className="text-primary text-sm md:text-base hover:opacity-90 duration-300 text-nowrap axiforma-thin"
          >
            {t('readmore')}
          </button>
          <button
            onClick={handleAccept}
            className="bg-primary text-secondary py-3 px-6 md:px-12 text-sm md:text-base rounded-lg hover:opacity-90 duration-300 text-nowrap axiforma-thin"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cookies;