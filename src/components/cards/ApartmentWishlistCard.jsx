import React from "react";
import { homepage, planmetricImageUrl } from "../../utils/consts";
import { useTranslation } from "react-i18next";
import { IoTrashOutline } from "react-icons/io5";


const ApartmentWishlistCard = ({
    id,
    image,
    title,
    object,
    navigateTo,
    floor,
    bedroom,
    sqft,
    onRemove,
}) => {
    const { t } = useTranslation();
    return (
        <div className="w-full h-full md:h-[500px] relative overflow-hidden hover:shadow-xl bg-white/80 hover:bg-white hover:cursor-pointer valky text-primary flex flex-col items-center p-4 relavite duration-300 rounded-xl">
            <img
                src={`${homepage}${planmetricImageUrl}${image}`}
                alt=''
                className="w-full mt-8 h-[250px] md:h-[370px] object-contain"
                onClick={navigateTo}
            />
            <button
                onClick={() => onRemove(id)}
                className="absolute top-4 right-4 bg-primary flex text-white p-3 md:p-4 text-sm border-primary border-[1px] rounded-full hover:shadow-md transition certon z-[9]"
            >
                <IoTrashOutline className="text-white text-xl" />
            </button>
            <div className="absolute top-4 left-4">
                <p className="axiforma">{title}</p>
            </div>
            <div className="text-brand flex flex-col gap-2 items-center">
                <p className="text-sm md:text-lg uppercase">
                    {bedroom === "Studio" || bedroom === 0
                        ? bedroom
                        : `${bedroom} ${t('bedroom')}`}
                </p>
                <h1 className="text-2xl md:text-5xl">
                    {sqft}m<sup className="text-lg md:text-3xl">2</sup>
                </h1>
            </div>
        </div>
    );
};

export default ApartmentWishlistCard;
