import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const BuildingTitle = ({ buildingName }) => {
   const { t} = useTranslation();
  const navigate = useNavigate();
  return (
    <div className='w-full bg-white flex items-center justify-center pt-12'>
      <div className='w-11/12 flex gap-4 items-center'>
        <button
          onClick={() => navigate(-1)}
          className='w-12 h-12 border border-primary rounded-full flex items-center justify-center bg-white text-primary'
        >
          X
        </button>
        <h1 className='hidden md:block valky text-5xl text-primary '>{t('tower')} <span className='uppercase'>{buildingName}</span></h1>
      </div>
    </div>
  )
}

export default BuildingTitle