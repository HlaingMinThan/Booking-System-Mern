import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div className='min-h-screen flex items-center justify-around'>
            <div className='max-w-2xl mx-auto -mt-48 p-5'>
                <h1 className='text-3xl font-bold text-center'>Register</h1>
                <input type="text" placeholder='your@email.com' />
                <input type="password" placeholder='password' />
                <button className='primary'>Register now</button>
                <div className='text-gray-500 my-2 text-center'>
                    Already have an account ? <Link to="/login" className="text-black">Login here</Link>
                </div>
            </div>
        </div>
    )
}
