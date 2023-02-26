import React from 'react'

export default function BookingWidget({ place }) {
    return (
        <div className='bg-gray-100  p-5 rounded-lg'>
            <h2 className='text-2xl text-center'>Price : $ {place.price} /per night</h2>
            <div className='border border-white mt-5 p-5 rounded-2xl'>
                <div className='flex'>
                    <div className='grow'>
                        <div>Check in : </div>
                        <input type="date" name="" id="" />
                    </div>
                    <div className='grow'>
                        <div>Check out : </div>
                        <input type="date" name="" id="" />
                    </div>
                </div>
                <div className='mt-5 border-t-2 border-t-gray-200'>
                    <div>Number of guests</div>
                    <input type="text" />
                </div>
            </div>
            <div>
                <button className="primary">Book Now</button>
            </div>
        </div>
    )
}
