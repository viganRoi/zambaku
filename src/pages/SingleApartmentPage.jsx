import { useEffect, useState } from 'react'
import { getApartmentDetailModalData } from '../features/apartment/ApartmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Contact, Interior, SingleApartment } from '../components'
import { BASE_URL, homepage } from '../utils/consts';
import { getApartmentById } from '../features/apartment/ApartmentAPI';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getWishlistCount, handleWishlistData, isProductInWishlist } from '../features/wishList/WishlistSlice';

const SingleApartmentPage = () => {
  window.scrollTo({ top: 0 })
  const [apartments, setApartments] = useState([]);
  const [relatedApartments, setRelatedApartments] = useState([]);
  const [selectedTab, setSelectedTab] = useState("3d");

  const apartment = useSelector(getApartmentDetailModalData);
  const dispatch = useDispatch();
  const { id } = useParams();


  const wishListItemCount = useSelector(getWishlistCount);
  const isInWishlist = useSelector((state) =>
    isProductInWishlist(state, apartment.id)
  );

  const handleWishlistDataFunction = () => {
    dispatch(handleWishlistData(apartment));
  };

  useEffect(() => {
    if (id) {
      dispatch(getApartmentById(id));
    }
  }, [dispatch, id]);

  const handleTabClick = (view) => {
    setSelectedTab(view);
  };

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/apartment/get/apartment`);
        setApartments(response.data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };
    fetchApartments();
  }, []);

  useEffect(() => {
    if (apartment && apartment.rooms) {
      fetch(`${BASE_URL}/api/apartment/get/related?type=${apartment.rooms}`)
        .then(res => res.json())
        .then(data => setRelatedApartments(data))
        .catch(err => console.error('Failed to fetch related apartments', err));
    }
  }, [apartment]);


  const handleOpenPdf = (pdfUrl) => {
    window.open(`${homepage}/projektet/pdf/${pdfUrl}`, '_blank');
  };

  return (
    <div className='flex flex-col w-full items-center'>
      <SingleApartment
        apartment={apartment}
        selectedTab={selectedTab}
        handleTabClick={handleTabClick}
        handleOpenPdf={handleOpenPdf}
        handleWishlistDataFunction={handleWishlistDataFunction}
        isInWishlist={isInWishlist}
        wishListItemCount={wishListItemCount}
      />
      <div className='relative base-width md:mb-20 flex items-center justify-center'>
        <h1 className='absolute text-[84px] md:text-[150px] text-white anya font-400 uppercase'>Interior</h1>
      </div>
      <Interior
        // images={apartment.images}
        images={[
          '/projektet/assets/images/apartments/1.png',
          '/projektet/assets/images/apartments/2.png',
          '/projektet/assets/images/apartments/3.png',
        ]}
      />
      <div className='mt-20 w-full'>
        <Contact />
      </div>
    </div>
  )
}

export default SingleApartmentPage