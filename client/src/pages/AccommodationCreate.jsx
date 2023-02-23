import React from 'react'

export default function AccommodationCreate() {
    return (
        <form action="" className='max-w-xl mx-auto'>
            <div className='mb-3'>
                <label htmlFor="title" className='text-2xl'>Title</label>
                <p className='text-sm text-gray-400'>Title for your place.should be short and catchy as in advertisement</p>
                <input type="text" placeholder='title for example - lovely house' id='title' />
            </div>
            <div className='mb-3'>
                <label htmlFor="address" className='text-2xl'>Address</label>
                <p className='text-sm text-gray-400'>Address to this page.</p>
                <input type="text" placeholder='Address' />
            </div>
            <div className="mb-3">
                <label className='text-2xl'>Photos</label>
                <p className='text-sm text-gray-400'>more = better</p>

                {/* photo lists and upload */}
                <div className='mt-4'>
                    <button className='border py-10 px-20 rounded-lg text-gray-400'>+</button>
                </div>
            </div>
        </form>
    )
}
