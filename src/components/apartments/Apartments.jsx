import React from 'react'
import { ApartmentCard  }from '../'
import { useNavigate } from 'react-router-dom';

const Apartments = ({ filteredApartments }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex flex-col items-center justify-center content-center py-12 md:py-24 bg-white">
            <div className="w-11/12 flex-col align-center justify-center">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
                    {filteredApartments.map((el) => {
                        return (
                            <ApartmentCard
                                key={el.id}
                                object={el.apartmentNumber}
                                category={el.category}
                                image={el.name}
                                title={el.name}
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