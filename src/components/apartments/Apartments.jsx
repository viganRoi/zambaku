import React, { useState, useMemo, useEffect } from 'react'
import { ApartmentCard } from '../'
import { useNavigate } from 'react-router-dom';


const Apartments = ({ filteredApartments = [] }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const isSmallDev = window.innerWidth < 700;
    const ITEMS_PER_PAGE = isSmallDev ? 10 : 9;

    useEffect(() => {
        setCurrentPage(1); // reset to first page when data changes
    }, [filteredApartments]);

    const totalPages = Math.max(1, Math.ceil((filteredApartments?.length || 0) / ITEMS_PER_PAGE));

    const pageItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return (filteredApartments || []).slice(start, start + ITEMS_PER_PAGE);
    }, [filteredApartments, currentPage]);

    const goToPage = (p) => setCurrentPage(Math.min(Math.max(1, p), totalPages));
    const prev = () => goToPage(currentPage - 1);
    const next = () => goToPage(currentPage + 1);

    // pagination range with ellipses logic
    const visiblePages = useMemo(() => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pagesSet = new Set();
        pagesSet.add(1);
        pagesSet.add(totalPages);

        if (currentPage <= 2) {
            // near start -> show 1,2,3
            pagesSet.add(2);
            pagesSet.add(3);
        } else if (currentPage >= totalPages - 1) {
            // near end -> show last-2,last-1,last
            pagesSet.add(totalPages - 2);
            pagesSet.add(totalPages - 1);
        } else {
            // middle -> show current-1, current, current+1
            pagesSet.add(currentPage - 1);
            pagesSet.add(currentPage);
            pagesSet.add(currentPage + 1);
        }

        const sorted = Array.from(pagesSet)
            .filter(p => p >= 1 && p <= totalPages)
            .sort((a, b) => a - b);

        const out = [];
        for (let i = 0; i < sorted.length; i++) {
            if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
                out.push('ellipsis-' + i); // placeholder string for dots (unique)
            }
            out.push(sorted[i]);
        }
        return out;
    }, [currentPage, totalPages]);

    return (
        <div className="w-full h-full min-h-[160vh] flex flex-col items-center justify-start py-12 md:py-24 mb-20 bg-transparent">
            <div className="w-23/24 md:base-width grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
                {filteredApartments.map((el) => {
                    const key = el.apartmentId ?? el.id ?? el.apartmentNumber;
                    const sqft = el.netoSquare ?? el.square ?? el.sqft ?? '';
                    const title = el.name ?? `Apartment ${el.apartmentNumber ?? key}`;
                    const floorRaw = el.floorNumber ?? el.floor ?? '';
                    const floor = floorRaw === 0 ? 'Përdhesa' : floorRaw === -1 ? 'Suterren' : floorRaw === -2 ? 'Bodrum' : `Kati ${floorRaw}`;
                    const navigateId = el.id;
                    return (
                        <ApartmentCard
                            key={key}
                            object={el.apartmentNumber}
                            category={el.category}
                            image={el.image3dUrl ?? el.imageUrl ?? el.image}
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

            {/* Pagination controls */}
            {/* <div className="w-23/24 mt-4 flex items-center justify-between">
                <button
                    onClick={prev}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-full text-white bg-secondary/80 disabled:opacity-50"
                >
                    Previous
                </button>

                <div className="flex items-center gap-1 md:gap-2">
                    {visiblePages.map((p) => (
                        typeof p === 'string' && p.startsWith('ellipsis-') ? (
                            <span key={p} className="px-2">...</span>
                        ) : (
                            <button
                                key={p}
                                onClick={() => goToPage(p)}
                                className={`px-3 py-1 rounded-full text-white ${p === currentPage ? 'bg-secondary md:bg-primary' : 'bg-secondary/40'}`}
                            >
                                {p}
                            </button>
                        )
                    ))}
                </div>

                <button
                    onClick={next}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-full text-white bg-secondary/80 disabled:opacity-50"
                >
                    Next
                </button>
            </div> */}
        </div>
    )
}

export default Apartments