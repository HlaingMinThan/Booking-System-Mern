import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    let { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    let logoutHandler = async () => {
        await axios.post('/logout');
        navigate('/');
        setUser(null);
    }

    return (
        <div className='flex items-center flex-col'>
            <div className='mb-4' >Logged In As {user.username} ({user.email})</div>
            <button className="primary max-w-sm" onClick={logoutHandler}>Logout</button>
        </div>
    )
}
