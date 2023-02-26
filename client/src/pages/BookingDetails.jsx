import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaceInfo from '../components/PlaceInfo';
import PhotosGallery from '../components/PhotosGallery';
import axios from 'axios';
import PrettyDateBetween from '../components/PrettyDateBetween';

export default function BookingDetails() {
    let { id } = useParams();
    let [booking, setBooking] = useState(null);

    useEffect(() => {
        axios.get('/bookings/' + id).then(res => {
            setBooking(res.data)
        });

    }, [id])
    return (
        !!booking && (
            <>
                <PlaceInfo place={booking.place} />
                {/* show booking detail */}
                <div className='flex justify-between items-center bg-gray-200 rounded-xl p-6 my-12'>
                    <div>
                        <h2 className='text-xl'>Your Booking Information:</h2>
                        <div className='flex gap-4 my-5'>
                            <p className='flex gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                </svg>

                                {booking.price / booking.place.price} nights</p>
                            <PrettyDateBetween start={booking.checkIn} end={booking.checkOut} />
                        </div>
                    </div>
                    <div className='bg-primary p-6  rounded-2xl text-white'>
                        <h2 className='text-xl'>Total Price</h2>
                        <h1 className='text-2xl'>${booking.price}</h1>
                    </div>
                </div>
                <PhotosGallery place={booking.place} />
            </>
        )
    )
}
