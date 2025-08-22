import React from "react";
import { useTranslation } from "react-i18next";
const BuildingModal = ({ object, mousePosition }) => {
    const {t} = useTranslation()
    if (!object) {
        return null;
    }

    return (
        <div
            className='relative z-10 h-64 w-64 p-6 bg-white rounded-xl'
            style={{
                position: "fixed",
                pointerEvents: "none",
                top: mousePosition.y - 40 + "px",
                left: mousePosition.x + 30 + "px",
            }}
        >
            <div className="absolute -left-3 top-6 w-8 h-8 bg-white rotate-45 -z-1 rounded"></div>
            <img
                src="/assets/images/hero/bck/bck3.png"
                alt=""
                className="h-5/6 absolute bottom-0 right-0"
            />
            <div className='relative flex flex-col justify-between items-start w-full h-full'>
                <div className='flex flex-col'>
                    <h1 className="valky text-5xl text-primary">{t('tower')}</h1>
                    <h1 className="valky text-5xl text-primary">{object.title}</h1>
                </div>
                <p className="text-lg axiforma text-dark">{object.floors} {t('floors')}</p>
            </div>
        </div>

    );
};

export default BuildingModal;