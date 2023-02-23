import React from 'react'

export default function Label({ label, description, htmlFor }) {
    return (
        <>
            <label htmlFor={htmlFor} className='text-2xl' >{label}</label>
            <p className='text-sm text-gray-400'>{description}</p>
        </>
    )
}
