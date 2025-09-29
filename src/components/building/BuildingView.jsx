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
  filterState,
  roomFilter,
  floorFilter,
  squareFilter
}) => {

  const { t } = useTranslation();
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

  return (
    <div className="relative w-full h-[60vh] md:h-[100vh] flex flex-col items-center justify-center">
      <div className="relative bg-brand w-full h-full flex flex-col justify-center items-center overflow-x-auto md:overflow-x-hidden">
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
                  xlinkHref={`${imagePath}${building.buildingNr}-${building.buildingSide}.jpg`}
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
                  const isInSquare = parseInt(apartment.square) >= squareFilter.startVal &&
                    parseInt(apartment.square) <= squareFilter.endVal;
                  if (apartment.pointsType === 'path') {
                    return (
                      <path
                        key={apartment.id}
                        d={apartment.path}
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
      </div>
      <div className="absolute w-full h-[0px] flex justify-center items-center z-1">
        <div className="absolute w-11/12 h-0 flex justify-between px-4">
          <button onClick={handlePrevious} className='bg-secondary transition-all hover:text-bck w-[35px] md:w-[60px] h-[35px] md:h-[60px] radius-50 rounded-[50px] flex items-center justify-center'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12L19 12M5 12L11 18M5 12L11 6" stroke="#00345B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button onClick={handleNext} className='bg-secondary transition-all  hover:text-bck w-[35px] md:w-[60px] h-[35px] md:h-[60px] radius-50 rounded-[50px] flex items-center justify-center'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12L5 12M19 12L13 18M19 12L13 6" stroke="#00345B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      {contextMenu.open &&
        <AuthProvider hide={true}>
          <ContextMenu menu={contextMenu} setMenu={setContextMenu} />
        </AuthProvider>
      }
      {/* {popup.open && <ApartmentModal apartment={popup.data} mousePosition={mousePosition} />} */}
      <AdmApartmentModal />
      <AdmApartmentIdModal />
    </div>
  )
}

export default BuildingView