import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import PrettyDateBetween from '../components/PrettyDateBetween';

export default function Bookings() {
    let [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(res => {
            setBookings(res.data);
        })
    }, [])
    return (
        <div className="max-w-3xl mx-auto mt-5">
            {!!bookings.length && bookings.map(booking => (
                <Link to={`/account/bookings/${booking.id}`} className='flex gap-3 mt-4 bg-gray-50 p-3 rounded-2xl' key={booking.id}>
                    <div className='bg-gray-100 w-32 h-32 shrink-0'>
                        <img src={booking.place.photos[0]?.url} className="rounded-2xl" />
                    </div >
                    <div className='shrink grow-0 space-y-2 space-x-2'>
                        <h2 className='text-xl'>{booking.place.title}</h2>
                        <PrettyDateBetween start={booking.checkIn} end={booking.checkOut} />
                        <p>Total Price - <span className="bg-primary text-white px-2 py-1 rounded-2xl">$ {booking.price}</span></p>
                        <p>Total Nights - {booking.price / booking.place.price} nights</p>
                    </div>
                </Link >
            ))}
        </div >
    )
}
