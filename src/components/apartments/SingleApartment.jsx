import { useDispatch, useSelector } from 'react-redux';
import { homepage, planmetricImageUrl } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import './style.css'
import { SlArrowLeft } from 'react-icons/sl';
import {
    handleWishlistData,
    isProductInWishlist,
} from "../../features/wishList/WishlistSlice";

import { useTranslation } from "react-i18next";

const SingleApartment = ({ apartment }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { isSold, imageUrl, image3dUrl, pdfUrl, netoSquare, grossySquare, floorNumber, name, balconySquare, hasSeaView, subtitle, rooms, apartmentId, apartmentNumber, apartmentPositionImageUrl, vtourUrl } = apartment;

    return (
        <div
            className='w-full h-full min-h-[1200px] flex flex-col items-center justify-center relative py-24'
            style={{ backgroundImage: `url(/assets/images/hero/bckSingle.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="absolute inset-0 bg-primary/60" style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }} />
            <div className="base-width h-1/2 z-10  flex flex-col-reverse md:flex-row items-center justify-center scroller-thin">
                <div className="w-full md:w-1/2 h-full text-white flex flex-col items-center justify-between gap-4 pb-8 md:pb-0 pr-12">
                    <div className='w-full flex items-center'>
                        <button onClick={() => navigate(-1)} className='px-6 py-3 border border-secondary text-white rounded-full flex items-center justify-center'>
                            Kthehu
                        </button>
                    </div>
                    <div className='w-full flex flex-col items-start gap-2 py-4'>
                        <div className='w-full flex flex-col w-full items-start justify-between py-4'>
                            <p className='text-[150px] font-thin leading-[150px]' style={{ lineHeight: '160px' }}>{name}</p>
                            <p className='text-[150px] text-secondary leading-[150px]' style={{ lineHeight: '160px' }}>{(netoSquare || 0).toFixed(2)}m<sup>2</sup></p>
                        </div>
                        <div className="w-full flex gap-4 items-center">
                            <svg width="48" height="50" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.7 2.44446C16.38 2.44446 17.22 2.44446 17.862 2.78446C18.4313 3.08793 18.8902 3.56358 19.173 4.14346C19.5 4.80846 19.5 5.67946 19.5 7.42246V17.4665C19.5 19.2095 19.5 20.0805 19.173 20.7465C18.8902 21.3263 18.4313 21.802 17.862 22.1055C17.22 22.4445 16.38 22.4445 14.7 22.4445H9.3C7.62 22.4445 6.78 22.4445 6.138 22.1045C5.56866 21.801 5.10981 21.3253 4.827 20.7455C4.5 20.0805 4.5 19.2095 4.5 17.4665V7.42246C4.5 5.67946 4.5 4.80846 4.827 4.14246C5.10998 3.56295 5.56882 3.08767 6.138 2.78446C6.78 2.44446 7.62 2.44446 9.3 2.44446H14.7Z" stroke="#E4AB8E" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9.5 21.4445V15.9445C9.5 15.414 9.71071 14.9053 10.0858 14.5302C10.4609 14.1552 10.9696 13.9445 11.5 13.9445H12.5C13.0304 13.9445 13.5391 14.1552 13.9142 14.5302C14.2893 14.9053 14.5 15.414 14.5 15.9445V21.4445M10 6.44446H8M10 10.4445H8M16 6.44446H14M16 10.4445H14" stroke="#E4AB8E" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-2xl">Llamella B</p>
                        </div>
                        <div className="w-full flex gap-4 items-center">
                            <svg width="48" height="50" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.5 20.4445V16.9445C6.5 16.6611 6.596 16.4238 6.788 16.2325C6.98 16.0411 7.21734 15.9451 7.5 15.9445H11V12.4445C11 12.1611 11.096 11.9238 11.288 11.7325C11.48 11.5411 11.7173 11.4451 12 11.4445H15.5V7.94446C15.5 7.66113 15.596 7.42379 15.788 7.23246C15.98 7.04113 16.2173 6.94513 16.5 6.94446H20V4.44446C20 4.16113 20.096 3.92379 20.288 3.73246C20.48 3.54113 20.7173 3.44513 21 3.44446C21.2827 3.44379 21.5203 3.53979 21.713 3.73246C21.9057 3.92513 22.0013 4.16246 22 4.44446V7.94446C22 8.22779 21.904 8.46546 21.712 8.65746C21.52 8.84946 21.2827 8.94513 21 8.94446H17.5V12.4445C17.5 12.7278 17.404 12.9655 17.212 13.1575C17.02 13.3495 16.7827 13.4451 16.5 13.4445H13V16.9445C13 17.2278 12.904 17.4655 12.712 17.6575C12.52 17.8495 12.2827 17.9451 12 17.9445H8.5V21.4445C8.5 21.7278 8.404 21.9655 8.212 22.1575C8.02 22.3495 7.78267 22.4451 7.5 22.4445H4C3.71667 22.4445 3.47934 22.3485 3.288 22.1565C3.09667 21.9645 3.00067 21.7271 3 21.4445C2.99934 21.1618 3.09534 20.9245 3.288 20.7325C3.48067 20.5405 3.718 20.4445 4 20.4445H6.5Z" fill="#E4AB8E" />
                            </svg>
                            <p className="text-2xl">{floorNumber}</p>
                        </div>
                        <div className="w-full flex gap-4 items-center">
                            <svg width="48" height="50" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 19.4445V13.4445C2 12.9945 2.09167 12.5861 2.275 12.2195C2.45833 11.8528 2.7 11.5278 3 11.2445V8.44446C3 7.61112 3.29167 6.90279 3.875 6.31946C4.45833 5.73612 5.16667 5.44446 6 5.44446H10C10.3833 5.44446 10.7417 5.51546 11.075 5.65746C11.4083 5.79946 11.7167 5.99512 12 6.24446C12.2833 5.99446 12.5917 5.79879 12.925 5.65746C13.2583 5.51612 13.6167 5.44512 14 5.44446H18C18.8333 5.44446 19.5417 5.73612 20.125 6.31946C20.7083 6.90279 21 7.61112 21 8.44446V11.2445C21.3 11.5278 21.5417 11.8528 21.725 12.2195C21.9083 12.5861 22 12.9945 22 13.4445V19.4445H20V17.4445H4V19.4445H2ZM13 10.4445H19V8.44446C19 8.16112 18.904 7.92379 18.712 7.73246C18.52 7.54112 18.2827 7.44512 18 7.44446H14C13.7167 7.44446 13.4793 7.54046 13.288 7.73246C13.0967 7.92446 13.0007 8.16179 13 8.44446V10.4445ZM5 10.4445H11V8.44446C11 8.16112 10.904 7.92379 10.712 7.73246C10.52 7.54112 10.2827 7.44512 10 7.44446H6C5.71667 7.44446 5.47933 7.54046 5.288 7.73246C5.09667 7.92446 5.00067 8.16179 5 8.44446V10.4445ZM4 15.4445H20V13.4445C20 13.1611 19.904 12.9238 19.712 12.7325C19.52 12.5411 19.2827 12.4451 19 12.4445H5C4.71667 12.4445 4.47933 12.5405 4.288 12.7325C4.09667 12.9245 4.00067 13.1618 4 13.4445V15.4445Z" fill="#E4AB8E" />
                            </svg>
                            <p className="text-2xl">
                                {rooms === "Studio" || rooms === 0
                                    ? rooms
                                    : `${rooms} ${t('bedroom')}`}
                            </p>
                        </div>
                        <div className="w-full flex gap-4 items-center">
                            <svg width="48" height="50" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.25 6.44446C11.25 6.64337 11.171 6.83414 11.0303 6.97479C10.8897 7.11544 10.6989 7.19446 10.5 7.19446H9C8.80109 7.19446 8.61032 7.11544 8.46967 6.97479C8.32902 6.83414 8.25 6.64337 8.25 6.44446C8.25 6.24555 8.32902 6.05478 8.46967 5.91413C8.61032 5.77348 8.80109 5.69446 9 5.69446H10.5C10.6989 5.69446 10.8897 5.77348 11.0303 5.91413C11.171 6.05478 11.25 6.24555 11.25 6.44446ZM16.155 18.9263L16.485 21.2326C16.5154 21.4453 16.4996 21.6621 16.4389 21.8682C16.3782 22.0744 16.2739 22.265 16.1331 22.4274C15.9923 22.5897 15.8183 22.7199 15.6228 22.8091C15.4273 22.8983 15.2149 22.9445 15 22.9445H9C8.78511 22.9445 8.57273 22.8983 8.37723 22.8091C8.18174 22.7199 8.00769 22.5897 7.86688 22.4274C7.72607 22.265 7.62177 22.0744 7.56107 21.8682C7.50036 21.6621 7.48465 21.4453 7.515 21.2326L7.845 18.9263C6.38522 18.1655 5.16181 17.0193 4.30765 15.6121C3.45349 14.2049 3.00123 12.5906 3 10.9445C3 10.7455 3.07902 10.5548 3.21967 10.4141C3.36032 10.2735 3.55109 10.1945 3.75 10.1945H5.25V4.19446C5.25 3.79663 5.40804 3.4151 5.68934 3.1338C5.97064 2.85249 6.35218 2.69446 6.75 2.69446H17.25C17.6478 2.69446 18.0294 2.85249 18.3107 3.1338C18.592 3.4151 18.75 3.79663 18.75 4.19446V10.1945H20.25C20.4489 10.1945 20.6397 10.2735 20.7803 10.4141C20.921 10.5548 21 10.7455 21 10.9445C20.9988 12.5906 20.5465 14.2049 19.6924 15.6121C18.8382 17.0193 17.6148 18.1655 16.155 18.9263ZM6.75 10.1945H17.25V4.19446H6.75V10.1945ZM14.7253 19.5226C12.952 20.0851 11.048 20.0851 9.27469 19.5226L9 21.4445H15L14.7253 19.5226ZM19.4625 11.6945H4.5375C4.72321 13.5446 5.58958 15.2598 6.9685 16.5072C8.34742 17.7547 10.1406 18.4454 12 18.4454C13.8594 18.4454 15.6526 17.7547 17.0315 16.5072C18.4104 15.2598 19.2768 13.5446 19.4625 11.6945Z" fill="#E4AB8E" />
                            </svg>
                            <p className="text-2xl">bathroom</p>
                        </div>
                    </div>
                    <button className="flex items-center justify-center w-full px-12 py-3 text-primary text-xl bg-secondary hover:bg-white duration-300 rounded-full">
                        Kontaktoni per cmimin
                    </button>
                </div>
                <div className='w-full md:w-1/2 h-full flex flex-col md:items-center justify-center relative rounded-xl bg-secondary p-12'>
                    <img 
                    // src={`${homepage}${planmetricImageUrl}${name}-3d.png`}
                        src={'/assets/images/apartments/apartment3d.png'}
                        alt={"3D view"}
                        className="h-full object-contain cursor-pointer"
                    />
                </div>
            </div>
        </div>
    )
}

export default SingleApartment