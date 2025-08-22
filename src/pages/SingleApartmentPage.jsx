import React, { useEffect, useState } from 'react'
import { getApartmentDetailModalData } from '../features/apartment/ApartmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ApartmentsCarousel, GalleryCarousel, SingleApartment } from '../components'
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
    <div className=''>
      <SingleApartment apartment={apartment}/>
      <GalleryCarousel gallery={banners}/>
      <ApartmentsCarousel data={relatedApartments} />
    </div>
  )
}

export default SingleApartmentPage