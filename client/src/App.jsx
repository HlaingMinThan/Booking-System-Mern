import './App.css'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { UserContextProvider } from './contexts/UserContext'

function App() {

  return (
    <UserContextProvider>
      <div className='p-4 max-w-[80%] mx-auto'>
        <Navbar />
        <Outlet />
      </div>
    </UserContextProvider>
  )
}

export default App
