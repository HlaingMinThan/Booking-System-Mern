import { Outlet, useNavigate } from 'react-router-dom'
import AccountNav from '../../components/AccountNav'
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

export default function AccountLayout() {
    let { user, isAuthReady } = useContext(UserContext);
    let navigate = useNavigate();
    if (isAuthReady && !user) {
        navigate('/login')
    }
    return (
        user && <>
            <AccountNav />
            <Outlet />
        </>
    )
}
