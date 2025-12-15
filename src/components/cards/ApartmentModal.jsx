import React from "react";
import { useTranslation } from "react-i18next";

const ApartmentModal = ({ apartment, mousePosition }) => {
    const {t} = useTranslation(); 
    return (
        <div
            className='relative z-100 h-52 w-84 px-4 py-4 bg-primary rounded-lg shadow-lg flex flex-col justify-between'
            style={{
                position: "fixed",
                pointerEvents: "none",
                top: mousePosition.y - 240 + "px",
                left: mousePosition.x - 180 + "px",
            }}
        >
            <div className="absolute left-40 -bottom-3 w-10 h-10 bg-primary rotate-45 -z-1 "></div>
            <div className='relative flex flex-col justify-between items-end w-full h-full'>
                <div className="flex w-full justify-between items-start mb-2">
                    <div>
                    <p className="text-base opacity-60 text-white">Terasa: {(apartment.sqft || 0).toFixed(2)}m<sup>2</sup></p>
                    <p className="text-base opacity-60 text-white">Terasa: {(apartment.balconySquare || 0).toFixed(2)}m<sup>2</sup></p>
                    <p className="text-base opacity-60 text-white">Dhoma: {apartment.bedroom === 0 || apartment.bedroom === "Studio" ? apartment.bedroom : `${apartment.bedroom} + 1`}</p>
                    <p className="text-base opacity-60 text-white">Kati: {apartment.floor}</p>
                    </div>
                    <div>
                    <h1 className="certon text-2xl text-white">{apartment.title}</h1>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h1 className="certon text-2xl text-secondary">{(apartment.sqft + apartment.balconySquare || 0).toFixed(2)}m<sup>2</sup></h1>
                </div>
            </div>
        </div>
    );
};

export default ApartmentModal;
