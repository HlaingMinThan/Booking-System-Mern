import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaceInfo from '../components/PlaceInfo';
import axios from 'axios';

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
            <PlaceInfo place={booking.place} />
        )
    )
}
