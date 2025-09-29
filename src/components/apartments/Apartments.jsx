import React from 'react'
import { ApartmentCard } from '../'
import { useNavigate } from 'react-router-dom';

const Apartments = ({ filteredApartments }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full min-h-[160vh] flex flex-col items-center justify-start py-12 md:py-24 mb-44 bg-transparent">
            <div className="base-width grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
                {filteredApartments.slice(0, 9).map((el) => {
                    const key = el.apartmentId ?? el.id ?? el.apartmentNumber;
                    const sqft = el.netoSquare ?? el.square ?? el.sqft ?? '';
                    const title = el.name ?? `Apartment ${el.apartmentNumber ?? key}`;
                    const floorRaw = el.floorNumber ?? el.floor ?? '';
                    const floor = floorRaw === 0 ? 'Përdhesa' : floorRaw === -1 ? 'Suterren' : floorRaw === -2 ? 'Bodrum' : `Kati ${floorRaw}`;
                    const navigateId = el.apartmentId ?? el.id ?? key;
                    return (
                        <ApartmentCard
                            key={key}
                            object={el.apartmentNumber}
                            category={el.category}
                            image={el.imageUrl ?? el.image3dUrl ?? el.image}
                            title={title}
                            floor={floor}
                            bathroom={el.bathroom ?? ''}
                            sqft={sqft}
                            bedroom={el.rooms ?? ''}
                            navigateTo={() => navigate(`/apartments/${navigateId}`)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Apartments