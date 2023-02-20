import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div className='min-h-screen flex items-center justify-around'>
            <div className='max-w-2xl mx-auto -mt-48 p-5'>
                <h1 className='text-3xl font-bold text-center'>Login</h1>
                <input type="text" placeholder='your@email.com' />
                <input type="password" placeholder='password' />
                <button className='primary'>Log in now</button>
                <div className='text-gray-500 my-2 text-center'>
                    Don't have an account ? <Link to="/register" className="text-black">Register here</Link>
                </div>
            </div>
        </div>
    )
}
