import React from "react";
import { useTranslation } from "react-i18next";

const ApartmentModal = ({ apartment, mousePosition }) => {
    const {t} = useTranslation(); 
    return (
        <div
            className='relative z-10 h-52 w-52 px-4 py-4 bg-primary'
            style={{
                position: "fixed",
                pointerEvents: "none",
                top: mousePosition.y - 30 + "px",
                left: mousePosition.x + 40 + "px",
            }}
        >
            <div className="absolute -left-3 top-3 w-10 h-10 bg-primary rotate-45 -z-1 "></div>
            <div className='relative flex flex-col justify-between items-end w-full h-full'>
                <div className="text-right">
                    <p className="text-xl text-white mb-2">{t('apartmenti')}: {apartment.title}</p>
                    <p className="text-base opacity-60 text-white">{t('rooms')}: {apartment.bedroom === 0 || apartment.bedroom === "Studio" ? apartment.bedroom : `${apartment.bedroom} + 1`}</p>
                    <p className="text-base opacity-60 text-white">{t('flooor')}: {apartment.floor}</p>
                </div>
                <div className='flex flex-col'>
                    <h1 className="certon text-2xl text-gold">{apartment.sqft}m<sup>2</sup></h1>
                </div>
            </div>
        </div>
    );
};

export default ApartmentModal;
