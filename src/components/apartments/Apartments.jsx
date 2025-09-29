import React from 'react'
import { ApartmentCard  }from '../'
import { useNavigate } from 'react-router-dom';

const Apartments = ({ filteredApartments }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full min-h-[150vh] flex flex-col items-center justify-center content-center py-12 md:py-24 bg-transparent">
            <div className="base-width flex-col align-center justify-center">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
                    {filteredApartments.slice(0,9).map((el) => {
                        return (
                            <ApartmentCard
                                key={el.id}
                                object={el.apartmentNumber}
                                category={el.category}
                                image={el.name}
                                title={el.name}
                                floor={el.floorNumber === 0 ? 'Përdhesa' : el.floorNumber === -1 ? 'Suterren' : el.floorNumber === -2 ? 'Bodrum' : `Kati ${el.floorNumber}`}
                                bathroom={el.bathroom}
                                sqft={el.netoSquare}
                                bedroom={el.rooms}
                                navigateTo={() => navigate(`/apartments/${el.id}`)}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Apartments