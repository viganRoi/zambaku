import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { BuildingModal } from "../";
import { buildings, object } from "../../utils/server";

  const ViewProject = () => {
  const navigate = useNavigate();
  const isSmallDev = window.innerWidth < 700;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % buildings.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + buildings.length) % buildings.length
    );
  };

  const currentBuilding = buildings[currentIndex];
  const hoveredBuilding = object.find(llamella => llamella.id === hoveredId);

  const getSvgHeight = () => {
    return "100%";
  };

  return (
    <div className="relative bg-brand w-full h-[110vh] md:min-h-[1080px] flex flex-col items-center justify-center">
      <div className="relative bg-brand w-full h-full flex flex-col justify-center items-center overflow-x-auto md:overflow-x-hidden">
        <div
          className="absolute md:relative w-full flex items-center justify-center"
          style={{ height: getSvgHeight() }}
        >
          <div
            style={{
              transition: "opacity 0.1s ease-in-out",
              height: getSvgHeight(),
              width: isSmallDev ? "250%" : "100%",
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: isSmallDev ? "auto" : "hidden",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          >
            <svg
              x="0px"
              y="0px"
              viewBox="0 0 1920 1080"
              height={isSmallDev ? "" : "100%"}
              width={"100%"}
              xmlSpace="preserve"
              preserveAspectRatio="xMidYMid slice"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
            >
              <image
                href={currentBuilding.image}
                alt={currentBuilding.name}
                width="100%"
                height="100%"
              />
              {currentBuilding.points.map((point) => (
                <path
                  key={point.id}
                  className={point.name === 'a' ? 'sold' : 'available'}
                  d={point.path}
                  onMouseEnter={() => setHoveredId(point.id)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => navigate(`/buildings/${point.name}`)}
                  style={{
                    cursor: 'pointer'
                  }}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute w-11/12 h-0 flex justify-between p-4 z-10">
        <button
          onClick={handlePrevious}
          className="bg-primary transition-all duration-.3s hover:opacity-80 w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
        >
          <SlArrowLeft color="#fff" />
        </button>
        <button
          onClick={handleNext}
          className="bg-primary transition-all duration-.3s  hover:opacity-80 w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
        >
          <SlArrowRight color="#fff" />
        </button>
      </div>
      <BuildingModal object={hoveredBuilding} mousePosition={mousePosition} />
    </div>
  );
};

export default ViewProject;
