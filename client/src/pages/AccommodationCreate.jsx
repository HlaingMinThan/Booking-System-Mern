import React, { useState } from 'react'
import axios from 'axios';
import Label from '../components/Label';
import FeaturesSelector from '../components/FeaturesSelector';
import PhotoUploader from '../components/PhotoUploader';

export default function AccommodationCreate() {

    let [photos, setPhotos] = useState([]);
    let [selectedFeatures, setSelectedFeatures] = useState([]);

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
            <PhotoUploader photos={photos} setPhotos={setPhotos} />
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
        </form>
    )
}
