import React from 'react'
import { Link } from 'react-router-dom'

export default function Accommodations() {
    return (
        <div className='text-center'>
            <Link to="/account/accommodations/create" className='px-4 py-2 rounded-full  gap-1 bg-primary text-white'> + Add new place</Link>
        </div>
    )
}
