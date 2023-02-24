import { Outlet } from 'react-router-dom'
import AccountNav from '../../components/AccountNav'

export default function AccountLayout() {
    return (
        user && <>
            <AccountNav />
            <Outlet />
        </>
    )
}
