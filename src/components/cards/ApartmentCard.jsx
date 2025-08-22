import React from "react";
import { useTranslation } from "react-i18next";
import { homepage, planmetricImageUrl } from "../../utils/consts";
const ApartmentCard = ({
  image,
  object,
  title,
  navigateTo,
  bedroom,
  sqft,
}) => {
  const { t } = useTranslation();
  return (
    <div className="w-full h-[380px] md:h-[500px] relative overflow-hidden hover:shadow-xl bg-white border border-dark hover:cursor-pointer valky text-primary flex flex-col items-center p-4">
      <img
        // src={`${homepage}${planmetricImageUrl}${image}.jpg`}
        src={`${homepage}${planmetricImageUrl}${image}-3d.png`}
        // src={`/assets/images/apartments/1.png`}
        alt=''
        className="w-full h-[370px] object-contain"
        onClick={navigateTo}
      />
      <div className="absolute top-4 left-4">
        <p className="axiforma">{title}</p>
      </div>
      <div className="text-brand flex flex-col gap-4 items-center">
        <p className="text-sm md:text-lg uppercase">
          {bedroom === "Studio" || bedroom === 0
            ? bedroom
            : `${bedroom} ${t('bedroom')}`}
        </p>
        <h1 className="text-5xl">
          {sqft}m<sup className="text-3xl">2</sup>
        </h1>
      </div>
    </div>
  );
};

export default ApartmentCard;
