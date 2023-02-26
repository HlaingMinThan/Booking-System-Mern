import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

export default function BookingWidget({ place }) {
    let [checkIn, setCheckIn] = useState(Date.now());
    let [checkOut, setCheckOut] = useState(Date.now());
    let [maxGuests, setMaxGuests] = useState('');
    let [name, setName] = useState('');
    let [phone, setPhone] = useState('');
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));

    useEffect(() => {
        if (user) {
            setName(user.username)
        }
    }, [])

    let bookNow = async (e) => {
        e.preventDefault();
        let price = numberOfNights * place.price
        let payload = { checkIn, checkOut, name, phone, price, place_id: place.id };
        let { data } = await axios.post('/bookings', payload);
        navigate('/account/bookings/' + data.id);//go to booking detail
    }

    return (
        <div className='bg-gray-100  p-5 rounded-lg'>
            <h2 className='text-2xl text-center'>Price : $ {place.price} /per night</h2>
            <div className='border border-white mt-5 p-5 rounded-2xl'>
                <div className='flex'>
                    <div className='grow'>
                        <div>Check in : </div>
                        <input type="date" name="" id="" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                    </div>
                    <div className='grow'>
                        <div>Check out : </div>
                        <input type="date" name="" id="" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                    </div>
                </div>
                <div className='mt-5 border-t-2 border-t-gray-200'>
                    <div>Number of guests</div>
                    <input type="text" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
                    {numberOfNights >= 1 && (
                        <>
                            <div>Name</div>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} />
                            <div>Phone Number</div>
                            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                        </>
                    )}
                </div>
            </div>
            <div>
                <button className="primary" onClick={bookNow}>Book Now</button>
            </div>
        </div>
    )
}
