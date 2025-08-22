import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const Hero = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="w-full md:h-[120vh]  relative flex items-center justify-center bg-white bg-opacity-80 ">
            <img
                src="/assets/images/hero/bck/bck2.png"
                alt="Otrant Reef"
                className="absolute h-full w-full object-right object-contain z-0"
            />
            <div className="w-11/12 relative z-10 pt-12 md:pt-0">
                <div className="w-full md:w-2/3">
                    <h1 className="text-xl md:text-5xl valky text-primary uppercase leading-tight">
                        {t('hero')}
                    </h1>
                    <div className="flex gap-6 w-full mt-6">
                        <p className="text-dark text-sm md:text-lg axiforma-thin leading-relaxed">
                            {t('herodesc')}
                        </p>
                        <button
                            onClickCapture={() => navigate('/about')}
                            className="bg-primary text-white text-sm min-w-24 h-24 md:min-w-36 md:h-36 text-nowrap rounded-full transition axiforma-thin ">
                            {t('seemore')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;