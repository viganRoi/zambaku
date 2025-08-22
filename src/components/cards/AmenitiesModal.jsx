import React from "react";
import { useTranslation } from "react-i18next";
const AmenitiesModal = ({ open, onClose, amenity }) => {
    const {t} = useTranslation();
    if (!open || !amenity) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="bg-white rounded-lg p-8 w-248 h-auto relative flex flex-row gap-4">
                <button
                    className="absolute top-4 right-4 text-2xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                <img src={amenity.image} alt={amenity.title} className="w-full h-84 object-contain rounded mb-4 " />
                
                <div className="flex flex-col items-start text-start">
                <h2 className="text-2xl font-bold mb-2">{t(amenity.title)}</h2>
                <p className="text-gray-700">{t(amenity.desc)}</p>
                </div>
            </div>
        </div>
    );
};

export default AmenitiesModal;