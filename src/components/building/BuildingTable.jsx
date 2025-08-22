import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";;

const BuildingTable = ({ apartments }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const filtered = Array.from(
        new Map(
            apartments
                .map(apartment => [apartment.apartmentId, apartment])
        ).values()
    );

    return (
        <div className='w-full h-full flex justify-center items-center py-6 sm:py-12'>
            <div className='w-23/24 ml-4 h-full flex items-center justify-center'>
                <div className="h-full w-full overflow-x-auto sm:overflow-y-auto">
                    <table className="min-w-full table-auto text-xs sm:text-sm text-left border-separate border-spacing-0">
                        <thead className="bg-primary h-10 sm:h-12 text-white uppercase sticky top-0 z-10">
                            <tr>
                                <th className="px-4 sm:px-6 py-2 sm:py-3 font-medium">Apartment</th>
                                <th className="px-4 sm:px-6 py-2 sm:py-3 font-medium">{t('grossarea')}</th>
                                <th className="px-4 sm:px-6 py-2 sm:py-3 font-medium">{t('netarea')}</th>
                                <th className="px-4 sm:px-6 py-2 sm:py-3 font-medium">{t('type')}</th>
                                <th className="px-4 sm:px-6 py-2 sm:py-3 font-medium">{t('floor')}</th>
                                <th className="px-4 sm:px-6 py-2 sm:py-3 font-medium">{t('greenterrace')}</th>
                                <th className="px-4 sm:px-6 py-2 sm:py-3 font-medium">{t('seasideview')}</th>
                                <th className="px-4 sm:px-6 py-2 sm:py-3 font-medium">{t('model')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...filtered]
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((apartment, i) => (
                                    <tr
                                        key={apartment.id}
                                        className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'} h-10 sm:h-12 w-full text-primary cursor-pointer hover:bg-blue-100 ${apartment.isSold ? 'bg-red-300' : ''} ${apartment.isReserved ? 'bg-orange-300' : ''} duration-175`}
                                        onClick={() => navigate(`/apartments/${apartment.id}`)}
                                    >
                                        <td className="px-4 sm:px-6 py-2 sm:py-4">{apartment.name}</td>
                                        <td className="px-4 sm:px-6 py-2 sm:py-4">{apartment.netoSquare}m<sup>2</sup></td>
                                        <td className="px-4 sm:px-6 py-2 sm:py-4">{apartment.grossySquare}m<sup>2</sup></td>
                                        <td className="px-4 sm:px-6 py-2 sm:py-4">
                                            {typeof apartment.rooms === 'string' && apartment.rooms.toLowerCase() === 'studio'
                                                ? apartment.rooms
                                                : `${apartment.rooms} + 1`}
                                        </td>
                                        <td className="px-4 sm:px-6 py-2 sm:py-4">{apartment.floorNumber}</td>
                                        <td className="px-4 sm:px-6 py-2 sm:py-4">{apartment.balconySquare}m<sup>2</sup></td>
                                        <td className="px-4 sm:px-6 py-2 sm:py-4">{apartment.hasSeaView ? t('yes') : t('no')}</td>
                                        <td className="px-4 sm:px-6 py-2 sm:py-4">
                                            {apartment.isSold ? t('sold') : apartment.isReserved ? 'Reserved' : t('available')}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BuildingTable