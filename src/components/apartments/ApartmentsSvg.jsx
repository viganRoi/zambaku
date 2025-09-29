import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllApartmentSvgData, getAllFloorSvgData } from '../../features/apartment/ApartmentSlice';
import { getFilterState, getRegularFloorFilter, getRegularRoomFilter, getRegularSquareFilter } from '../../features/filter/FilterSlice';
import { roomMatchesFilter, floorMatchesFilter } from '../../utils/filterHelpers';
import { getAllApartmentsByFloorId, getFloorSelectionSvg, getObjectSvgDataAll } from '../../features/apartment/ApartmentAPI';
import { imagePath } from '../../utils/consts';
import ContextMenu from '../contextMenu/ContextMenu';
import AdmApartmentModal from '../admin/apartments/AdmApartmentModal';
import { AuthProvider } from '../auth/AuthProvider';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

const ApartmentsSvg = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const buildingData = useSelector(getAllApartmentSvgData);
    const buildingFloorData = useSelector(getAllFloorSvgData);
    const isSmallDev = window.innerWidth < 700;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedTab, setSelectedTab] = useState('selection');
    const sizeRange = useSelector(getRegularSquareFilter);
    const floorRange = useSelector(getRegularFloorFilter);
    const roomRange = useSelector(getRegularRoomFilter)
    const filterState = useSelector(getFilterState);
    const [contextMenu, setContextMenu] = useState({
        anchorEl: null,
        open: false,
        data: {}
    });
    const [popup, setPopup] = useState({
        anchorEl: null,
        open: false,
        data: {}
    })

    useEffect(() => {
        if (id) {
            dispatch(getObjectSvgDataAll(id));
            dispatch(getFloorSelectionSvg(id));
        }
        console.log(buildingData);
    }, [dispatch, id])


    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % buildingData.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => ((prevIndex - 1) + buildingData.length) % buildingData.length);
    };

    const getSvgHeight = () => {
        return '100%';
    };

    const handleContextMenu = (e, data) => {
        e.preventDefault();
        console.log(data)
        setContextMenu({
            anchorEl: e.currentTarget,
            open: true,
            data: data
        });
    };
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        setCurrentIndex(0);
    };

    const selectionView = () => (
        <div className="absolute md:relative top-0 left-0 w-[100%] bg-brand flex items-center justify-center" style={{ height: getSvgHeight() }}>
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
                        preserveAspectRatio="xMidYMid slice"
                        style={{ transform: isSmallDev && 'scale(1.9) translateX(20px)' }}
                        viewBox={building.viewBoxStyle}
                    >
                        <image
                            xlinkHref={`${imagePath}${building.buildingNr}-${building.buildingSide}.jpg`}
                            alt=""
                            width={building.imgWidth} height={building.imgHeight}
                            transform={building.imgTransform}
                        />
                        {building?.apartmentList?.map((apartment) => {
                            if (apartment.pointsType === 'path') {
                                return (
                                    <path
                                        d={apartment.path}
                                        onContextMenu={(e) => handleContextMenu(e, apartment)}
                                        className={
                                            floorMatchesFilter(floorRange, apartment.floorNumber) &&
                                                roomMatchesFilter(roomRange, apartment.rooms) &&
                                                parseInt(apartment.netoSquare) >= sizeRange.startVal &&
                                                parseInt(apartment.netoSquare) <= sizeRange.endVal
                                                ? apartment.isSold
                                                    ? "st1"
                                                    : filterState
                                                        ? "st2"
                                                        : "st0"
                                                : "st3"
                                        }
                                        id={apartment.apartmentId}
                                        onMouseEnter={(e) => {
                                            setPopup({
                                                data: {
                                                    image: apartment.image3dUrl,
                                                    title: apartment.title,
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
                                                floorMatchesFilter(floorRange, apartment.floorNumber) &&
                                                roomMatchesFilter(roomRange, apartment.rooms) &&
                                                parseInt(apartment.netoSquare) >= sizeRange.startVal &&
                                                parseInt(apartment.netoSquare) <= sizeRange.endVal &&
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
                                        className={"st0"}
                                        id={apartment.apartmentId}
                                        onClick={() => navigate(`/apartment/${apartment.id}`)}
                                    />
                                );
                            }
                        })
                        }
                    </svg>
                </div>
            )
            }
        </div>
    )
    // const floorView = () => (
    //     <div className="absolute md:relative top-0 left-0 w-[100%] bg-brand flex items-center justify-center" style={{ height: getSvgHeight() }}>
    //         {buildingFloorData?.map((building, index) =>
    //             <div
    //                 key={building.buildingName}
    //                 style={{
    //                     height: index === currentIndex ? getSvgHeight() : "0px",
    //                     opacity: currentIndex === index ? 1 : 0,
    //                     transition: "opacity 0.1s ease-in-out",
    //                     width:'100%',
    //                     position: 'absolute',
    //                     display: 'flex',
    //                     justifyContent: 'center',
    //                 }}
    //             >
    //                 <svg
    //                     width={"100%"}
    //                     height={"100%"}
    //                     preserveAspectRatio="xMidYMid slice"
    //                     style={{ transform: isSmallDev && 'scale(1.9) translateX(20px)' }}
    //                     viewBox={building.viewBoxStyle}
    //                 >
    //                     <image
    //                         xlinkHref={`${imagePath}${building.buildingNr}-${building.buildingSide}.jpg`}
    //                         alt=""
    //                         width={building.imgWidth} height={building.imgHeight}
    //                         transform={building.imgTransform}
    //                     />
    //                     {building?.floorList?.map((apartment) => {
    //                         if (apartment.pointsType === 'path') {
    //                             return (
    //                                 <path
    //                                     d={apartment.path}
    //                                     // onContextMenu={(e) => handleContextMenu(e, apartment)}
    //                                     className={
    //                                         parseInt(apartment.floorNumber) >= floorRange.startVal &&
    //                                             parseInt(apartment.floorNumber) <= floorRange.endVal
    //                                             ? "st2"
    //                                             : "st3"
    //                                     }
    //                                     id={apartment.apartmentId}
    //                                     onMouseEnter={(e) => {
    //                                         setPopup({
    //                                             anchorEl: e.currentTarget,
    //                                             open: true,
    //                                             data: apartment,
    //                                         });
    //                                     }}
    //                                     onMouseLeave={() => {
    //                                         setPopup({
    //                                             anchorEl: null,
    //                                             open: false,
    //                                             data: apartment,
    //                                         });
    //                                     }}
    //                                     onClick={() => {
    //                                         if (
    //                                             parseInt(apartment.floorNumber) >=
    //                                             floorRange.startVal &&
    //                                             parseInt(apartment.floorNumber) <=
    //                                             floorRange.endVal
    //                                         ) {
    //                                             navigate(`/buildings/${building.buildingNr}/floor/${apartment.id}`);
    //                                         }
    //                                     }}
    //                                 />
    //                             );
    //                         }
    //                         if (apartment.pointsType === 'polygon') {
    //                             return (
    //                                 <polygon
    //                                     key={apartment.id}
    //                                     points={apartment.path}
    //                                     className={"st0"}
    //                                     id={apartment.apartmentId}
    //                                     onClick={() => navigate(`/buildings/${building.buildingNr}/floor/${apartment.floorNumber}`)}
    //                                 />
    //                             );
    //                         }
    //                     })
    //                     }
    //                 </svg>
    //             </div>
    //         )
    //         }
    //     </div>
    // )

const floorView = () => <div></div>
    return (
        <div className="relative w-full h-[100vh] flex flex-col items-center justify-center">
            <div className='absolute w-11/12 md:5/6 h-0 flex justify-center items-center top-10 z-10'>
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
                            By Apartment
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
                            By Floor
                        </label>
                    </div>
                </div>
            </div>
            <div className="relative w-full h-full flex justify-center items-center">
                {selectedTab === 'selection' ? selectionView() : floorView()}
                {selectedTab === 'selection' &&
                    <div className="absolute w-full left-0 h-0 flex justify-between px-4">
                        <button onClick={handlePrevious} className='bg-gold transition-all duration-.3s hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center'>
                            <SlArrowLeft color='#fff' />
                        </button>
                        <button onClick={handleNext} className='bg-gold transition-all duration-.3s  hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center'>
                            <SlArrowRight color='#fff' />
                        </button>
                    </div>
                }
            </div>
           
            {contextMenu.open &&
                <AuthProvider hide={true}>
                    <ContextMenu menu={contextMenu} setMenu={setContextMenu} />
                </AuthProvider>}
            <AdmApartmentModal />
        </div>
    );
};

export default ApartmentsSvg