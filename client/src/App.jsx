import './App.css'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { UserContextProvider } from './contexts/UserContext'

function App() {

  return (
    <UserContextProvider>
      <div className='p-4'>
        <Navbar />
        <Outlet />
      </div>
    </UserContextProvider>
  )
}

export default App
