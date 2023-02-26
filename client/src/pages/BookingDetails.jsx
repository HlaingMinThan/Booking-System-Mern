import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function BookingDetails() {
    let { id } = useParams();
    useEffect(() => {


    }, [id])
    return (
        <div>BookingDetails {id}</div>
    )
}
