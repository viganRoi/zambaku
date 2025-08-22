import React, { useEffect } from 'react';
import { getRegularFloorFilter, getRegularRoomFilter, getRegularSeeViewFilter, getRegularSquareFilter, handleFilterState, handleRegularFilterReset, maxFloor, maxSquare, minFloor, minSquare, setRegularBuildingFilter, setRegularFloorFilter, setRegularRoomFilter, setRegularSeeViewFilter, setRegularSquareFilter } from '../../features/filter/FilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '@mui/material';
import './style.css'
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';


const ApartmentsFilter = ({ setFilterState, available }) => {
  const roomFilter = useSelector(getRegularRoomFilter);
  const squareFilter = useSelector(getRegularSquareFilter);
  const floorFilter = useSelector(getRegularFloorFilter);
  const seeViewFilter = useSelector(getRegularSeeViewFilter);
  const dispatch = useDispatch();
  const isSmallDev = window.innerWidth < 768;
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    dispatch(handleRegularFilterReset());
  }, [location.pathname]);

  const handleSeeViewChange = (event) => {
    dispatch(setRegularSeeViewFilter(event.target.name));
  };

  const handleRoomChange = (event) => {
    dispatch(setRegularRoomFilter(event.target.name));
  };

  const handleFloorChange = (event, newFloorRange) => {
    dispatch(setRegularFloorFilter(newFloorRange));
  };

  const handleSizeChange = (event, newSizeRange) => {
    dispatch(setRegularSquareFilter(newSizeRange));
  };
  const floorLabelMapping = {
    0: "Përdhesa",
    "-1": "Suterren",
    "-2": "Bodrum",
  };

  const getFloorLabel = (floor) => {
    return floorLabelMapping[floor] || floor;
  };


  return (
    <div className='w-full h-full py-12 md:py-24 flex items-center justify-center bg-white apartmentfilter'>
      <div className="w-11/12 h-full md:h-28 text-primary flex flex-col justify-between items-center gap-4 uppercase axiformaThin">
        <div className="w-full h-full flex flex-col md:flex-row gap-2 md:gap-4 justify-between items-start">
          <div className="w-full md:w-auto flex flex-col items-start gap-1 md:gap-4">
            <h1 className="md:text-lg text-primary">{t('seaview')}</h1>
            <div className='w-full flex gap-2 justify-start valky'>
              <button name='true' onClick={handleSeeViewChange} className={`px-4 py-2 rounded-full border border-primary text-nowrap ${seeViewFilter.includes('true') ? 'bg-primary text-white' : 'bg-brand text-primary'}`}>See View</button>
              <button name='false' onClick={handleSeeViewChange} className={`px-4 py-2 rounded-full border border-primary text-nowrap ${seeViewFilter.includes('false') ? 'bg-primary text-white' : 'bg-brand text-primary'}`}>Whithout</button>
            </div>
          </div>
          <a className='w-[1px] bg-primary h-full' />
          <div className="w-full md:w-auto flex flex-col items-start gap-1 md:gap-4">
            <h1 className="md:text-lg text-primary">{t('rooms')}</h1>
            <div className='w-full flex gap-2 justify-start valky'>
              <button name='Studio' onClick={handleRoomChange} className={`px-4 py-2 rounded-full border border-primary text-nowrap capitalize ${roomFilter.includes('Studio') ? 'bg-primary text-secondary' : 'bg-brand text-primary'}`}>Studio</button>
              <button name='1' onClick={handleRoomChange} className={`px-4 py-2 rounded-full border border-primary text-nowrap ${roomFilter.includes('1') ? 'bg-primary text-secondary' : 'bg-brand text-primary'}`}>1 + 1</button>
              <button name='2' onClick={handleRoomChange} className={`px-4 py-2 rounded-full border border-primary text-nowrap ${roomFilter.includes('2') ? 'bg-primary text-secondary' : 'bg-brand text-primary'}`}>2 + 1</button>
              <button name='3' onClick={handleRoomChange} className={`px-4 py-2 rounded-full border border-primary text-nowrap ${roomFilter.includes('3') ? 'bg-primary text-secondary' : 'bg-brand text-primary'}`}>3 + 1</button>
            </div>
          </div>
          <a className='w-[1px] bg-primary h-full' />
          <div className="w-full md:w-auto flex flex-col items-start gap-1 md:gap-4">
            <h1 className="md:text-lg text-primary">{t('floor')}</h1>
            <div className='w-full md:w-64 flex flex-col justify-between'>
              <div className="w-full">
                <Slider
                  getAriaLabel={() => "Floor range"}
                  value={[floorFilter.startVal, floorFilter.endVal]}
                  shiftStep={1}
                  onChange={handleFloorChange}
                  step={1}
                  min={minFloor}
                  max={maxFloor}
                  color="var(--primary-color)"
                  sx={{
                    color: "var(--primary-color)",
                    height: '1px',
                    width: isSmallDev ? '100%' : '92%',
                  }}
                />
              </div>
              <p className='md:text-lg valky capitalize'>
                {getFloorLabel(floorFilter.startVal)} - {getFloorLabel(floorFilter.endVal)}
              </p>
            </div>
          </div>
          <a className='w-[1px] bg-primary h-full' />
          <div className="w-full md:w-auto flex flex-col items-start gap-1 md:gap-4">
            <h1 className="md:text-lg text-primary">{t('propertysize')} (M<sup>2</sup>)</h1>
            <div className='w-full md:w-64 flex flex-col justify-between'>
              <div className="w-full md:ml-3">
                <Slider
                  getAriaLabel={() => "Size range"}
                  value={[squareFilter.startVal, squareFilter.endVal]}
                  onChange={handleSizeChange}
                  shiftStep={1}
                  step={10}
                  min={minSquare}
                  max={maxSquare}
                  color="var(--brand2-color)"
                  sx={{
                    color: "var(--brand2-color)",
                    height: '1px',
                    width: isSmallDev ? '100%' : '92%',
                  }}
                />
              </div>
              <p className='md:text-lg valky capitalize'>
                {squareFilter.startVal}m2 - {squareFilter.endVal}m2
              </p>
            </div>
          </div>
          <a className='w-[1px] bg-primary h-full' />
          <div className="w-full md:w-auto flex flex-col items-start justify-center gap-1 md:gap-4">
            <div className='flex flex-col items-start gap-2 md:gap-4 '>
              <h1 className='md:text-lg text-primary'>
                {t('apartmentavailable')}
              </h1>
              <h1 className='text-4xl md:text-7xl valky text-primary'>
                {available}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ApartmentsFilter;