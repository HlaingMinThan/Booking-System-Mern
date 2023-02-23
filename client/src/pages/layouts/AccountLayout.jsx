import React, { useContext } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

export default function AccountLayout() {

    let { user, isAuthReady } = useContext(UserContext);
    let navigate = useNavigate()

    if (isAuthReady && !user) {
        navigate('/login')
    }

    return (
        user && <>
            <nav className='mt-16 flex justify-center'>
                <ul className='flex gap-14'>
                    <li>
                        <NavLink
                            to="/account/profile"
                            className={({ isActive }) =>
                                isActive ? 'bg-primary px-4 py-2 rounded-full text-white' : undefined
                            }
                        >My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/account/bookings"
                            className={({ isActive }) =>
                                isActive ? 'bg-primary px-4 py-2 rounded-full text-white' : undefined
                            }>My Bookings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/account/accommodations"
                            className={({ isActive }) =>
                                isActive ? 'bg-primary px-4 py-2 rounded-full text-white' : undefined
                            }>My Accommodations
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className='mx-auto max-w-lg my-10'>
                <Outlet />
            </div>
        </>
    )
}
