import React, { useEffect, useState } from 'react'
import { getApartmentDetailModalData } from '../features/apartment/ApartmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ApartmentsCarousel, Contact, GalleryCarousel, Interior, SingleApartment } from '../components'
import { BASE_URL } from '../utils/consts';
import { banners } from '../utils/server';
import { getApartmentById } from '../features/apartment/ApartmentAPI';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { flats } from '../utils/flats';

const SingleApartmentPage = () => {
  window.scrollTo({ top: 0 })
  const [apartments, setApartments] = useState([]);
  const [relatedApartments, setRelatedApartments] = useState([]);

  const apartment = useSelector(getApartmentDetailModalData);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getApartmentById(id));
    }
  }, [dispatch, id]);


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

  return (
    <div className='flex flex-col w-full items-center'>
      <SingleApartment apartment={apartment} />
      <div className='relative base-width mb-20 flex items-center justify-center'>
        <h1 className='absolute text-[150px] text-white anya font-400 uppercase'>Interior</h1>
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