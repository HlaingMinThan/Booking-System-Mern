import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {

    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let register = (e) => {
        e.preventDefault();
        axios.post('/register', {
            username, email, password
        });
    }

    return (
        <div className='min-h-screen flex items-center justify-around'>
            <form className='max-w-2xl mx-auto -mt-48 p-5' onSubmit={register}>
                <h1 className='text-3xl font-bold text-center'>Register</h1>
                <input type="text" placeholder='John Doe' value={username} onChange={e => setUsername(e.target.value)} />
                <input type="text" placeholder='your@email.com' value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
                <button className='primary'>Register now</button>
                <div className='text-gray-500 my-2 text-center'>
                    Already have an account ? <Link to="/login" className="text-black">Login here</Link>
                </div>
            </form>
        </div>
    )
}
