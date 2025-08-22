import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFloorByBuilding,
} from "../../features/apartment/ApartmentAPI";
import { imagePath } from "../../utils/consts";
import {
  getFloorApartmentsSvgData,
  getFloorStatus,
} from "../../features/apartment/ApartmentSlice";
import {
  SlArrowDown,
  SlArrowUp,
} from "react-icons/sl";
import { AuthProvider } from "../auth/AuthProvider";
import ContextMenu from "../contextMenu/ContextMenu";
import AdmApartmentModal from "../admin/apartments/AdmApartmentModal";
import { ApartmentFloorModal } from '../'
import { useTranslation } from "react-i18next";

const Floor = () => {
  const isSmallDev = window.innerWidth < 700;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const floorData = useSelector(getFloorApartmentsSvgData);
  const { id, floorId } = useParams();
  const { t } = useTranslation();
  const status = useSelector(getFloorStatus);
  const [contextMenu, setContextMenu] = useState({
    anchorEl: null,
    open: false,
    data: {},
  });

  useEffect(() => {
    dispatch(getFloorByBuilding(id));
  }, [dispatch, floorId]);

  const getTheIndex = () => {
    if(id.substring('f-'.length) === 'c') {
      return 1;
    }
    else return 2
  }

  const getSvgHeight = () => {
    return "100%";
  };

  const location = useLocation();
  const floorNumberFromState = location.state?.floorNumber;
  const initialFloor = floorNumberFromState !== undefined
    ? parseInt(floorNumberFromState, 10)
    : 0;


  const totalFloors = 9;
  // const floors = Array.from(
  //   { length: totalFloors },
  //   (_, i) => totalFloors - i
  // ).reverse();
  // Filter out floor 0 and 1 for display
  const allFloors = Array.from({ length: totalFloors + 1 }, (_, i) => i);
  const displayFloors = allFloors.filter(floor => floor !== 0);
  // const [activeFloor, setActiveFloor] = useState(floors[0]);
  const [activeFloor, setActiveFloor] = useState(parseInt(floorId));
  const visibleRange = isSmallDev ? 3 : 5;
  const [startIndex, setStartIndex] = useState(2);

  const updateVisibleFloors = (newActiveFloor) => {
    let idx = displayFloors.indexOf(newActiveFloor);
    let newStartIndex = idx - Math.floor(visibleRange / 2);
    if (newStartIndex < 0) newStartIndex = 0;
    if (newStartIndex > displayFloors.length - visibleRange) {
      newStartIndex = Math.max(displayFloors.length - visibleRange, 0);
    }
    setStartIndex(newStartIndex);
  };


  useEffect(() => {
    updateVisibleFloors(parseInt(floorId, 10));
    setActiveFloor(parseInt(floorId, 10));
  }, [floorId]);

  const minusFloor = () => {
    const currentIndex = displayFloors.indexOf(activeFloor);
    if (currentIndex < displayFloors.length - 1) {
      const newActiveFloor = displayFloors[currentIndex + 1];
      setActiveFloor(newActiveFloor);
      updateVisibleFloors(newActiveFloor);
      navigate(`/buildings/${id}/floor/${newActiveFloor}`)
    }
  };

  const plusFloor = () => {
    const currentIndex = displayFloors.indexOf(activeFloor);
    if (currentIndex > 0) {
      const newActiveFloor = displayFloors[currentIndex - 1];
      setActiveFloor(newActiveFloor);
      updateVisibleFloors(newActiveFloor);
      navigate(`/buildings/${id}/floor/${newActiveFloor}`)
    }
  };

  const handleContextMenu = (e, data) => {
    e.preventDefault();
    console.log(data);
    setContextMenu({
      anchorEl: e.currentTarget,
      open: true,
      data: data,
    });
  };

  const [hoveredId, setHoveredId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const hoveredApartment = floorData
    ?.flatMap(floor => floor.apartmentList || [])
    .find(apartment => apartment.id === hoveredId);

  if (!floorData || !floorData[activeFloor]) {
    console.warn("floorData or activeFloor is invalid:", floorData, activeFloor);

  }


  return (
    <>
      <div className="bg-bck w-full pt-20 md:pt-0 h-[200px] md:h-[300px] flex flex-col items-center justify-center relative">
        <div className="w-11/12 md:w-5/6 text-black flex relative">
          <h1 className="certon text-2xl md:text-5xl text-primary">
            {t('tower')}: {floorData?.[0]?.apartmentList?.[0]?.apartmentNumber || "N/A"}
          </h1>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center content-center py-24 md:pt-24 md:pb-0 bg-white">
        <div className="w-full flex flex-col align-center justify-center gap-4">
          <div className="w-full flex flex-row justify-center items-center gap-4">
            <button
              onClick={plusFloor}
              className="bg-primary transition-all duration-.3s hover:bg-opacity-80 text-white w-8 md:w-14 h-8 md:h-14 radius-50 rounded-full flex items-center justify-center"
            >
              <SlArrowUp className="-rotate-90" />
            </button>
            <div className="flex flex-row justify-center items-center gap-4">
              {displayFloors
                .slice(startIndex, startIndex + visibleRange)
                .map((floor) => (
                  <button
                    key={floor}
                    className={`${floor === activeFloor
                      ? "bg-primary text-white"
                      : "bg-brand text-primary"
                      } border border-primary text-lg md:text-4xl certon p-2  w-8 md:w-14 h-8 md:h-14 m-2 rounded-full flex items-center justify-center`}
                    onClick={() => {
                      setActiveFloor(floor);
                      updateVisibleFloors(floor);
                    }}
                  >
                    {floor}
                  </button>
                ))}
            </div>
            <button
              onClick={minusFloor}
              className="bg-primary transition-all duration-.3s hover:bg-opacity-80 text-white w-8 md:w-14 h-8 md:h-14 radius-50 rounded-full flex items-center justify-center"
            >
              <SlArrowDown className="-rotate-90" />
            </button>
          </div>
          <div className="relative w-full h-[350px] md:h-screen overflow-auto flex justify-center items-center">
            <div
              key={floorData?.buildingName}
              style={{
                transition: "opacity 0.1s ease-in-out",
                height: "100%",
                width: isSmallDev ? "160%" : "90%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
              }}
            >
              {floorData?.find((it) => it.floorNumber === activeFloor) ? <svg
                x="0px"
                y="0px"
                width={"100%"}
                height={"100%"}
                viewBox={"0 0 1920 1080"}
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsSvg="http://www.w3.org/2000/svg"
              >
                <image
                  width={floorData && floorData[activeFloor - getTheIndex()]?.imageWidth}
                  height={floorData && floorData[activeFloor - getTheIndex()]?.imageHeight}
                  transform={floorData && floorData[activeFloor - getTheIndex()]?.imageTransform}
                  xlinkHref={`${imagePath}${id}-k${activeFloor}.jpg`}
                ></image>
                {floorData?.map((floor) => {
                  if (parseInt(floor.floorNumber) === activeFloor) {
                    return floor.apartmentList?.map((apartment) => {
                      return (
                        <path
                          onClick={() => {
                            if (apartment.isSold) return;
                            navigate(`/apartments/${apartment.id}`);
                          }}
                          onContextMenu={(e) => handleContextMenu(e, apartment)}
                          className={
                            apartment.isSold
                              ? "sold"
                              : apartment.isReserved
                                ? "reserved"
                                : "availableFloor"
                          }
                          d={apartment.path}
                          onMouseEnter={() => setHoveredId(apartment.id)}
                          onMouseMove={handleMouseMove}
                          onMouseLeave={() => setHoveredId(null)}
                        />
                      );
                    });
                  } else return <h1>{floor.floorNumber}</h1>;
                })}
              </svg> : <h1 className="text-3xl text-primary">Ky kati nuk ekziston në këtë objekt</h1>}
            </div>
          </div>
        </div>
        {contextMenu.open && (
          <AuthProvider hide={true}>
            <ContextMenu menu={contextMenu} setMenu={setContextMenu} />
          </AuthProvider>
        )}
        <AdmApartmentModal />
        <ApartmentFloorModal apartment={hoveredApartment} mousePosition={mousePosition} />
      </div>
    </>
  );
};

export default Floor;
