import React from "react";

const PersonCard = ({ image, position, name, surname }) => {
    return (
        <div className="relative flex items-center justify-between w-full h-full">
            <div className="w-1/2 flex items-center justify-center">
                <img src={image} alt="" className="h-46 md:h-132 object-cover"/>
            </div>
            <div className="w-1/2 text-white text-left flex flex-col gap-1 md:gap-4">
                <h1 className="text-2xl md:text-7xl valky">{name}</h1>
                <h1 className="text-2xl md:text-7xl valky">{surname}</h1>
                <h2 className="axiforma-thin uppercase text-xs md:text-lg">{position}</h2>
            </div>
        </div>
    );
};

export default PersonCard;
