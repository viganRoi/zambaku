import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { homepage, planmetricImageUrl } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TfiClose } from "react-icons/tfi";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { PiPhoneThin } from "react-icons/pi";
import './style.css'
import { SlArrowLeft } from 'react-icons/sl';
import {
    getWishlistCount,
    handleWishlistData,
    isProductInWishlist,
} from "../../features/wishList/WishlistSlice";

import { useTranslation } from "react-i18next";

const SingleApartment = ({ apartment }) => {
    const { t } = useTranslation();
    const isSmallDev = window.innerWidth < 700;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wishListItemCount = useSelector(getWishlistCount);
    const isInWishlist = useSelector((state) =>
        isProductInWishlist(state, apartment.id)
    );
    const [selectedTab, setSelectedTab] = useState('2d');

    const { isSold, imageUrl, image3dUrl, pdfUrl, netoSquare, grossySquare, floorNumber, name, balconySquare, hasSeaView, subtitle, rooms, apartmentId, apartmentNumber, apartmentPositionImageUrl, vtourUrl } = apartment;

    const handleTabClick = (view) => {
        setSelectedTab(view);
    };
    const handleWishlistDataFunction = () => {
        dispatch(handleWishlistData(apartment));
    };


    const [active, setActive] = useState("2d");

    const buttons = [
        { label: "3d" },
        { label: "2d" },
        { label: "on the floor" },
    ];


    const handleOpenPdf = (pdfUrl) => {
        window.open(`/pdfs/${pdfUrl}`, '_blank');
    };

    return (
        <div
            className='w-full h-full pb-20 bg-white flex flex-col items-center justify-center '
            style={{ backgroundImage: `url(/assets/images/hero/bck/1.png)` }}
        >
            <div className="w-11/12 h-full z-1 overflow-y-auto flex flex-col-reverse md:flex-row items-center scroller-thin">
                <div className="w-full md:w-3/12 h-full text-primary flex flex-col items-start  gap-4 pb-8 md:pb-0">
                    <div className='hidden w-full md:flex items-center gap-4 pb-8'>
                        <button onClick={() => navigate(-1)} className=' cursor-pointer bg-primary transition-all duration-.3s hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center'>
                            <SlArrowLeft color='#fff' />
                        </button>
                        <h1 className='valky text-primary text-lg'>{t('backtoselectanobject')}</h1>
                    </div>
                    <div className='w-full flex flex-col items-center gap-4 py-4'>
                        <div className='hidden md:flex w-full items-start justify-between gap-4 py-4'>
                            <p className='text-6xl valky'>{(netoSquare || 0).toFixed(2)}m<sup>2</sup></p>
                            <button
                                className={`p-2 md:p-4 text-sm md:text-base uppercase transition border text-nowrap bg-primary rounded-full`}
                                onClick={() => {
                                    handleWishlistDataFunction();
                                }}
                            >
                                {isInWishlist ?
                                    <IoIosHeart className="fill-white text-lg sm:text-2xl" />
                                    :
                                    <IoIosHeartEmpty className="fill-white text-lg sm:text-2xl" />
                                }
                            </button>
                        </div>
                        <div className='w-full flex justify-between items-center mt-2 border-b border-[#0E375240] pb-2'>
                            <p className='text-lg md:text-xl axiforma-thin'>{t('apartmentii')} </p>
                            <p className='text-xl md:text-2xl valky'>{name}</p>
                        </div>
                        <div className='w-full flex justify-between items-center mt-2 border-b border-[#0E375240] pb-2'>
                            <p className='text-lg md:text-xl axiforma-thin'>{t('netarea')}</p>
                            <p className='text-xl md:text-2xl valky'>{(netoSquare || 0).toFixed(2)}m<sup>2</sup></p>
                        </div>
                        <div className='w-full flex justify-between items-center mt-4 border-b border-[#0E375240] pb-2'>
                            <p className='text-lg md:text-xl axiforma-thin'>{t('greenterrace')}</p>
                            <p className='text-xl md:text-2xl valky'>{(balconySquare || 0).toFixed(2)}m<sup>2</sup></p>
                        </div>
                        <div className='w-full flex justify-between items-center mt-4 border-b border-[#0E375240] pb-2'>
                            <p className='text-lg md:text-xl axiforma-thin'>{t('type')} </p>
                            <p className='text-xl md:text-2xl valky'>
                                {rooms === 0 || rooms === "Studio" ? rooms : `${rooms} + 1`}
                            </p>
                        </div>
                        <div className='w-full flex justify-between items-center mt-4 border-b border-[#0E375240] pb-2'>
                            <p className='text-lg md:text-xl axiforma-thin'>{t('floor')} </p>
                            <p className='text-xl md:text-2xl valky'>{floorNumber}</p>
                        </div>
                        <div className='w-full flex justify-between items-center mt-4 border-b border-[#0E375240] pb-2'>
                            <p className='text-lg md:text-xl axiforma-thin uppercase'>{t('seaview')} </p>
                            <p className='text-xl md:text-2xl valky'>{hasSeaView === true ? t('yes') : t('no')}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                    </div>
                    <button className="relative uppercase inline-flex items-center justify-center w-full px-12 py-3 overflow-hidden axiforma-thin text-white bg-primary rounded-lg group">
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-tertiary rounded-full group-hover:w-124 group-hover:h-124"></span>
                        <span className="relative">{t('bookapointment')}</span>
                    </button>
                    {/* <button
                        onClick={() => {
                            handleOpenPdf(pdfUrl);
                        }}
                        className="relative uppercase inline-flex items-center justify-center w-full px-12 py-3 overflow-hidden axiforma-thin text-primary bg-transparent rounded-lg border border-[#0E375240]">
                        PDF
                    </button> */}
                    <button
                        onClick={() => {
                            handleOpenPdf(pdfUrl);
                        }}
                        className="relative uppercase inline-flex items-center justify-center w-full px-12 py-3 overflow-hidden axiforma-thin text-primary bg-transparent rounded-lg border border-[#0E375240]">
                        PDF
                    </button>
                </div>
                <div className='w-full md:w-9/12 h-full md:min-h-screen flex flex-col md:items-center justify-center relative'>
                    <div className="z-1000 absolute top-10 md:top-18 bg-gray-200 rounded-full flex items-center overflow-hidden text-sm font-medium">
                        {buttons.map((btn) => (
                            <button
                                key={btn.label}
                                onClick={() => setActive(btn.label)}
                                className={`px-3 md:px-6 py-2 md:py-4 transition ${active === btn.label
                                    ? "bg-primary text-white rounded-full"
                                    : "text-primary hover:bg-gray-300 rounded-full"
                                    }`}
                            >
                                {btn.label === 'on the floor' ? (t('onthefloor')) : (btn.label)}
                            </button>
                        ))}
                    </div>
                    {active === "360" ? (
                        <div className="h-full w-full bg-brandD relative text-white">
                            <iframe width="100%" height="100%" frameborder="10" allow="xr-spatial-tracking; gyroscope; accelerometer" src={vtourUrl}></iframe>
                        </div>
                    ) : (
                        <img src={
                            active === "2d"
                                ? `${homepage}${planmetricImageUrl}${name}.jpg`
                                : active === "on the floor"
                                    ? `${homepage}${planmetricImageUrl}${name}-floor.jpg`
                                    : `${homepage}${planmetricImageUrl}${name}-3d.png`
                        }
                            alt={
                                active === "2d"
                                    ? "2D view"
                                    : active === "on the floor"
                                        ? "On the floor view"
                                        : "3D view"
                            }
                            className="h-[500px] md:h-[700px] object-contain"
                            style={{
                                cursor: "pointer",
                            }}
                        />
                    )}
                </div>
                <div className='w-11/12 md:hidden flex items-center justify-center py-4 gap-4'>
                    <p className='text-primary text-4xl valky'>{(grossySquare || 0).toFixed(2)}m<sup>2</sup></p>
                    <button
                        className={`absolute p-2 md:p-4 text-sm md:text-base uppercase transition border text-nowrap bg-primary rounded-full right-4`}
                        onClick={() => {
                            handleWishlistDataFunction();
                        }}
                    >
                        {isInWishlist ?
                            <IoIosHeart className="fill-white text-lg sm:text-2xl" />
                            :
                            <IoIosHeartEmpty className="fill-white text-lg sm:text-2xl" />
                        }
                    </button>
                </div>
                <div className='w-full md:hidden flex items-center gap-4 pt-12'>
                    <button onClick={() => navigate(-1)} className=' cursor-pointer bg-primary transition-all duration-.3s hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center'>
                        <SlArrowLeft color='#fff' />
                    </button>
                    <h1 className='valky text-primary text-base'>{t('backtoselectanobject')}</h1>
                </div>
            </div>
        </div>
    )
}

export default SingleApartment