import React, { useState } from 'react'
import axios from 'axios';
import Label from '../components/Label';

export default function AccommodationCreate() {

    let [photoUrl, setPhotoUrl] = useState('');
    let [photos, setPhotos] = useState([]);

    let addPhotoByUrl = async () => {
        let res = await axios.post('/upload-link', {
            url: photoUrl
        });
        let { url } = res.data;
        setPhotos(prev => [...prev, url]);
        setPhotoUrl('');
    }

    return (
        <form action="" className='max-w-xl mx-auto'>
            {/* Title */}
            <div className='mb-3'>
                <Label label="title" description='Title for your place.should be short and catchy as in advertisement' htmlFor='title' />
                <input type="text" placeholder='title for example - lovely house' id="title" />
            </div>
            {/* Address */}
            <div className='mb-3'>
                <Label label="Address" description='Address to this place.' htmlFor='address' />
                <input type="text" placeholder='Address' id='address' />
            </div>
            {/* photo */}
            <div className="mb-3">
                <Label label="Photos" description="more = better" />
                {/* photo lists and upload */}
                <div className='mt-4 mb-4'>
                    <div className="flex items-center gap-2">
                        <input type="text" placeholder='Add using link...jpg' className='w3/4' value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} />
                        <button className='w-1/4 h-12 rounded-lg bg-gray-100 px-4' type='button' onClick={addPhotoByUrl}>Add Photo</button>
                    </div>
                    <div>

                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                            {!!photos.length && photos.map(photo => (
                                <div key={photo}>
                                    <img src={photo} width="100" />
                                </div>
                            ))}
                            {/* trick to make custom appearance of input file 🎉 */}
                            <label className='cursor-pointer flex justify-center items-center px-4 gap-1 border w-[120px] h-[100px] rounded-lg text-gray-400'>
                                <input type="file" className='hidden' />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>Upload
                            </label>
                        </div>
                    </div>
                </div>
                {/* Description */}
                <div className='mb-3'>
                    <Label label="Description" description="Description of this place." htmlFor="Description" />
                    <textarea rows="5" id='Description'></textarea>
                </div>
                {/* Features */}
                <div className="mb-3">
                    <Label label="Features" description="Select all the features of this place." />
                    <div className="grid grid-cols-2 md:grid-cols-3  my-3 gap-3">
                        <div className='flex border py-2 px-4 items-center gap-1 rounded-lg'>
                            <input type="checkbox" className='mr-2' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                            </svg>
                            <span className='ml-1'>Wifi</span>
                        </div>
                        <div className='flex border py-2 px-4 items-center gap-1 rounded-lg'>
                            <input type="checkbox" className='mr-2' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            <span className='ml-1'>Parking</span>
                        </div>
                        <div className='flex border py-2 px-4 items-center gap-1 rounded-lg'>
                            <input type="checkbox" className='mr-2' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                            <span className='ml-1'>TV</span>
                        </div>
                        <div className='flex border py-2 px-4 items-center gap-1 rounded-lg'>
                            <input type="checkbox" className='mr-2' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>
                            <span className='ml-1'>Radio</span>
                        </div>
                        <div className='flex border py-2 px-4 items-center gap-1 rounded-lg'>
                            <input type="checkbox" className='mr-2' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                            </svg>
                            <span className='ml-1'>Pets</span>
                        </div>
                        <div className='flex border py-2 px-4 items-center gap-1 rounded-lg'>
                            <input type="checkbox" className='mr-2' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                            </svg>
                            <span className='ml-1'>Elevator</span>
                        </div>
                    </div>
                    {/* Extra Info */}
                    <div className='mb-3'>
                        <Label label="Extra Info" description="House rules,etc." htmlFor="extra" />
                        <textarea rows="5" id='extra'></textarea>
                    </div>
                    {/* Check In & Out Times & guests number */}
                    <div className='mb-3'>
                        <Label label="Check In & Out Times" description="add check in and out times, remember to have some time window for cleaning the room between guests." />
                        <div className="grid grid-cols-2 gap-2 mt-3">
                            <div>
                                <label htmlFor="">Check In time</label>
                                <input type="text" placeholder='12:00' />
                            </div>
                            <div>
                                <label htmlFor="">Check Out time</label>
                                <input type="text" placeholder='12:00' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Max Number of guests</label>
                            <input type="text" placeholder='5' />
                        </div>
                    </div>
                    {/* save btn */}
                    <button className="primary">Save</button>
                </div>
            </div>
        </form>
    )
}
