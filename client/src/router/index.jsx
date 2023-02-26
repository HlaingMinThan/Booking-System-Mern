import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AccountLayout from '../pages/layouts/AccountLayout'
import Profile from '../pages/Profile'
import Bookings from '../pages/Bookings'
import Accommodations from '../pages/Accommodations'
import AccommodationCreate from '../pages/AccommodationCreate'
import AccommodationEdit from '../pages/AccommodationEdit'
import AccommodationDetails from '../pages/AccommodationDetails'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/Register",
        element: <Register />
      },
      {
        path: "/account",
        element: <AccountLayout />,
        children: [
          {
            path: "",
            element: <Profile />
          },
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "bookings",
            element: <Bookings />
          },
          {
            path: "accommodations",
            element: <Accommodations />
          },
          {
            path: "accommodations/create",
            element: <AccommodationCreate />
          },
          {
            path: "accommodations/edit/:id",
            element: <AccommodationEdit />
          },
        ]
      },
      {
        path: "accommodations/:id",
        element: <AccommodationDetails />,
      },
    ]
  },
]);


export default router;