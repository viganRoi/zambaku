import { getRegularFloors, getRegularRoomFilter, getRegularSeeViewFilter, getRegularSquareFilter, handleRegularFilterReset, maxFloor, maxSquare, minFloor, minSquare, setRegularFloorFilter, setRegularRoomFilter, setRegularSeeViewFilter, setRegularSquareFilter } from '../../features/filter/FilterSlice';
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
  const floorButtons = useSelector(getRegularFloors);
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


  const handleFloorChange = (event) => {
    const name = event.target.name;
    const value = name === 'p' ? 'p' : name;
    dispatch(setRegularFloorToggle(value));
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
        <h1 className='valky text-3xl md:text-5xl text-white '>{t('tower')} <span className='uppercase'>{buildingName}</span></h1>
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
              <div className="w-11/12 h-full text-white flex flex-col justify-between items-center gap-4 uppercase axiformaThin">
                <div className="w-full h-full flex flex-col gap-2 justify-between items-start">
                  {/* Sea view */}
                  <div className="w-full md:w-auto flex flex-col items-start gap-1 md:gap-4">
                    <h1 className="md:text-lg text-white">{t('seaview')}</h1>
                    <div className='w-full flex gap-2 justify-start valky'>
                      <button
                        name='true'
                        onClick={handleSeeViewChange}
                        className={`px-4 py-2 rounded-full border border-primary text-nowrap ${seeViewFilter.includes('true')
                          ? 'bg-primary text-white'
                          : 'bg-brand text-white'
                          }`}
                      >
                        See View
                      </button>
                      <button
                        name='false'
                        onClick={handleSeeViewChange}
                        className={`px-4 py-2 rounded-full border border-primary text-nowrap ${seeViewFilter.includes('false')
                          ? 'bg-primary text-white'
                          : 'bg-brand text-white'
                          }`}
                      >
                        Whithout
                      </button>
                    </div>
                  </div>
                  <div className="w-full border-t border-primary my-2" />
                  {/* Rooms */}
                  <div className="flex flex-col items-start gap-1">
                    <h1 className="text-white">{t('rooms')}</h1>
                    <div className="w-full flex gap-2 justify-start valky">
                      <button
                        name="Studio"
                        onClick={handleRoomChange}
                        className={`px-4 py-2 rounded-full border border-primary text-nowrap ${roomFilter.includes('Studio')
                          ? 'bg-primary text-white'
                          : 'bg-brand text-white'
                          }`}
                      >
                        Studio
                      </button>
                      <button
                        name="1"
                        onClick={handleRoomChange}
                        className={`px-4 py-2 rounded-full border border-primary text-nowrap ${roomFilter.includes('1')
                          ? 'bg-primary text-white'
                          : 'bg-brand text-white'
                          }`}
                      >
                        1 + 1
                      </button>
                      <button
                        name="2"
                        onClick={handleRoomChange}
                        className={`px-4 py-2 rounded-full border border-primary text-nowrap ${roomFilter.includes('2')
                          ? 'bg-primary text-white'
                          : 'bg-brand text-white'
                          }`}
                      >
                        2 + 1
                      </button>
                      <button
                        name="3"
                        onClick={handleRoomChange}
                        className={`px-4 py-2 rounded-full border border-primary text-nowrap ${roomFilter.includes('3')
                          ? 'bg-primary text-white'
                          : 'bg-brand text-white'
                          }`}
                      >
                        3 + 1
                      </button>
                    </div>
                  </div>
                  <div className="w-full border-t border-primary my-2" />
                  {/* Floor */}
                  <div className="w-full flex flex-col items-start gap-1">
                    <h1 className="text-white">{t('floor')}</h1>
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
                            '& .MuiSlider-thumb': {
                              width: 8,
                              height: 4,
                              borderRadius: '999px',
                              boxShadow: 'none',
                            },
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
                    <h1 className="text-white">
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
                            '& .MuiSlider-thumb': {
                              width: 8,
                              height: 4,
                              borderRadius: '999px',
                              boxShadow: 'none',
                            },
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
                      <h1 className="text-white">{t('apartmentavailable')}</h1>
                      <h1 className="text-4xl valky text-white">{available}</h1>
                    </div>
                  </div>
                  <div className='w-full h-full flex justify-end items-end gap-4'>
                    <button
                      className="px-6 py-2 bg-gray-200 text-white rounded-full font-bold"
                      onClick={handleReset}
                    >
                      {t('resetfilter')}
                    </button>
                    <button
                      className="px-6 py-2 bg-gray-200 text-white rounded-full font-bold"
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
    <div className='absolute bottom-12 right-44 w-auto h-auto p-12 flex items-center justify-center bg-primary z-100 text-white rounded-3xl shadow-lg'>
      <div className="w-full h-full flex flex-col gap-2 md:gap-8 justify-between items-start text-white">
        <div className="w-full flex flex-col items-start gap-2 md:gap-4">
          <h1 className="text-secondary">{t('rooms')}</h1>
          <div className='w-full flex gap-8 justify-start'>
            <button name='1' onClick={handleRoomChange} className={`px-4 py-2 rounded-full border border-white/50 text-nowrap ${roomFilter.includes('1') ? 'bg-white text-secondary' : 'bg-brand text-white'}`}>1</button>
            <button name='2' onClick={handleRoomChange} className={`px-4 py-2 rounded-full border border-white/50 text-nowrap ${roomFilter.includes('2') ? 'bg-white text-secondary' : 'bg-brand text-white'}`}>2</button>
            <button name='3' onClick={handleRoomChange} className={`px-4 py-2 rounded-full border border-white/50 text-nowrap ${roomFilter.includes('3') ? 'bg-white text-secondary' : 'bg-brand text-white'}`}>3</button>
            <button name='4' onClick={handleRoomChange} className={`px-4 py-2 rounded-full border border-white/50 text-nowrap ${roomFilter.includes('4') ? 'bg-white text-secondary' : 'bg-brand text-white'}`}>4</button>
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-2 md:gap-4">
          <h1 className="text-secondary">{t('floor')}</h1>
          <div className='w-full flex gap-8 justify-start'>
            {
              // helper to check if a floor button is active (inside current range)
            }
            <button name='p' onClick={handleFloorChange} className={`px-4 py-2 rounded-full border border-white/50 text-nowrap ${(floorButtons.includes('p')) ? 'bg-white text-secondary' : 'bg-brand text-white'}`}>P</button>
            <button name='1' onClick={handleFloorChange} className={`px-4 py-2 rounded-full border border-white/50 text-nowrap ${(floorButtons.includes('1')) ? 'bg-white text-secondary' : 'bg-brand text-white'}`}>1</button>
            <button name='2' onClick={handleFloorChange} className={`px-4 py-2 rounded-full border border-white/50 text-nowrap ${(floorButtons.includes('2')) ? 'bg-white text-secondary' : 'bg-brand text-white'}`}>2</button>
            <button name='3' onClick={handleFloorChange} className={`px-4 py-2 rounded-full border border-white/50 text-nowrap ${(floorButtons.includes('3')) ? 'bg-white text-secondary' : 'bg-brand text-white'}`}>3</button>
            <button name='4' onClick={handleFloorChange} className={`px-4 py-2 rounded-full border border-white/50 text-nowrap ${(floorButtons.includes('4')) ? 'bg-white text-secondary' : 'bg-brand text-white'}`}>4</button>
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-2 md:gap-4">
          <h1 className="text-secondary">{t('propertysize')} m<sup>2</sup></h1>
          <div className='relative w-full flex flex-col justify-between'>
            <div className='border border-white/50 rounded-full px-4 w-full flex justify-between items-center'>
              <div className='border-r border-white/50 w-1/2 h-full py-2'>
                <h1 className='text-white/50'>Nga: <span className='text-secondary'>{squareFilter.startVal}m<sup>2</sup></span></h1>
              </div>
              <div className='p-2 w-1/2 h-full flex justify-start'>
                <h1 className='text-white/50'>Deri: <span className='text-secondary'>{squareFilter.endVal}m<sup>2</sup></span></h1>
              </div>
            </div>
            <div className="absolute top-7 w-full flex items-center justify-center">
              <Slider
                getAriaLabel={() => "size range"}
                value={[squareFilter.startVal, squareFilter.endVal]}
                shiftStep={1}
                onChange={handleSizeChange}
                step={1}
                min={minSquare}
                max={maxSquare}
                color="var(--color-secondary)"
                sx={{
                  color: "var(--color-secondary)",
                  height: '1px',
                  width: '80%',
                  '& .MuiSlider-thumb': {
                    width: 16,
                    height: 10,
                    borderRadius: '999px',
                    boxShadow: 'none',
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between gap-2 md:gap-4">
          <button
            className='flex items-center gap-4'
            onClick={() => {
              dispatch(handleRegularFilterReset());
              setFilterState(prev => !prev);
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0137 7.34723C12.0137 7.79645 11.9551 8.22809 11.8379 8.64215C11.7207 9.05621 11.5566 9.44293 11.3457 9.80231C11.1348 10.1617 10.8809 10.4918 10.584 10.7925C10.2871 11.0933 9.95898 11.3472 9.59961 11.5543C9.24023 11.7613 8.85156 11.9254 8.43359 12.0464C8.01562 12.1675 7.58398 12.2261 7.13867 12.2222C6.68945 12.2222 6.25781 12.1636 5.84375 12.0464C5.42969 11.9293 5.04297 11.7652 4.68359 11.5543C4.32422 11.3433 3.99414 11.0894 3.69336 10.7925C3.39258 10.4957 3.13867 10.1675 2.93164 9.80817C2.72461 9.44879 2.56055 9.06012 2.43945 8.64215C2.31836 8.22418 2.25977 7.79254 2.26367 7.34723V6.97223H3.01367V7.34723C3.01367 7.72614 3.0625 8.09137 3.16016 8.44293C3.25781 8.79449 3.39648 9.12262 3.57617 9.42731C3.75586 9.73199 3.9707 10.0093 4.2207 10.2593C4.4707 10.5093 4.75 10.7261 5.05859 10.9097C5.36719 11.0933 5.69531 11.232 6.04297 11.3257C6.39062 11.4195 6.75586 11.4683 7.13867 11.4722C7.51758 11.4722 7.88281 11.4234 8.23438 11.3257C8.58594 11.2281 8.91406 11.0894 9.21875 10.9097C9.52344 10.73 9.80078 10.5152 10.0508 10.2652C10.3008 10.0152 10.5176 9.7359 10.7012 9.42731C10.8848 9.11871 11.0234 8.79059 11.1172 8.44293C11.2109 8.09528 11.2598 7.73004 11.2637 7.34723C11.2637 6.96832 11.2148 6.60309 11.1172 6.25153C11.0195 5.89996 10.8809 5.57184 10.7012 5.26715C10.5215 4.96246 10.3066 4.68512 10.0566 4.43512C9.80664 4.18512 9.52734 3.96832 9.21875 3.78473C8.91016 3.60114 8.58203 3.46246 8.23438 3.36871C7.88672 3.27496 7.52148 3.22614 7.13867 3.22223H2.22852L3.93359 4.92731L3.40625 5.45465L0.798828 2.84723L3.40625 0.239807L3.93359 0.767151L2.22852 2.47223H7.13867C7.58789 2.47223 8.01953 2.53082 8.43359 2.64801C8.84766 2.7652 9.23438 2.92926 9.59375 3.1402C9.95312 3.35114 10.2832 3.60504 10.584 3.90192C10.8848 4.19879 11.1387 4.52692 11.3457 4.88629C11.5527 5.24567 11.7168 5.63434 11.8379 6.05231C11.959 6.47028 12.0176 6.90192 12.0137 7.34723Z" fill="white" />
            </svg>
            Reseto
          </button>
          <button className="text-white border border-2 hover: border-secondary px-4 py-2 rounded-full font-semibold text-nowrap">
            Selekto Apartmentin
          </button>
        </div>
      </div>
    </div >
  );
};

export default BuildingFilter;