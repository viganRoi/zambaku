import { useEffect, useState } from 'react';
import { Apartments, ApartmentsFilter, Contact, TitleSection } from '../components';
import axios from 'axios';
import { BASE_URL } from '../utils/consts';
import { useSelector } from 'react-redux';
import { getRegularRoomFilter, getRegularFloorFilter, getRegularSquareFilter, getRegularSeeViewFilter } from '../features/filter/FilterSlice';

const AllApartmentsPage = () => {
  window.scrollTo({ top: 0 })
  const [apartments, setApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [filterState, setFilterState] = useState(false);

  const roomFilter = useSelector(getRegularRoomFilter);
  const floorFilter = useSelector(getRegularFloorFilter);
  const squareFilter = useSelector(getRegularSquareFilter);
  const seaViewFilter = useSelector(getRegularSeeViewFilter)
  
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/apartment/get`);
        let data = response.data.flatMap(b => b.apartmentList || []);
        // Sort by building (alphabetically) and then by apartment number (numerically, handling leading zeros)
        data = data.sort((a, b) => {
          // Extract building and number from apartmentNumber, e.g., B01, C62
          const parse = (str) => {
            const match = str.match(/^([A-Za-z]+)(\d+)$/);
            if (!match) return [str, 0];
            return [match[1], parseInt(match[2], 10)];
          };
          const [buildingA, numA] = parse(a.name || '');
          const [buildingB, numB] = parse(b.name || '');
          if (buildingA < buildingB) return -1;
          if (buildingA > buildingB) return 1;
          return numA - numB;
        });
        setApartments(data);
        applyFilters(data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };

    fetchApartments();
  }, []);

  useEffect(() => {
    applyFilters(apartments);
  }, [filterState, roomFilter, seaViewFilter ,floorFilter, squareFilter]);

  const applyFilters = (apartments) => {
    let filtered = apartments;

    filtered = filtered.filter(apartment => !apartment.isSold);

    if (seaViewFilter.length && !seaViewFilter.includes('all')) {
      filtered = filtered.filter(apartment => seaViewFilter.includes(apartment.hasSeaView.toString()));
    }

    if (roomFilter.length && !roomFilter.includes('all')) {
      filtered = filtered.filter(apartment => roomFilter.includes(apartment.rooms));
    }

    if (floorFilter.startVal !== undefined && floorFilter.endVal !== undefined) {
      filtered = filtered.filter(apartment => apartment.floorNumber >= floorFilter.startVal && apartment.floorNumber <= floorFilter.endVal);
    }

    if (squareFilter.startVal !== undefined && squareFilter.endVal !== undefined) {
      filtered = filtered.filter(apartment => apartment.netoSquare >= squareFilter.startVal && apartment.netoSquare <= squareFilter.endVal);
    }

    filtered = Array.from(
      new Map(
        filtered.map(apartment => [apartment.apartmentId, apartment])
      ).values()
    );
    setFilteredApartments(filtered);
  };

  return (
    <div className='mt-20'>
      <TitleSection image={'/assets/images/hero/banner/4.png'} />
      <ApartmentsFilter setFilterState={setFilterState} available={filteredApartments?.length} />
      <Apartments filteredApartments={filteredApartments} />
      <Contact />
    </div>
  );
};

export default AllApartmentsPage;