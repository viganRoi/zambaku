import React from "react";
import { useTranslation } from "react-i18next";
const ApartmentFloorModal = ({ apartment, mousePosition }) => {
    const {t} = useTranslation();
    if (!apartment) {
        return null;
    }

    return (
        <div
            className='relative z-10 h-80 w-80 px-8 py-4 bg-primary'
            style={{
                position: "fixed",
                pointerEvents: "none",
                top: mousePosition.y - 30 + "px",
                left: mousePosition.x + 40 + "px",
            }}
        >
            <div className="absolute -left-3 top-3 w-10 h-10 bg-brand rotate-45 -z-1 "></div>
            <div className='relative flex flex-col justify-between items-end w-full h-full'>
                <div className="text-right">
                    <p className="text-2xl text-white mb-2">{t('apartmenti')}: {apartment.name}</p>
                    <p className="text-xl opacity-60 text-white">{t('tower')}: {apartment.apartmentNumber}</p>
                </div>
                <div className='flex flex-col'>
                    <h1 className="certon text-5xl text-gold">{apartment.netoSquare}m<sup>2</sup></h1>
                </div>
            </div>
        </div>
    );
};

export default ApartmentFloorModal;