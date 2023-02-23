import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext';

export default function Login() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const navigate = useNavigate();
    let { setUser } = useContext(UserContext)
    let loginHandler = async (e) => {
        e.preventDefault();

        try {
            let { data } = await axios.post('/login', {
                email,
                password
            });
            setUser(data);
            navigate('/')
        } catch (e) {
            alert('error' + e.message)
        }
    }
    return (
        <div className='min-h-screen flex items-center justify-around'>
            <form className='max-w-2xl mx-auto -mt-48 p-5' onSubmit={loginHandler}>
                <h1 className='text-3xl font-bold text-center'>Login</h1>
                <input type="text" placeholder='your@email.com' value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
                <button className='primary' type='submit'>Log in now</button>
                <div className='text-gray-500 my-2 text-center'>
                    Don't have an account ? <Link to="/register" className="text-black">Register here</Link>
                </div>
            </form>
        </div>
    )
}
