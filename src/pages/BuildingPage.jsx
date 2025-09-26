import { useEffect, useMemo, useState } from 'react';
import { BuildingFilter, BuildingTable, BuildingTitle, BuildingView, BuildingMobile } from '../components';
import axios from 'axios';
import { BASE_URL } from '../utils/consts';
import { useSelector, useDispatch } from 'react-redux';
import { getRegularRoomFilter, getRegularFloorFilter, getRegularSquareFilter, getFilterState, getRegularSeeViewFilter } from '../features/filter/FilterSlice';
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
      filtered = filtered.filter(apartment => roomFilter.includes(apartment.rooms));
    }

    if (floorFilter.startVal !== undefined && floorFilter.endVal !== undefined) {
      filtered = filtered.filter(apartment =>
        parseInt(apartment.floorNumber) >= floorFilter.startVal &&
        parseInt(apartment.floorNumber) <= floorFilter.endVal
      );
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
      <h1 className='absolute bottom-12 left-44 z-50 text-primary bg-secondary px-6 py-3 rounded-lg uppercase text-3xl anya'>Llamella {buildingData[0]?.buildingName}</h1>
      <BuildingFilter setFilterState={setFilterState} available={available} buildingName={buildingData[0]?.buildingNr} />
      {isSmallDev ? (
        // <BuildingMobile
        //   handleNext={handleNext}
        //   handlePrevious={handlePrevious}
        //   currentIndex={currentIndex}
        //   buildingData={buildingData}
        //   buildingFloorData={buildingFloorData}
        //   filterState={reduxFilterState}
        //   roomFilter={roomFilter}
        //   floorFilter={floorFilter}
        //   squareFilter={squareFilter}
        //   available={available}
        // />
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