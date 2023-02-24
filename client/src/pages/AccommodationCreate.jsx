import React, { useState } from 'react'
import axios from 'axios';
import Label from '../components/Label';
import FeaturesSelector from '../components/FeaturesSelector';

export default function AccommodationCreate() {

    let [photoUrl, setPhotoUrl] = useState('');
    let [photos, setPhotos] = useState([]);
    let [selectedFeatures, setSelectedFeatures] = useState([]);

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
                                <input type="file" multiple className='hidden' onChange={uploadHanlder} />
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
                <FeaturesSelector selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures} />
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
        </form>
    )
}
