import { useState } from 'react';

const AmenitiesCard = ({ image, title, desc }) => {
    const [showDescription, setShowDescription] = useState(false);

    const handleToggle = () => {
        setShowDescription(prev => !prev);
    };

    return (
        <div className='w-full h-full border border-dark flex flex-col items-center justify-center p-4 md:p-8 gap-4'>
            <div className='relative w-full h-86 md:h-148 overflow-hidden flex items-center justify-center'>
                <img
                    src={image}
                    alt=""
                    className='absolute w-full h-full object-cover object-center hover:scale-110 duration-300'
                />
            </div>
            <div className='w-full flex items-center justify-between gap-4'>
                <h1 className='w-4/5 valky text-lg md:text-xl text-start text-nowrap overflow-hidden text-ellipsis'>
                    {title}
                </h1>
                <button
                    className='h-10 md:h-12 w-10 md:w-12 border border-dark rounded-full bg-white hover:bg-primary hover:text-secondary duration-300'
                    onClick={handleToggle}
                >
                    {showDescription ? '-' : '+'}
                </button>
            </div>
            {showDescription && (
                <div className='w-full rounded-md text-sm text-gray-700 duration-300 text-left'>
                    {desc}
                </div>
            )}
        </div>
    );
};

export default AmenitiesCard;
