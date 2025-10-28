import { useEffect, useMemo, useState } from 'react';
import { BuildingFilter, BuildingTable, BuildingTitle, BuildingView, BuildingMobile } from '../components';
import axios from 'axios';
import { BASE_URL } from '../utils/consts';
import { useSelector, useDispatch } from 'react-redux';
import { getRegularRoomFilter, getRegularFloorFilter, getRegularSquareFilter, getFilterState, getRegularSeeViewFilter } from '../features/filter/FilterSlice';
import { roomMatchesFilter, floorMatchesFilter } from '../utils/filterHelpers';
import { useParams } from 'react-router-dom';
import { getAllApartmentSvgData, getAllFloorSvgData } from '../features/apartment/ApartmentSlice';
import { getObjectSvgDataAll, getFloorSelectionSvg } from '../features/apartment/ApartmentAPI';

const BuildingPage = () => {
  const isSmallDev = window.innerWidth < 700;
  const [apartments, setApartments] = useState([]);
  const [available, setAvailable] = useState([]);
  const [filterState, setFilterState] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const buildingData = useSelector(getAllApartmentSvgData);
  const buildingFloorData = useSelector(getAllFloorSvgData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const roomFilter = useSelector(getRegularRoomFilter);
  const floorFilter = useSelector(getRegularFloorFilter);
  const squareFilter = useSelector(getRegularSquareFilter);
  const reduxFilterState = useSelector(getFilterState);
  const seaViewFilter = useSelector(getRegularSeeViewFilter)
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleFilter = () => {
    setFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    if (id) {
      dispatch(getObjectSvgDataAll(id));
      dispatch(getFloorSelectionSvg(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/apartment/get/apartment`);
        setApartments(response.data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };
    fetchApartments();
  }, []);

  const allSvgApartments = buildingData
    .flatMap(b => b.apartmentList || []);

  const filteredApartments = useMemo(() => {
    let filtered = allSvgApartments;

    if (seaViewFilter.length && !seaViewFilter.includes('all')) {
      filtered = filtered.filter(apartment => seaViewFilter.includes(apartment.hasSeaView.toString()));
    }

    if (roomFilter.length && !roomFilter.includes('all')) {
      filtered = filtered.filter(apartment => roomMatchesFilter(roomFilter, apartment.rooms));
    }

    if (floorFilter) {
      // floorFilter may be range object or an array of selected floors
      filtered = filtered.filter(apartment => floorMatchesFilter(floorFilter, apartment.floorNumber));
    }

    if (squareFilter.startVal !== undefined && squareFilter.endVal !== undefined) {
      filtered = filtered.filter(apartment =>
        parseFloat(apartment.netoSquare) >= squareFilter.startVal &&
        parseFloat(apartment.netoSquare) <= squareFilter.endVal
      );
    }

    return filtered;
  }, [allSvgApartments, roomFilter, seaViewFilter, floorFilter, squareFilter]);

  useEffect(() => {
    const filtered = Array.from(
      new Map(
        filteredApartments
          .filter(apartment => !apartment.isSold && !apartment.isReserved)
          .map(apartment => [apartment.apartmentId, apartment])
      ).values()
    );

    const availableCount = filtered.length;
    setAvailable(availableCount);
  }, [filteredApartments]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % buildingData.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + buildingData.length) % buildingData.length
    );
  };

  return (
    <div className='relative h-screen w-full flex flex-col'>
      <h1 className='absolute top-28 md:top-36 left-4 md:left-22 z-50 text-primary bg-secondary px-4 md:px-6 py-2 md:py-3 rounded-lg uppercase text-xl md:text-3xl anya'>Llamella {buildingData[0]?.buildingName}</h1>
      <button
        onClick={toggleFilter}
        className="absolute top-28 md:top-36 right-4 md:right-22 w-48 md:w-108 z-50 text-secondary bg-primary px-4 md:pl-6 md:pr-3 py-2 md:py-3 flex items-center justify-between gap-4 md:gap-44 rounded-2xl text-xl text-nowrap transition-all duration-300"
      >
        <p>{filterOpen ? "Mbyll filterin" : "Shiko filterin"}</p>
        <svg
          width="24"
          height="12"
          viewBox="0 0 24 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-300 ${filterOpen ? "" : "rotate-180"}`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.7116 1.84306L18.3686 7.50006L16.9546 8.91406L12.0046 3.96406L7.05463 8.91406L5.64062 7.50006L11.2976 1.84306C11.4852 1.65559 11.7395 1.55028 12.0046 1.55028C12.2698 1.55028 12.5241 1.65559 12.7116 1.84306Z"
            fill="#E4AB8E"
          />
        </svg>
      </button>
      <div
        className={`absolute top-28 md:top-36 right-4 md:right-48 overflow-hidden transition-all duration-500 ease-in-out z-40 ${filterOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <BuildingFilter setFilterState={setFilterState} available={available} buildingName={buildingData[0]?.buildingNr} />
      </div>
      {isSmallDev ? (
        <BuildingMobile
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          currentIndex={currentIndex}
          buildingData={buildingData}
          buildingFloorData={buildingFloorData}
          filterState={reduxFilterState}
          roomFilter={roomFilter}
          floorFilter={floorFilter}
          squareFilter={squareFilter}
        /> 
      ) : (
        <BuildingView
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          currentIndex={currentIndex}
          buildingData={buildingData}
          buildingFloorData={buildingFloorData}
          filterState={reduxFilterState}
          roomFilter={roomFilter}
          floorFilter={floorFilter}
          squareFilter={squareFilter}
        />
      )}
    </div>
  )
}

export default BuildingPage