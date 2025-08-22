import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoLogoWhatsapp } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';

const NavFooter = ({ darkBackground = true }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const triggerPoint = darkBackground ? window.innerHeight : window.innerHeight;
            if (window.scrollY > triggerPoint) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`md:hidden fixed bottom-0 left-0 w-full z-100 flex items-end justify-end gap-4
                transition-opacity duration-500 
                ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <button
                onClick={() => navigate('/buildings')}
                className="z-[99999] absolute w-24 md:w-44 h-24 transform -translate-x-1/2 -translate-y-1/2 
                            text-white text-xs md:text-xl hover:bg-primary duration-300 rounded-full 
                            backdrop-blur-lg bg-[rgba(14,55,82,0.5)] border border-[rgba(14,55,82,1)]"
            >
                {t('residents')}
            </button>
            <a
                href="https://wa.me/38349100109"
                target="_blank"
                rel="noopener noreferrer"
                className='z-[99999] absolute m-4 p-4 border border-primary bg-transparent 
                text-base text-primary rounded-full cursor-pointer z-20'
            // className="z-[99999] absolute m-4 p-4 
            //             text-white text-xs md:text-xl hover:bg-primary duration-300 rounded-full 
            //             backdrop-blur-lg bg-[rgba(14,55,82,0.5)] border border-[rgba(14,55,82,1)]"
            >
                <IoLogoWhatsapp />
            </a>
        </div>
    );
};

export default NavFooter
