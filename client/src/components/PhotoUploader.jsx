import React, { useState } from 'react'
import Label from './Label';
import axios from 'axios';

export default function PhotoUploader({ photos, setPhotos }) {
    let [photoUrl, setPhotoUrl] = useState('');

    let addPhotoByUrl = async () => {
        let res = await axios.post('/upload-link', {
            url: photoUrl
        });
        let { url } = res.data;
        setPhotos(prev => [...prev, url]);
        setPhotoUrl('');
    }

    let uploadHanlder = async (e) => {
        let files = e.target.files;

        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            let file = files[i]
            formData.append('photos', file);
        }
        let res = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        let resPhotos = res.data;
        let urls = resPhotos.map(p => p.url);
        setPhotos(prev => [...prev, ...urls]);
    }
    let handlePhotoDelete = (photo) => {
        setPhotos(prev => prev.filter(p => p !== photo));
    }
    return (
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
                            <div key={photo} className='h-32 w-32 relative bg-gray-100'>
                                <img src={photo} className='object-cover' />

                                <svg onClick={() => handlePhotoDelete(photo)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-2 bottom-2 bg-gray-400 rounded-lg text-white bg-opacity-50 p-1 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </div>
                        ))}
                        {/* trick to make custom appearance of input file 🎉 */}
                        <label className='cursor-pointer flex justify-center items-center px-4 gap-1 border w-[120px] h-[100px] rounded-lg text-gray-400'>
                            <input type="file" multiple className='hidden' onChange={uploadHanlder} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                            </svg>Upload
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
