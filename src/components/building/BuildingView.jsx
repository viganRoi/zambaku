import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextMenu from '../contextMenu/ContextMenu';
import AdmApartmentModal from '../admin/apartments/AdmApartmentModal';
import { AuthProvider } from '../auth/AuthProvider';
import './tabs.css'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import AdmApartmentIdModal from '../admin/apartments/AdmApartmentIdModal';
import { ApartmentModal } from '../';
import { imagePath } from '../../utils/consts';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import { getRegularSeeViewFilter } from '../../features/filter/FilterSlice';

const BuildingView = ({
  handleNext,
  handlePrevious,
  currentIndex,
  buildingData,
  buildingFloorData,
  filterState,
  roomFilter,
  floorFilter,
  squareFilter
}) => {

  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState('selection');
  const seaViewFilter = useSelector(getRegularSeeViewFilter)
  const navigate = useNavigate();
  const [contextMenu, setContextMenu] = useState({
    anchorEl: null,
    open: false,
    data: {}
  });
  const [popup, setPopup] = useState({
    anchorEl: null,
    open: false,
    data: {}
  });
  const isSmallDev = window.innerWidth < 700;

  const getSvgHeight = () => {
    return '100%';
  };

  const handleContextMenu = (e, data) => {
    e.preventDefault();
    setContextMenu({
      anchorEl: e.currentTarget,
      open: true,
      data: data
    });
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };


  const selectionView = () => (
    <div className="absolute md:relative top-0 left-0 w-11/12 h-full bg-brand flex items-center justify-center">
      {buildingData?.map((building, index) =>
        <div
          key={building.buildingName}
          style={{
            height: index === currentIndex ? getSvgHeight() : "0px",
            opacity: currentIndex === index ? 1 : 0,
            transition: "opacity 0.1s ease-in-out",
            width: '100%',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            overflow: 'auto'
          }}
        >
          <svg
            width={"100%"}
            height={"100%"}
            viewBox={building.viewBoxStyle}
          >
            <image
              xlinkHref={`${imagePath}${building.buildingNr}-${building.buildingSide}.png`}
              alt=""
              width={building.imgWidth}
              height={building.imgHeight}
              transform={building.imgTransform}
            />
            {building?.apartmentList?.map((apartment) => {
              // Filtering logic moved here from props
              const isInFloor = parseInt(apartment.floorNumber) >= floorFilter.startVal &&
                parseInt(apartment.floorNumber) <= floorFilter.endVal;
              const isInRoom = roomFilter.includes(apartment.rooms) || roomFilter.includes("all");
              const checkSeaView = seaViewFilter.includes(apartment.hasSeaView.toString()) || seaViewFilter.includes("all");
              const isInSquare = parseInt(apartment.netoSquare) >= squareFilter.startVal &&
                parseInt(apartment.netoSquare) <= squareFilter.endVal;
              if (apartment.pointsType === 'path') {
                return (
                  <path
                    key={apartment.id}
                    d={apartment.path}
                    onContextMenu={(e) => handleContextMenu(e, apartment)}
                    className={
                      isInFloor && isInRoom && isInSquare && checkSeaView
                        ? apartment.isSold
                          ? "sold"
                          : apartment.isReserved
                            ? "reserved"
                            : filterState
                              ? "filtered"
                              : "available"
                        : "disabled"
                    }
                    id={apartment.apartmentId}
                    onMouseEnter={(e) => {
                      e.preventDefault();
                      setPopup({
                        data: {
                          image: apartment.image3dUrl,
                          title: apartment.name,
                          navigateTo: () => navigate(`/apartments/${apartment.id}`),
                          sqft: apartment.netoSquare,
                          bedroom: apartment.rooms,
                          floor: apartment.floorNumber,
                        },
                        open: true,
                        x: e.clientX + 10,
                        y: e.clientY + 10,
                      });
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => {
                      setPopup({
                        x: 0,
                        y: 0,
                        open: false,
                        data: {},
                      });
                    }}
                    onClick={() => {
                      if (
                        isInFloor &&
                        isInRoom &&
                        isInSquare &&
                        !apartment.isSold
                      ) {
                        navigate(`/apartments/${apartment.id}`);
                      }
                    }}
                  />
                );
              }
              if (apartment.pointsType === 'polygon') {
                return (
                  <polygon
                    key={apartment.id}
                    points={apartment.path}
                    onContextMenu={(e) => handleContextMenu(e, apartment)}
                    className={
                      isInFloor && isInRoom && isInSquare
                        ? apartment.isSold
                          ? "sold"
                          : apartment.isReserved
                            ? "reserved"
                            : filterState
                              ? "filtered"
                              : "available"
                        : "disabled"
                    }
                    id={apartment.apartmentId}
                    onClick={() => navigate(`/apartments/${apartment.id}`)}
                    onMouseEnter={(e) => {
                      e.preventDefault();
                      setPopup({
                        data: {
                          image: apartment.image3dUrl,
                          title: apartment.name,
                          navigateTo: () => navigate(`/apartments/${apartment.id}`),
                          sqft: apartment.netoSquare,
                          bedroom: apartment.rooms,
                          floor: apartment.floorNumber,
                        },
                        open: true,
                        x: e.clientX + 10,
                        y: e.clientY + 10,
                      });
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => {
                      setPopup({
                        x: 0,
                        y: 0,
                        open: false,
                        data: {},
                      });
                    }}
                  />
                );
              }
            })
            }
          </svg>
        </div>
      )}
    </div>
  )

  const floorView = () => (
    <div className="absolute md:relative top-0 left-0 w-11/12 h-full bg-brand flex items-center justify-center">
      {buildingFloorData?.map((building, index) =>
        <div
          key={building.buildingName}
          style={{
            height: index === currentIndex ? getSvgHeight() : "0px",
            opacity: currentIndex === index ? 1 : 0,
            transition: "opacity 0.1s ease-in-out",
            width: '100%',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <svg
            width={"100%"}
            height={"100%"}
            preserveAspectRatio="xMidYMid slice"
            style={{ transform: isSmallDev && 'scale(1.9) translateX(20px)' }}
            viewBox={building.viewBoxStyle}
          >
            <image
              xlinkHref={`${imagePath}${building.buildingNr}-${building.buildingSide}.jpg`}
              alt=""
              width={building.imgWidth} height={building.imgHeight}
              transform={building.imgTransform}
            />
            {building?.floorList?.map((apartment) => {
              if (apartment.pointsType === 'path') {
                return (
                  <path
                    key={apartment.id}
                    name={apartment.floorNumber}
                    d={apartment.path}
                    onContextMenu={(e) => handleContextMenu(e, apartment)}
                    className={
                      'available'
                    }
                    id={apartment.apartmentId}
                    onClick={() => navigate(`/buildings/${building.buildingNr}/floor/${apartment.floorNumber}`)}
                  />
                );
              }
              if (apartment.pointsType === 'polygon') {
                return (
                  <polygon
                    key={apartment.id}
                    points={apartment.path}
                    name={apartment.floorNumber}
                    className={"available"}
                    id={apartment.apartmentId}
                    onClick={() => navigate(`/buildings/${building.buildingNr}/floor/${apartment.floorNumber}`)}
                  />
                );
              }
            })}
          </svg>
        </div>
      )}
    </div>
  )

  return (
    <div className="relative w-full h-[60vh] md:h-[100vh] flex flex-col items-center justify-center">
      <div className='absolute w-11/12 md:5/6 h-0 flex justify-center items-center top-10 z-10'>
        <div className="flex items-center">
          <div className='tabsB'>
            <input type="radio" id='radio-1' name='tabs' checked={selectedTab === 'selection'} />
            <label
              className='tabB'
              onClick={() => {
                handleTabClick('selection');
              }}
              htmlFor='radio-1'
              style={{ fontSize: '16px' }}
            >
              {t('apartmenti')}
            </label>
            <input type="radio" id='radio-2' name='tabs' checked={selectedTab === 'floor'} />
            <label
              className='tabB'
              onClick={() => {
                handleTabClick('floor');
              }}
              htmlFor='radio-1'
              style={{ fontSize: '16px' }}
            >
              {t('kati')}
            </label>
          </div>
        </div>
      </div>
      <div className="relative bg-brand w-full h-full flex flex-col justify-center items-center overflow-x-auto md:overflow-x-hidden">
        {selectedTab === 'selection' ? selectionView() : floorView()}
      </div>
      <div className="absolute w-full h-[0px] flex justify-center items-center z-1">
        <div className="absolute w-11/12 h-0 flex justify-between px-4">
          <button onClick={handlePrevious} className='bg-primary transition-all duration-.3s hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center'>
            <SlArrowLeft color='#fff' />
          </button>
          <button onClick={handleNext} className='bg-primary transition-all duration-.3s  hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center'>
            <SlArrowRight color='#fff' />
          </button>
        </div>
      </div>
      {contextMenu.open &&
        <AuthProvider hide={true}>
          <ContextMenu menu={contextMenu} setMenu={setContextMenu} />
        </AuthProvider>
      }
      {popup.open && <ApartmentModal apartment={popup.data} mousePosition={mousePosition} />}
      <AdmApartmentModal />
      <AdmApartmentIdModal />
    </div>
  )
}

export default BuildingView