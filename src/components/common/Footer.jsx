import React from "react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { ImLinkedin } from "react-icons/im";
import { AiFillTikTok } from "react-icons/ai";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const{t} = useTranslation()
  return (
    <footer className="bg-primary text-white w-full h-full flex flex-col items-center justify-center py-10">
      <div className="w-11/12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="flex flex-col axiforma-thin text-center md:text-left gap-4 md:gap-0">
          <h1 className="text-lg uppercase text-secondary">{t('contact')}</h1>
          <p className="tex-sm text-secondaryTxt">Sales Office</p>
        </div>
        <div className="text-center md:text-right flex flex-col gap-4 md:gap-0">
          <p className="text-3xl valky">KS: &nbsp;&nbsp; +383 49 100 109</p>
          <p className="text-3xl valky">MNE: +382 67 501 776</p>
          <p className="text-gray-400 axiforma-thin">info@otrantreef.com</p>
        </div>
      </div>
      <div className="w-11/12 flex justify-center items-center my-36">
        <img
          src="/assets/images/brand/logo.png"
          alt="Otrant Reef Logo"
          className="mx-auto h-24"
        />
      </div>
      <div className="w-11/12 flex flex-col md:flex-row justify-between md:items-end gap-4 md:gap-0">
        <div className="md:w-1/3 flex flex-col gap-4">
          <p className="text-xl md:text-5xl valky">Ulcinj, Montenegro</p>
          <div className="flex gap-4 items-center">
            <button 
              className="relative inline-flex items-center justify-center px-12 py-3 overflow-hidden axiforma text-primary bg-secondary rounded-lg group"
              >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-secondaryD rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="relative text-nowrap">{t('seeonmap')}</span>
            </button>
            <div className="flex gap-4">
              <a href="#" className="text-bck text-2xl hover:opacity-90 duration-300">
                <FaFacebook />
              </a>
              <a href="#" className="text-bck text-2xl hover:opacity-90 duration-300">
                <RiInstagramFill />
              </a>
              <a href="#" className="text-bck text-2xl hover:opacity-90 duration-300">
                <ImLinkedin />
              </a>
              <a href="#" className="text-bck text-2xl hover:opacity-90 duration-300">
                <AiFillTikTok />
              </a>
              <a href="#" className="text-bck text-2xl hover:opacity-90 duration-300">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
              className="relative inline-flex items-center justify-center px-12 py-3 overflow-hidden axiforma text-primary bg-secondary rounded-lg group"
              >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-secondaryD rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="relative text-nowrap">{t('plan')}</span>
          </button>
          <button className="text-white md:text-lg hover:opacity-90 duration-300 text-nowrap axiforma">
           {t('select')}
          </button>
        </div>
      </div>
      <div className="w-11/12 flex flex-col md:flex-row items-center justify-between border-t border-gray-600 pt-6 mt-6 gap-4 md:gap-0">
        <div className="text-secondaryTxt text-sm">
          © OTRANT REEF — 2025 ALL RIGHTS RESERVED
        </div>
        <div className="text-secondaryTxt text-sm flex gap-4">
          <a href="#" className="hover:text-secondary duration-300">
            PRIVACY AND POLICY
          </a>
          <a href="#" className="hover:text-secondary duration-300">
            TERMS OF USE
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
