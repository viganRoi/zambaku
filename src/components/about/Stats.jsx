import React, { useState } from "react";
import { useTranslation } from "react-i18next";
const Stats = () => {
  const {t} = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const statsData = [
    { number: "25", label: t('villas'), imgSrc: "/assets/images/hero/3.png" },
    { number: "184", label: t("apartments"), imgSrc: "/assets/images/hero/1.png" },
    { number: "209", label: t("residents"), imgSrc: "/assets/images/hero/2.png" },
  ];

  return (
    <div className="bg-white py-8 md:py-24 text-center">
      <h3 className="text-sm uppercase text-primary mb-6 axiforma-thin">{t('innumbers')}</h3>
      <div className="flex flex-row justify-center gap-4 md:gap-8 px-4 md:px-20 ">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="border border-primary rounded-lg w-full md:w-1/3 h-auto py-12 md:py-0 md:h-64 text-left flex flex-col justify-center items-center transition duration-300"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index ? (
              <img
                src={stat.imgSrc}
                alt={stat.label}
                className="h-full w-full object-cover rounded-lg transition duration-300"
              />
            ) : (
              <>
                <h2 className="text-5xl md:text-8xl valky text-primary transition duration-300">{stat.number}</h2>
                <p className="mt-2 text-sm md:text-lg text-primary axiforma-thin transition duration-300">{stat.label}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;