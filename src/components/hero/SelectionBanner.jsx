import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
const imageMap = {
    lobby: '/assets/images/hero/banner/1.png',
    pool: '/assets/images/hero/banner/2.png',
    living: '/assets/images/hero/banner/3.png',
    seaside: '/assets/images/hero/banner/4.png',
};

const options = Object.keys(imageMap);

const SelectionBanner = () => {
    const {t} = useTranslation()
    const [selected, setSelected] = useState('lobby');

    return (
        <div
            className="w-full h-[40vh] md:h-screen bg-cover bg-center transition-all duration-700 ease-in-out flex items-center justify-center relative"
            style={{ backgroundImage: `url(${imageMap[selected]})` }}
        >
            <div className="w-11/12 text-white text-4xl font-light tracking-wide z-10">
                {options.map((option) => (
                    <div
                        key={option}
                        onClick={() => setSelected(option)}
                        className={`cursor-pointer valky mb-4 transition duration-300 md:text-5xl uppercase ${selected === option ? 'font-bold text-white' : 'opacity-60 underline'}`}
                    >
                        {t(option)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectionBanner;
