import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Home() {

    let [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/places').then(res => {
            setPlaces(res.data);
        })
    }, [])
    return (
        <div className='mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-8 gap-y-16'>
            {!!places.length && places.map(place => (
                <div>
                    <div className=" bg-gray-100 rounded-2xl"><img src={place.photos[0]?.url} className="rounded-2xl " /></div>
                    <div className="p-2">
                        <h2 className='font-semibold'>{place.title}</h2>
                        <div className="text-sm">
                            <p className="text-gray-500 leading-6">{place.address}</p>
                            <p>
                                <span className='font-bold'>{place.price} SGD</span> per night
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
