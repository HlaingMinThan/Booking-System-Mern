import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../components/BookingWidget';
import PlaceInfo from '../components/PlaceInfo';
import PhotosGallery from '../components/PhotosGallery';

export default function AccommodationDetails() {
    let { id } = useParams();
    let [place, setPlace] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`/places/${id}`).then(res => {
                setPlace(res.data);
                console.log(res.data)
            })
        }
    }, [id]);

    return (
        !!place &&
        <div className='mt-8 ml-3'>
            <PlaceInfo place={place} />
            <PhotosGallery place={place} />
            <div>
                <div className='grid grid-cols-[2fr_1fr] mt-8 gap-4'>
                    <div>
                        <h2 className='text-2xl font-semibold'>Description</h2>
                        <p>{place.description}</p>
                        <p>check in - {place.checkIn}</p>
                        <p>check out - {place.checkOut}</p>
                        <p>Max number of guests - {place.maxGuests}</p>
                    </div>
                    <BookingWidget place={place} />
                </div>
            </div>
            {place.extraInfo && <div className='mt-6'>
                <h2 className='text-2xl font-semibold'>Extra Info</h2>
                <p className='text-gray-500'>{place.extraInfo}</p>
            </div>}
        </div>
    )
}
