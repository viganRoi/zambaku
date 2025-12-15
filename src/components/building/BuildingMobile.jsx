import { useNavigate } from "react-router-dom";
import { imagePath } from "../../utils/consts";
import "./tabs.css";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { getRegularSeeViewFilter } from "../../features/filter/FilterSlice";
import { roomMatchesFilter, floorMatchesFilter } from '../../utils/filterHelpers';
import { useSelector } from "react-redux";

const BuildingMobile = ({
  handleNext,
  handlePrevious,
  currentIndex,
  buildingData,
  filterState,
  roomFilter,
  floorFilter,
  squareFilter,
}) => {
  const seaViewFilter = useSelector(getRegularSeeViewFilter)
  const navigate = useNavigate();

  const getSvgHeight = () => {
    return '100%';
  };

  return (
    <div className="relative w-full h-[90vh] flex items-center justify-center mb-4">
      <div className="absolute w-full h-[0px] flex justify-end items-center z-1 bottom-14 right-1">
        <div className="absolute w-1/4 h-0 flex justify-between px-4">
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
      <div className="relative w-screen bg-primary h-full flex flex-col justify-center items-center overflow-x-auto">
        {buildingData?.map((building, index) =>
          <div
            key={building.buildingName}
            style={{
              height: index === currentIndex ? getSvgHeight() : "0px",
              width: "200%",
              opacity: currentIndex === index ? 1 : 0,
              transition: "opacity 0.1s ease-in-out",
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "auto",
            }}
          >
            <svg
              x="0px"
              y="0px"
              viewBox="0 0 1920 1080"
              width={"100%"}
              xmlSpace="preserve"
              preserveAspectRatio="xMidYMid slice"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
            >
              <image
                xlinkHref={`${imagePath}${building.buildingNr}-${building.buildingSide}.jpg`}
                alt=""
                width={building.imgWidth}
                height={building.imgHeight}
                transform={building.imgTransform}
              />
              {building?.apartmentList?.map((apartment) => {
              const isInFloor = floorMatchesFilter(floorFilter, apartment.floorNumber);
              const isInRoom = roomMatchesFilter(roomFilter, apartment.rooms);
              const isInSquare = parseInt(apartment.square) >= squareFilter.startVal &&
                parseInt(apartment.square) <= squareFilter.endVal;
              if (apartment.pointsType === 'path') {
                  return (
                    <path
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
                if (apartment.pointsType === "polygon") {
                  return (
                    <polygon
                      key={apartment.id}
                      points={apartment.path}
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
                      onClick={() => navigate(`/apartments/${apartment.id}`)} />
                  );
                }
              })}
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildingMobile;