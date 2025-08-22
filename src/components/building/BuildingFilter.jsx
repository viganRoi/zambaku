import { getRegularFloorFilter, getRegularRoomFilter, getRegularSeeViewFilter, getRegularSquareFilter, handleRegularFilterReset, maxFloor, maxSquare, minFloor, minSquare, setRegularFloorFilter, setRegularRoomFilter, setRegularSeeViewFilter, setRegularSquareFilter } from '../../features/filter/FilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '@mui/material';
import './style.css'
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';
import { PiSliders } from "react-icons/pi";


const BuildingFilter = ({ setFilterState, available, buildingName }) => {
  const { t } = useTranslation();
  const roomFilter = useSelector(getRegularRoomFilter);
  const squareFilter = useSelector(getRegularSquareFilter);
  const floorFilter = useSelector(getRegularFloorFilter);
  const seeViewFilter = useSelector(getRegularSeeViewFilter);
  const dispatch = useDispatch();
  const location = useLocation();
  const isSmallDev = window.innerWidth < 768;

  const [open, setOpen] = useState(false);

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

  const handleReset = () => {
    dispatch(handleRegularFilterReset());
  };

  useEffect(() => {
    dispatch(handleRegularFilterReset());
  }, [location.pathname]);

  if (isSmallDev) {
    return (
      <div className='w-full h-full flex items-end justify-between md:justify-end bg-white px-4 pt-8'>
        <h1 className='valky text-3xl md:text-5xl text-primary '>{t('tower')} <span className='uppercase'>{buildingName}</span></h1>
        <button
          className="px-8 py-3 bg-primary text-white rounded-full text-base md:hidden gap-2"
          onClick={() => setOpen(true)}
        >
          <PiSliders className='text-3xl' /> Open Filters
        </button>
        {open && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center md:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 z-[1001]"
              onClick={() => setOpen(false)}
            />
            {/* Modal content */}
            <div className="relative z-[1002] bg-white rounded-xl w-[95vw] max-w-[500px] h-[700px] max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-[modalIn_0.2s]">
              <button
                className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full w-9 h-9 flex items-center justify-center text-xl text-gray-700 z-[1003]"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
              {/* ...existing filter content... */}
              <div className="w-11/12 h-full text-primary flex flex-col justify-between items-center gap-4 uppercase axiformaThin">
                <div className="w-full h-full flex flex-col gap-2 justify-between items-start">
                  {/* Sea view */}
                  <div className="w-full md:w-auto flex flex-col items-start gap-1 md:gap-4">
                    <h1 className="md:text-lg text-primary">{t('seaview')}</h1>
                    <div className='w-full flex gap-2 justify-start valky'>
                      <button
                        name='true'
                        onClick={handleSeeViewChange}
                        className={`px-4 py-2 rounded-full border border-primary text-nowrap ${seeViewFilter.includes('true')
                          ? 'bg-primary text-white'
                          : 'bg-brand text-primary'
                          }`}
                      >
                        See View
                      </button>
                      <button
                        name='false'
                        onClick={handleSeeViewChange}
                        className={`px-4 py-2 rounded-full border border-primary text-nowrap ${seeViewFilter.includes('false')
                          ? 'bg-primary text-white'
                          : 'bg-brand text-primary'
                          }`}
                      >
                        Whithout
                      </button>
                    </div>
                  </div>
                  <div className="w-full border-t border-primary my-2" />
                  {/* Rooms */}
                  <div className="flex flex-col items-start gap-1">
                    <h1 className="text-primary">{t('rooms')}</h1>
                    <div className="w-full flex gap-2 justify-start valky">
                      <button
                        name="Studio"
                        onClick={handleRoomChange}
                        className={`px-4 py-2 rounded-full border border-primary text-nowrap ${roomFilter.includes('Studio')
                          ? 'bg-primary text-white'
                          : 'bg-brand text-primary'
                          }`}
                      >
                        Studio
                      </button>
                      <button
                        name="1"
                        onClick={handleRoomChange}
                        className={`px-4 py-2 rounded-full border border-primary text-nowrap ${roomFilter.includes('1')
                          ? 'bg-primary text-white'
                          : 'bg-brand text-primary'
                          }`}
                      >
                        1 + 1
                      </button>
                      <button
                        name="2"
                        onClick={handleRoomChange}
                        className={`px-4 py-2 rounded-full border border-primary text-nowrap ${roomFilter.includes('2')
                          ? 'bg-primary text-white'
                          : 'bg-brand text-primary'
                          }`}
                      >
                        2 + 1
                      </button>
                      <button
                        name="3"
                        onClick={handleRoomChange}
                        className={`px-4 py-2 rounded-full border border-primary text-nowrap ${roomFilter.includes('3')
                          ? 'bg-primary text-white'
                          : 'bg-brand text-primary'
                          }`}
                      >
                        3 + 1
                      </button>
                    </div>
                  </div>
                  <div className="w-full border-t border-primary my-2" />
                  {/* Floor */}
                  <div className="w-full flex flex-col items-start gap-1">
                    <h1 className="text-primary">{t('floor')}</h1>
                    <div className="w-full flex flex-col justify-between">
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
                            width: '100%',
                          }}
                        />
                      </div>
                      <p className="valky capitalize">
                        {getFloorLabel(floorFilter.startVal)} - {getFloorLabel(floorFilter.endVal)}
                      </p>
                    </div>
                  </div>
                  <div className="w-full border-t border-primary my-2" />
                  {/* Property Size */}
                  <div className="w-full flex flex-col items-start gap-1">
                    <h1 className="text-primary">
                      {t('propertysize')}(M<sup>2</sup>)
                    </h1>
                    <div className="w-full flex flex-col justify-between">
                      <div className="w-full">
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
                            width: '100%',
                          }}
                        />
                      </div>
                      <p className="valky capitalize">
                        {squareFilter.startVal}m2 - {squareFilter.endVal}m2
                      </p>
                    </div>
                  </div>
                  <div className="w-full border-t border-primary my-2" />
                  {/* Available */}
                  <div className="w-full flex flex-col items-start justify-center gap-1">
                    <div className="flex flex-col items-start gap-2">
                      <h1 className="text-primary">{t('apartmentavailable')}</h1>
                      <h1 className="text-4xl valky text-primary">{available}</h1>
                    </div>
                  </div>
                  <div className='w-full h-full flex justify-end items-end gap-4'>
                    <button
                      className="px-6 py-2 bg-gray-200 text-primary rounded-full font-bold"
                      onClick={handleReset}
                    >
                      {t('resetfilter')}
                    </button>
                    <button
                      className="px-6 py-2 bg-gray-200 text-primary rounded-full font-bold"
                      onClick={() => setOpen(false)}
                    >
                      {t('applyfilters')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='w-full h-full pt-12 md:py-24 flex items-center justify-center bg-white'>
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
              <button name='Studio' onClick={handleRoomChange} className={`px-4 py-2 rounded-full border border-primary text-nowrap ${roomFilter.includes('Studio') ? 'bg-primary text-white' : 'bg-brand text-primary'}`}>Studio</button>
              <button name='1' onClick={handleRoomChange} className={`px-4 py-2 rounded-full border border-primary text-nowrap ${roomFilter.includes('1') ? 'bg-primary text-white' : 'bg-brand text-primary'}`}>1 + 1</button>
              <button name='2' onClick={handleRoomChange} className={`px-4 py-2 rounded-full border border-primary text-nowrap ${roomFilter.includes('2') ? 'bg-primary text-white' : 'bg-brand text-primary'}`}>2 + 1</button>
              <button name='3' onClick={handleRoomChange} className={`px-4 py-2 rounded-full border border-primary text-nowrap ${roomFilter.includes('3') ? 'bg-primary text-white' : 'bg-brand text-primary'}`}>3 + 1</button>
            </div>
          </div>
          <a className='w-[1px] bg-primary h-full' />
          <div className="w-full md:w-auto flex flex-col items-start gap-1 md:gap-4">
            <h1 className="md:text-lg text-primary">{t('floor')}</h1>
            <div className='w-full md:w-64 flex flex-col justify-between'>
              <div className="w-full flex item-center justify-center">
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
              <div className="w-full flex item-center justify-center">
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

export default BuildingFilter;