import { useNavigate } from "react-router-dom";
import { imagePath } from "../../utils/consts";
import "./tabs.css";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useState } from "react";
import { getRegularSeeViewFilter } from "../../features/filter/FilterSlice";
import { useSelector } from "react-redux";

const BuildingMobile = ({
  handleNext,
  handlePrevious,
  currentIndex,
  buildingData,
  buildingFloorData,
  filterState,
  roomFilter,
  floorFilter,
  squareFilter,
  available
}) => {
  const [selectedTab, setSelectedTab] = useState('selection');
  const seaViewFilter = useSelector(getRegularSeeViewFilter)
  const navigate = useNavigate();
  const isSmallDev = window.innerWidth < 700;

  const getSvgHeight = () => {
    return '100%';
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };


  const selectionView = () => (
    <>
      {buildingData?.map((building, index) => (
        <div
          key={building.buildingName}
          style={{
            height: index === currentIndex ? getSvgHeight() : "0px",
            width: "300%",
            opacity: currentIndex === index ? 1 : 0,
            transition: "opacity 0.1s ease-in-out",
            position: "absolute",
            top: 0,
            // left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "auto",
            backgroundColor: "white",
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
              xlinkHref={`${imagePath}${building.buildingNr}-${building.buildingSide}.png`}
              alt=""
              width={building.imgWidth}
              height={building.imgHeight}
              transform={building.imgTransform}
            />
            {building?.apartmentList?.map((apartment) => {
              const isInFloor = parseInt(apartment.floorNumber) >= floorFilter.startVal &&
                parseInt(apartment.floorNumber) <= floorFilter.endVal;
              const isInRoom = roomFilter.includes(apartment.rooms) || roomFilter.includes("all");
              const checkSeaView = seaViewFilter.includes(apartment.hasSeaView.toString()) || seaViewFilter.includes("all");
              const isInSquare = parseInt(apartment.netoSquare) >= squareFilter.startVal &&
                parseInt(apartment.netoSquare) <= squareFilter.endVal;

              if (apartment.pointsType === "path") {
                return (
                  <path
                    d={apartment.path}
                    onContextMenu={(e) => handleContextMenu(e, apartment)}
                    className={
                      isInFloor && isInRoom && isInSquare  && checkSeaView
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
      ))}
    </>
  );

  const floorView = () => (
    <>
      {buildingFloorData?.map((building, index) =>
        <div
          key={building.buildingName}
          style={{
            height: index === currentIndex ? getSvgHeight() : "0px",
            opacity: currentIndex === index ? 1 : 0,
            transition: "opacity 0.1s ease-in-out",
            width: "250%",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "auto",
            top: 0,
            backgroundColor: "#fff",
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
              width={building.imgWidth} height={building.imgHeight}
              transform={building.imgTransform}
            />
            {building?.floorList?.map((apartment) => {
              // Filtering logic as in selectionView
              const isInFloor = parseInt(apartment.floorNumber) >= floorFilter.startVal &&
                parseInt(apartment.floorNumber) <= floorFilter.endVal;
              const isInRoom = roomFilter.includes(apartment.rooms) || roomFilter.includes("all");
              const isInSquare = parseInt(apartment.netoSquare) >= squareFilter.startVal &&
                parseInt(apartment.netoSquare) <= squareFilter.endVal;

              if (apartment.pointsType === 'path') {
                return (
                  <path
                    key={apartment.id}
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
    </>
  )

  return (
    <div className="relative w-full h-[90vh] flex items-start justify-center mb-4">
      <div className="absolute w-11/12 flex flex-row justify-center items-center top-24  z-10">
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
              Apartment
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
              Kati
            </label>
          </div>
        </div>
      </div>
      <div className="absolute w-11/12 flex flex-row justify-between items-center -bottom-4 z-10">
        <h1 className="text-primary text-xl capitalize">available: {available}</h1>
        <div className="flex items-center">
          <div className="right-0 top-12 flex justif-center items-center gap-4 pl-4">
            <button
              onClick={handlePrevious}
              className="bg-primary transition-all duration-.3s hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
            >
              <SlArrowLeft color="#fff" />
            </button>
            <button
              onClick={handleNext}
              className="bg-primary transition-all duration-.3s  hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
            >
              <SlArrowRight color="#fff" />
            </button>
          </div>
        </div>
      </div>
      <div className="relative w-screen bg-white h-full flex flex-col justify-center items-center overflow-x-auto">
        {selectedTab === 'selection' ? selectionView() : floorView()}
      </div>
    </div>
  );
};

export default BuildingMobile;